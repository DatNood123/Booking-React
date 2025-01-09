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
                        Giờ khám: <span>{time} <FormattedMessage id="patient.detail-doctor.on" /> {this.uppercaseFirstLetter(date)}</span>
                    </div>
                </>
            )
        }
    }

    render() {
        let { dataProfile } = this.state;
        let { language, dataScheduleTimeModalFromParent, isShowInfoFromParent } = this.props;
        let nameVi, nameEn, priceVi, priceEn, nameClinic = '';
        if (dataProfile && dataProfile.positionData) {
            nameVi = `${dataProfile.positionData.valueVie} ${dataProfile.lastName} ${dataProfile.firstName} `
            nameEn = `${dataProfile.positionData.valueEn} ${dataProfile.firstName} ${dataProfile.lastName}`

            priceVi = `${dataProfile.Doctor_Infor.priceTypeData.valueVie} `
            priceEn = `${dataProfile.Doctor_Infor.priceTypeData.valueEn} `
            nameClinic = dataProfile.Doctor_Infor.nameClinic
        }
        return (
            <>
                <div className='profile-doctor-container'>
                    <div className='intro-doctor'>
                        <div className='content-left'>
                            <div className='avatar' style={{ backgroundImage: `url(${dataProfile.image && dataProfile.image ? dataProfile.image : ''})` }}></div>
                        </div>

                        <div className='content-right'>
                            <div className='up'>
                                Người khám: <span>{language === LANGUAGES.VI ? nameVi : nameEn} </span> <br></br>
                                Phòng khám: <span>{nameClinic}</span>
                            </div>
                            {isShowInfoFromParent === true &&
                                this.renderTimeBooking(dataScheduleTimeModalFromParent)
                            }
                        </div>
                    </div>

                    <div className='price'>
                        Giá khám: {language === LANGUAGES.VI ?
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
                    </div>
                </div>

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
