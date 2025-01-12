import React, { Component } from 'react';
import { connect } from "react-redux";
import './DoctorSchedule.scss';
import { LANGUAGES } from '../../../../utils';
import moment from 'moment';
import localization from 'moment/locale/vi';
import { FormattedMessage } from 'react-intl';
import { serviceGetScheduleDoctorByDate } from '../../../../services/userService';
import BookingModal from '../Modal/BookingModal';

class DoctorSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allDays: [],
            allAvailabelSchedule: [],
            isOpenModalBooking: false,
            dataScheduleTimeModal: {},
        }
    }

    async componentDidMount() {
        let { language } = this.props;
        let allDays = this.getArrDays(language);
        this.setState({
            allDays: allDays
        })
    }

    async componentDidUpdate(prevProps, prevState) {
        if (this.props.language !== prevProps.language) {
            let allDays = this.getArrDays(this.props.language);
            this.setState({
                allDays: allDays
            })
        }

        //load data ngày đầu tiên
        if (this.props.doctorIdFromParent !== prevProps.doctorIdFromParent) {
            let allDays = this.getArrDays(this.props.language)
            let res = await serviceGetScheduleDoctorByDate(this.props.doctorIdFromParent, allDays[0].value);
            this.setState({
                allAvailabelSchedule: res.data ? res.data : []
            })
        }
    }

    uppercaseFirstLetter(text) {
        return text.charAt(0).toUpperCase() + text.slice(1)
    }

    //lấy data 7 ngày - giá trị của mỗi ngày là: {label: Chủ nhật - 02/04 , value: 15002000 (ngày theo dạng unix)}
    getArrDays = (language) => {
        let allDays = [];
        for (let i = 0; i < 7; i++) {
            let object = {};
            if (language === LANGUAGES.VI) {
                if (i === 0) {
                    let ddMM = moment(new Date()).format('DD/MM');
                    object.label = `Hôm nay - ${ddMM}`
                } else {
                    object.label = this.uppercaseFirstLetter(moment(new Date()).add(i, 'days').format('dddd - DD/MM'));
                }

            } else {
                if (i === 0) {
                    let ddMM = moment(new Date()).format('DD/MM');
                    object.label = `Today - ${ddMM}`
                } else {
                    object.label = moment(new Date()).add(i, 'days').locale('en').format('dddd - DD/MM');
                }

            }

            object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf();

            allDays.push(object);
        }

        return allDays
    }

    handleOnChangeSelect = async (event) => {
        if (this.props.doctorIdFromParent && this.props.doctorIdFromParent !== -1) {
            let doctorId = this.props.doctorIdFromParent;
            let date = event.target.value;
            let res = await serviceGetScheduleDoctorByDate(doctorId, date);


            if (res && res.errCode === 0) {
                this.setState({
                    allAvailabelSchedule: res.data ? res.data : []
                })
            }
        }
    }

    handleClickScheduleTime = (time) => {
        this.setState({
            isOpenModalBooking: true,
            dataScheduleTimeModal: time,
        })
    }

    closeBookingModal = () => {
        this.setState({
            isOpenModalBooking: false
        })
    }

    render() {
        let { allDays, allAvailabelSchedule, isOpenModalBooking, dataScheduleTimeModal } = this.state;
        let { language } = this.props;
        console.log(allAvailabelSchedule)
        return (
            <>
                <div className='doctor-schedule-container'>
                    <div className='schedule-header'>
                        <div className='text-calendar'>
                            <span><i className='fas fa-calendar-alt'></i> <FormattedMessage id="patient.detail-doctor.schedule" /></span>
                        </div>

                        <div className='all-schedule'>
                            <select onChange={(event) => this.handleOnChangeSelect(event)}>
                                {allDays && allDays.length > 0 &&
                                    allDays.map((item, index) => {
                                        return (
                                            <option key={index} value={item.value}>
                                                {item.label}
                                            </option>
                                        )
                                    })
                                }

                            </select>

                        </div>

                    </div>


                    <div className='time-content'>
                        {allAvailabelSchedule && allAvailabelSchedule.length > 0 ?
                            <>
                                <div className='time-content-btns'>
                                    {allAvailabelSchedule.map((item, index) => {
                                        let timeDisplay = language === LANGUAGES.VI ? item.timeTypeData.valueVie : item.timeTypeData.valueEn;
                                        return (
                                            <button
                                                disabled={item.currentNumber !== null}
                                                onClick={() => this.handleClickScheduleTime(item)}
                                                key={index}
                                                className={language === LANGUAGES.VI ? 'btn-vie' : 'btn-en'}>
                                                {timeDisplay}
                                            </button>
                                        )

                                    })}
                                </div>

                                <div className='book-free'>
                                    <span><FormattedMessage id="patient.detail-doctor.choose-and-book" /> <i className='far - fa-hand-point-up'></i> <FormattedMessage id="patient.detail-doctor.free" /></span>
                                </div>
                            </>

                            :

                            <div className='text-no-schedule'><FormattedMessage id="patient.detail-doctor.text-no-schedule" /></div>
                        }


                    </div>

                </div>

                <BookingModal
                    isOpenModalFromParent={isOpenModalBooking}
                    dataScheduleTimeModalFromParent={dataScheduleTimeModal}
                    closeBookingModalFromParent={this.closeBookingModal}
                />
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
