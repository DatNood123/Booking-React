import React, { Component } from 'react';
import { connect } from "react-redux";
import './BookingModal.scss';
import { LANGUAGES } from '../../../../utils';
import { FormattedMessage } from 'react-intl';
import { Modal } from 'reactstrap';
import ProfileDoctor from '../Doctor/ProfileDoctor';
import _ from 'lodash';
import DatePicker from '../../../../components/Input/DatePicker';
import * as actions from '../../../../store/actions';
import Select from 'react-select';
import { servicePostCustomerBookingAppointment } from '../../../../services/userService';
import { toast } from 'react-toastify';
import moment from 'moment';
import LoadingModal from './LoadingModal';

class BookingModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            isShowInfo: true,
            fullName: '',
            phoneNumber: '',
            email: '',
            address: '',
            reason: '',
            birthDay: '',
            genders: '',
            selectedGender: '',
            doctorId: '',
            timeType: '',
            dateBooking: '',
        }
    }

    async componentDidMount() {
        let { language } = this.props;
        this.props.fetchGenderRedux();
    }

    buildDataGender = (data) => {
        let result = [];
        let language = this.props.language;

        if (data && data.length > 0) {
            data.map(item => {
                let object = {};
                object.label = language === LANGUAGES.VI ? item.valueVie : item.valueEn;
                object.value = item.keyMap;
                result.push(object)
            })

            return result;
        }
    }

    async componentDidUpdate(prevProps, prevState) {
        if (this.props.language !== prevProps.language) {
            this.setState({
                genders: this.buildDataGender(this.props.genders)
            })
        }

        if (this.props.genders !== prevProps.genders) {
            this.setState({
                genders: this.buildDataGender(this.props.genders)
            })
        }

        if (this.props.dataScheduleTimeModalFromParent !== prevProps.dataScheduleTimeModalFromParent) {
            if (this.props.dataScheduleTimeModalFromParent && !_.isEmpty(this.props.dataScheduleTimeModalFromParent)) {
                let timeType = this.props.dataScheduleTimeModalFromParent.timeType;
                let doctorId = this.props.dataScheduleTimeModalFromParent.doctorId;
                let date = this.props.dataScheduleTimeModalFromParent.date
                this.setState({
                    doctorId: doctorId,
                    timeType: timeType,
                    dateBooking: date,
                })
            }
        }
    }

    handleOnChangeInput = (event, id) => {
        let copyState = { ...this.state };
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        })
    }

    handleOnChangeDataPicker = (date) => {
        this.setState({
            birthDay: date[0]
        })
    }

    handleOnChangeGender = (selectedOption) => {
        this.setState({
            selectedGender: selectedOption
        })
    }

    uppercaseFirstLetter(text) {
        return text.charAt(0).toUpperCase() + text.slice(1)
    }

    buildTimeBooking = (dataTime) => {
        let { language } = this.props;
        if (dataTime && !_.isEmpty(dataTime)) {
            let time = language === LANGUAGES.VI ? dataTime.timeTypeData.valueVie : dataTime.timeTypeData.valueEn

            let date = language === LANGUAGES.VI ?
                moment.unix(+dataTime.date / 1000).format('dddd - DD/MM/YYYY')
                :
                moment.unix(+dataTime.date / 1000).locale('en').format('dddd - MM/DD/YYYY')
            return `${time} --- ${this.uppercaseFirstLetter(date)}`
        }
    }

    buildDoctorName = (dataTime) => {
        let { language } = this.props;
        if (dataTime && !_.isEmpty(dataTime)) {
            let name = language === LANGUAGES.VI ?
                `${dataTime.doctorData.lastName} ${dataTime.doctorData.firstName}`
                :
                `${dataTime.doctorData.firstName} ${dataTime.doctorData.lastName}`

            return name
        }
    }

    handleConfirmBooking = async () => {
        this.setState({
            isLoading: true
        })
        let doctorName = this.buildDoctorName(this.props.dataScheduleTimeModalFromParent)
        let timeString = this.buildTimeBooking(this.props.dataScheduleTimeModalFromParent)
        let birthDay = new Date(this.state.birthDay).getTime();

        try {
            let res = await servicePostCustomerBookingAppointment({
                fullName: this.state.fullName,
                phoneNumber: this.state.phoneNumber,
                email: this.state.email,
                address: this.state.address,
                reason: this.state.reason,
                birthDay: birthDay,
                selectedGender: this.state.selectedGender.value,
                doctorId: this.state.doctorId,
                timeType: this.state.timeType,
                date: this.state.dateBooking,
                language: this.props.language,
                timeString: timeString,
                doctorName: doctorName
            })

            if (res && res.errCode === 0) {
                toast.success('Đặt lịch thành công, vui lòng xác nhận qua email!')
                this.props.closeBookingModalFromParent();
                this.setState({
                    isLoading: false
                })

            } else if (res && res.errCode === 1) {
                toast.warn('Bạn đã đặt lịch vào thời gian này rồi!')
                this.setState({
                    isLoading: false
                })
            } else {
                toast.error('Đặt lịch thất bại!')
                this.setState({
                    isLoading: false
                })
            }
        } catch {
            toast.error('An error occurred during the booking process.');
            this.setState({
                isLoading: false
            })
        }
    }

    render() {
        let { language, isOpenModalFromParent, closeBookingModalFromParent,
            dataScheduleTimeModalFromParent } = this.props;

        let { isShowInfo, isLoading } = this.state
        let doctorId = '';

        if (dataScheduleTimeModalFromParent && !_.isEmpty(dataScheduleTimeModalFromParent)) {
            doctorId = dataScheduleTimeModalFromParent.doctorId;
        }
        return (
            <>
                <Modal
                    isOpen={isOpenModalFromParent}
                    className={'booking-modal-container'}
                    size='lg'
                    centered>
                    <div className='booking-modal-content'>
                        <div className='booking-modal-header'>
                            <span className='left'><FormattedMessage id='patient.booking-modal.title' /></span>
                            <span
                                onClick={closeBookingModalFromParent}
                                className='right'><i className='fas fa-times'></i></span>
                        </div>

                        <div className='booking-modal-body'>
                            <div className='doctor-info'>
                                <ProfileDoctor
                                    doctorIdFromParent={doctorId}
                                    dataScheduleTimeModalFromParent={dataScheduleTimeModalFromParent}
                                    isShowInfoFromParent={isShowInfo}
                                />

                            </div>

                            <div className='row'>
                                <div className='col-6 form-group'>
                                    <label><FormattedMessage id='patient.booking-modal.full-name' /></label>
                                    <input
                                        className='form-control'
                                        placeholder='Nhập họ và tên'
                                        value={this.state.fullName}
                                        onChange={(event) => this.handleOnChangeInput(event, 'fullName')}

                                    />
                                </div>

                                <div className='col-6 form-group'>
                                    <label><FormattedMessage id='patient.booking-modal.phone-number' /></label>
                                    <input
                                        className='form-control'
                                        placeholder='Nhập SĐT'
                                        value={this.state.phoneNumber}
                                        onChange={(event) => this.handleOnChangeInput(event, 'phoneNumber')}
                                    />
                                </div>

                                <div className='col-6 form-group'>
                                    <label><FormattedMessage id='patient.booking-modal.address' /></label>
                                    <input
                                        className='form-control'
                                        placeholder='Nhập địa chỉ'
                                        value={this.state.address}
                                        onChange={(event) => this.handleOnChangeInput(event, 'address')}
                                    />
                                </div>

                                <div className='col-6 form-group'>
                                    <label><FormattedMessage id='patient.booking-modal.email' /></label>
                                    <input
                                        className='form-control'
                                        placeholder='Nhập email'
                                        value={this.state.email}
                                        onChange={(event) => this.handleOnChangeInput(event, 'email')}
                                    />
                                </div>

                                <div className='col-12 form-group'>
                                    <label><FormattedMessage id='patient.booking-modal.reason' /></label>
                                    <textarea
                                        className='form-control'
                                        placeholder='Bạn cảm thấy như thế nào?'
                                        value={this.state.reason}
                                        onChange={(event) => this.handleOnChangeInput(event, 'reason')}
                                    />
                                </div>

                                <div className='col-4 form-group'>
                                    <label><FormattedMessage id='patient.booking-modal.birthday' /></label>
                                    <DatePicker
                                        onChange={this.handleOnChangeDataPicker}
                                        className="form-control"
                                        value={this.state.birthDay}
                                    />
                                </div>

                                <div className='col-4 form-group'>
                                    <label><FormattedMessage id='patient.booking-modal.gender' /></label>
                                    <Select
                                        value={this.state.selectedGender}
                                        onChange={this.handleOnChangeGender}
                                        options={this.state.genders}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className='booking-modal-footer'>
                            <button
                                onClick={() => this.handleConfirmBooking()}
                                className='btn-confirm'>
                                <FormattedMessage id="patient.booking-modal.confirm" />
                            </button>
                            <button
                                onClick={closeBookingModalFromParent}
                                className='btn-cancel'>
                                <FormattedMessage id="patient.booking-modal.cancel" />
                            </button>
                        </div>
                    </div>
                </Modal>

                <LoadingModal
                    isLoadingFromParent={isLoading}
                />
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genders: state.admin.genders
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchGenderRedux: () => dispatch(actions.fetchGenderStart())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
