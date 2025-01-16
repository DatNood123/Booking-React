import React, { Component } from 'react';
import { connect } from "react-redux";
import { LANGUAGES } from '../../../../utils';
import { FormattedMessage } from 'react-intl';
import localization from 'moment/locale/vi';
import './ProfileDoctor.scss';
import { serviceGetProfileDoctorById } from '../../../../services/userService';
import NumberFormat from 'react-number-format';
import _ from 'lodash';
import moment from 'moment';
import { Link } from 'react-router-dom';

class ProfileDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataProfile: {}
        }
    }

    async componentDidMount() {
        let { language } = this.props;
        let data = await this.getInfoDoctor(this.props.doctorIdFromParent);
        this.setState({
            dataProfile: data
        })
    }

    async componentDidUpdate(prevProps, prevState) {
        if (this.props.language !== prevProps.language) {

        }

        if (this.props.doctorIdFromParent !== prevProps.doctorIdFromParent) {
            let data = await this.getInfoDoctor(this.props.doctorIdFromParent);
            this.setState({
                dataProfile: data,
            });
        }
    }

    getInfoDoctor = async (id) => {
        let result = {}
        if (id) {
            let res = await serviceGetProfileDoctorById(id);
            if (res && res.errCode === 0) {
                result = res.data
            }
        }

        return result
    }

    uppercaseFirstLetter(text) {
        return text.charAt(0).toUpperCase() + text.slice(1)
    }

    renderTimeBooking = (dataTime) => {
        let { language } = this.props;
        if (dataTime && !_.isEmpty(dataTime)) {
            let time = language === LANGUAGES.VI ? dataTime.timeTypeData.valueVie : dataTime.timeTypeData.valueEn

            let date = language === LANGUAGES.VI ?
                moment.unix(+dataTime.date / 1000).format('dddd - DD/MM/YYYY')
                :
                moment.unix(+dataTime.date / 1000).locale('en').format('dddd - MM/DD/YYYY')
            return (
                <>
                    <div className='schedule-seleted'>
                        <FormattedMessage id="patient.booking-modal.time" /> <span>{time} <FormattedMessage id="patient.booking-modal.on" /> {this.uppercaseFirstLetter(date)}</span>
                    </div>
                </>
            )
        }
    }

    render() {
        let { dataProfile } = this.state;
        let { language, dataScheduleTimeModalFromParent, isShowInfoFromParent, doctorIdFromParent } = this.props;
        let nameVi, nameEn, priceVi, priceEn, nameClinic, description = '';
        if (dataProfile && dataProfile.positionData && dataProfile.Doctor_Infor && dataProfile.Markdown) {
            nameVi = `${dataProfile.positionData.valueVie} ${dataProfile.lastName} ${dataProfile.firstName} `
            nameEn = `${dataProfile.positionData.valueEn} ${dataProfile.firstName} ${dataProfile.lastName}`

            priceVi = `${dataProfile.Doctor_Infor.priceTypeData.valueVie} `
            priceEn = `${dataProfile.Doctor_Infor.priceTypeData.valueEn} `
            nameClinic = dataProfile.Doctor_Infor.nameClinic

            description = dataProfile.Markdown.description
        }
        return (
            <>
                {isShowInfoFromParent === true ?
                    <div className='profile-doctor-container'>
                        <div className='intro-doctor'>
                            <div className='content-left'>
                                <div className='avatar' style={{ backgroundImage: `url(${dataProfile.image && dataProfile.image ? dataProfile.image : ''})` }}></div>
                            </div>

                            <div className='content-right'>
                                <div className='up'>
                                    <FormattedMessage id="patient.booking-modal.doctor" /> <span>{language === LANGUAGES.VI ? nameVi : nameEn} </span> <br></br>
                                    <FormattedMessage id="patient.booking-modal.clinic" /> <span>{nameClinic}</span>
                                </div>

                                {this.renderTimeBooking(dataScheduleTimeModalFromParent)}

                            </div>
                        </div>

                        <div className='price'>
                            <FormattedMessage id="patient.booking-modal.price" /> {language === LANGUAGES.VI ?
                                <NumberFormat
                                    className='currency'
                                    value={priceVi}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    suffix='đ'
                                />
                                :
                                <NumberFormat
                                    className='currency'
                                    value={priceEn}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    prefix='$'
                                />
                            }

                            <span> (<FormattedMessage id="patient.booking-modal.free" />)</span>
                        </div>
                    </div>

                    :

                    <div className='profile-doctor-container'>
                        <div className='intro-doctor'>
                            <div className='content-left'>
                                <div className='avatar' style={{ backgroundImage: `url(${dataProfile.image && dataProfile.image ? dataProfile.image : ''})` }}></div>
                                <Link className="nav-link" to={`/detail-doctor/${doctorIdFromParent}`}>Xem thêm</Link>
                            </div>

                            <div className='content-right'>
                                <div className='up'>
                                    <span>{language === LANGUAGES.VI ? nameVi : nameEn} </span> <br></br>
                                    <div className='description'>
                                        {description}
                                    </div>

                                </div>

                            </div>
                        </div>
                    </div>


                }
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
