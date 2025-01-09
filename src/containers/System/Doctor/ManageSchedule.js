import React, { Component } from 'react';
import { connect } from "react-redux";
import './ManageSchedule.scss';
import { FormattedMessage } from 'react-intl';
import Select from 'react-select';
import * as actions from "../../../store/actions";
import { LANGUAGES, dateFormat } from '../../../utils';
import DatePicker from '../../../components/Input/DatePicker';
import moment from 'moment';
import { toast } from 'react-toastify';
import _ from 'lodash';
import { serviceSaveBulkScheduleDoctor } from '../../../services/userService'

class ManageSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listDoctors: [],
            selectedDoctor: {},
            currentDate: '',
            rangeTime: []
        }
    }

    componentDidMount() {
        this.props.fetchAllDoctorRedux();
        this.props.fetchAllScheduleTimeRedux();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.allDoctors !== this.props.allDoctors) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors)
            this.setState({
                listDoctors: dataSelect
            })
        }

        if (prevProps.allScheduleTime !== this.props.allScheduleTime) {
            let data = this.props.allScheduleTime
            if (data && data.length > 0) {
                data = data.map(item => ({ ...item, isSelected: false }))
            }
            this.setState({
                rangeTime: data
            })
        }

        // if (prevProps.language !== this.props.language) {
        //     let dataSelect = this.buildDataInputSelect(this.props.allDoctors)
        //     this.setState({
        //         listDoctors: dataSelect
        //     })
        // }
    }

    buildDataInputSelect = (inputData) => {
        let result = [];
        let { language } = this.props;
        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let object = {};
                let labelVi = `${item.lastName} ${item.firstName}`;
                let labelEn = `${item.firstName} ${item.lastName}`;

                object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                object.value = item.id;
                result.push(object)
            })
            return result
        }
    }

    handleChangeSelected = async (selectedOption) => {
        this.setState({ selectedDoctor: selectedOption })
        // let res = await serviceGetDetailDoctor(selectedOption.value)
        // if (res && res.errCode === 0 && res.data && res.data.Markdown) {
        //     let markdown = res.data.Markdown;
        //     this.setState({
        //         contentMarkdown: markdown.contentMarkdown,
        //         contentHTML: markdown.contentHTML,
        //         description: markdown.description,
        //         hasOldData: true
        //     })
        // } else {
        //     this.setState({
        //         contentMarkdown: '',
        //         contentHTML: '',
        //         description: '',
        //         hasOldData: false,
        //     })
        // }
    }

    handleOnChangDatePicker = (date) => {
        this.setState({
            currentDate: date[0]
        })
    }

    handleClickBtnTime = (time) => {
        let { rangeTime } = this.state;
        if (rangeTime && rangeTime.length > 0) {
            rangeTime = rangeTime.map(item => {
                if (item.id === time.id) item.isSelected = !item.isSelected;
                return item
            })

            this.setState({
                rangeTime: rangeTime
            })
        }
    }

    handleSaveSchedule = async () => {
        let { rangeTime, selectedDoctor, currentDate } = this.state;
        let result = [];

        if (selectedDoctor && _.isEmpty(selectedDoctor)) {
            toast.error("Invalid doctor!!!");
            return
        }

        if (!currentDate) {
            toast.error("Invalid date!!!");
            return
        }

        // let formatedDate = moment(currentDate).format(dateFormat.SEND_TO_SERVER)
        let formatedDate = new Date(currentDate).getTime()

        if (rangeTime && rangeTime.length > 0) {
            let selectedTime = rangeTime.filter(item => item.isSelected === true);
            if (selectedTime && selectedTime.length > 0) {
                selectedTime.map(schedule => {
                    let object = {};
                    object.doctorId = selectedDoctor.value;
                    object.date = formatedDate;
                    object.timeType = schedule.keyMap;
                    result.push(object)
                })
            } else {
                toast.error("Have not seleted time!!!");
            }
        }

        let res = await serviceSaveBulkScheduleDoctor({
            arrSchedule: result,
            doctorId: selectedDoctor.value,
            date: formatedDate,
        })

        if (res && res.errCode === 0) {
            toast.success("Tạo lịch thành công")
            this.setState({
                selectedDoctor: {},
                currentDate: '',
                rangeTime: rangeTime.map(item => {
                    item.isSelected = false;
                    return item
                })
            })
        } else {
            toast.error("Tạo lịch thất bại")
        }
    }


    render() {
        let { rangeTime } = this.state;
        let { language } = this.props;
        let yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
        return (
            <>
                <div className='manage-schedule-container'>
                    <div className='m-s-title'>
                        <FormattedMessage id="manage-schedule.title" />
                    </div>

                    <div className='container'>
                        <div className='row'>
                            <div className='col-6 form-group'>
                                <label> <FormattedMessage id="manage-schedule.choose-doctor" /></label>
                                <Select
                                    value={this.state.selectedDoctor}
                                    onChange={this.handleChangeSelected}
                                    options={this.state.listDoctors}
                                />
                            </div>

                            <div className='col-6 form-group'>
                                <label> <FormattedMessage id="manage-schedule.choose-date" /></label>
                                <DatePicker
                                    onChange={this.handleOnChangDatePicker}
                                    className='form-control'
                                    value={this.state.currentDate}
                                    minDate={yesterday}

                                />
                            </div>

                            <div className='col-12 pick-hour-container'>
                                {rangeTime && rangeTime.length > 0 &&
                                    rangeTime.map((item, index) => {
                                        return (
                                            <button
                                                className={item.isSelected === true ? 'btn btn-schedule active' : 'btn btn-schedule'} key={index}
                                                onClick={() => this.handleClickBtnTime(item)}>
                                                {language === LANGUAGES.VI ? item.valueVie : item.valueEn}
                                            </button>
                                        )
                                    })
                                }
                            </div>

                            <div className='col-12'>
                                <button
                                    onClick={() => this.handleSaveSchedule()}
                                    className='btn btn-primary btn-save'>
                                    <FormattedMessage id="manage-schedule.save" />
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        allDoctors: state.admin.allDoctors,
        language: state.app.language,
        allScheduleTime: state.admin.allScheduleTime
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllScheduleTimeRedux: () => dispatch(actions.fetchAllScheduleTime()),
        fetchAllDoctorRedux: () => dispatch(actions.fetchAllDoctor()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
