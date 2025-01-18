import React, { Component } from 'react';
import { connect } from "react-redux";
import './ManageCustomer.scss';
import { FormattedMessage } from 'react-intl';
import * as actions from "../../../store/actions";
import { LANGUAGES } from '../../../utils';
import DatePicker from '../../../components/Input/DatePicker';
import moment from 'moment';
import { toast } from 'react-toastify';
import _ from 'lodash';
import { serviceGetAllBookingAppointmentById, serviceSendResultSurvey } from '../../../services/userService';
import ResultModal from './ResultModal';
import LoadingOverlay from 'react-loading-overlay';

class ManageCustomer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentDate: moment(new Date()).startOf('day').valueOf(),
            dataCustomer: [],
            isOpenResultModal: false,
            dataModal: {},
            isShowLoading: false
        }
    }

    async componentDidMount() {
        this.getDataCustomer();
    }

    getDataCustomer = async () => {
        let { userInfo } = this.props;
        let { currentDate } = this.state;
        let date = new Date(currentDate).getTime();

        let res = await serviceGetAllBookingAppointmentById({
            doctorId: userInfo.id,
            date: date
        })

        if (res && res.errCode === 0) {
            this.setState({
                dataCustomer: res.data
            })
        }
    }

    componentDidUpdate(prevProps, prevState) {

    }

    handleOnChangDatePicker = (date) => {
        this.setState({
            currentDate: date[0]
        }, async () => {
            await this.getDataCustomer();
        })
    }

    handleBtnConfirm = (item) => {
        let data = {
            doctorId: item.doctorId,
            customerId: item.patientId,
            email: item.emailCustomer,
            phoneNumber: item.phoneNumberCustomer,
            timeType: item.timeType,
            nameCustomer: item.nameCustomer
        }

        this.setState({
            isOpenResultModal: true,
            dataModal: data
        })
    }

    handleBtnCancel = () => {

    }

    closeResultModel = () => {
        this.setState({
            isOpenResultModal: false,
            dataModal: {}
        })
    }

    sendResultSurvey = async (dataFromChild) => {
        let { dataModal } = this.state
        this.setState({
            isShowLoading: true,
        })

        let res = await serviceSendResultSurvey({
            email: dataFromChild.email,
            imageBase64: dataFromChild.imageBase64,
            doctorId: dataModal.doctorId,
            customerId: dataModal.customerId,
            timeType: dataModal.timeType,
            language: this.props.language,
            nameCustomer: dataModal.nameCustomer
        })

        if (res && res.errCode === 0) {
            toast.success('Send result survey succeed!!!')
            await this.getDataCustomer();
            this.closeResultModel()
            this.setState({
                isShowLoading: false
            })
        } else {
            toast.error('Send result survey succeed!!!')
            this.setState({
                isShowLoading: false
            })
            this.closeResultModel()
        }
    }

    render() {
        let { language } = this.props;
        let { dataCustomer, isOpenResultModal, dataModal } = this.state;
        let yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
        return (
            <>
                <LoadingOverlay
                    active={this.state.isShowLoading}
                    spinner
                    text={'Loading...'}
                >
                    <div className='manage-customer-container'>
                        <div className='m-c-title'>
                            <FormattedMessage id="manage-customer.title" />
                        </div>

                        <div className='manage-customer-body row'>
                            <div className='col-6 form-group'>
                                <label>Chọn ngày khảo sát</label>
                                <DatePicker
                                    onChange={this.handleOnChangDatePicker}
                                    className='form-control'
                                    value={this.state.currentDate}
                                    minDate={yesterday}
                                />
                            </div>

                            <div className='col-12 table-manage-customer'>
                                <table style={{ width: '100%' }}>
                                    <tbody>
                                        <tr>
                                            <th>STT</th>
                                            <th>Thời gian</th>
                                            <th>Tên khách hàng</th>
                                            <th>Địa chỉ</th>
                                            <th>Số điện thoại</th>
                                            <th>Action</th>
                                        </tr>
                                        {dataCustomer && dataCustomer.length > 0 ?
                                            dataCustomer.map((item, index) => {
                                                let dataTime = language === LANGUAGES.VI ? item.timeTypeDataCustomer.valueVie : item.timeTypeDataCustomer.valueEn;
                                                return (
                                                    <tr key={index}>
                                                        <td>{index + 1}</td>
                                                        <td>{dataTime}</td>
                                                        <td>{item.nameCustomer}</td>
                                                        <td>{item.addressCustomer}</td>
                                                        <td>{item.phoneNumberCustomer}</td>
                                                        <td>
                                                            <button className='btn-confirm' onClick={() => this.handleBtnConfirm(item)}>Xác nhận</button>
                                                            <button className='btn-cancel' onClick={() => this.handleBtnCancel()}>Hủy lịch</button>
                                                        </td>
                                                    </tr>
                                                )
                                            })

                                            :

                                            <tr>
                                                <td style={{ padding: "30px", fontSize: "16px", fontWeight: "600", color: "red" }} colSpan={6}>Ngày hôm nay không có lịch hẹn</td>
                                            </tr>
                                        }

                                    </tbody>
                                </table>
                            </div>
                        </div>

                    </div>

                    <ResultModal
                        isOpenResultModalFromParent={isOpenResultModal}
                        dataModalFromParent={dataModal}
                        closeResultModelFromParent={this.closeResultModel}
                        sendResultSurveyFromParent={this.sendResultSurvey}
                    />
                </LoadingOverlay>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        userInfo: state.user.userInfo,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllScheduleTimeRedux: () => dispatch(actions.fetchAllScheduleTime()),
        fetchAllDoctorRedux: () => dispatch(actions.fetchAllDoctor()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageCustomer);
