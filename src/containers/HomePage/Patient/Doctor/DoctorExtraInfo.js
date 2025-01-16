import React, { Component } from 'react';
import { connect } from "react-redux";
import './DoctorExtraInfo.scss';
import { LANGUAGES } from '../../../../utils';
import { FormattedMessage } from 'react-intl';
import { serviceGetExtraInfoDoctorById } from '../../../../services/userService';
import NumberFormat from 'react-number-format';

class DoctorExtraInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowDetailInfor: false,
            extraInfor: [],
        }
    }

    async componentDidMount() {
        if (this.props.doctorIdFromParent) {
            let res = await serviceGetExtraInfoDoctorById(this.props.doctorIdFromParent);
            if (res && res.errCode === 0) {
                this.setState({
                    extraInfor: res.data
                })
            }
        }
    }

    async componentDidUpdate(prevProps, prevState) {
        if (this.props.language !== prevProps.language) {

        }

        if (this.props.doctorIdFromParent !== prevProps.doctorIdFromParent) {
            let res = await serviceGetExtraInfoDoctorById(this.props.doctorIdFromParent);
            if (res && res.errCode === 0) {
                this.setState({
                    extraInfor: res.data
                })
            }
        }
    }

    handleChangeShowHide = () => {
        this.setState({
            isShowDetailInfor: !this.state.isShowDetailInfor
        })
    }

    render() {
        let { isShowDetailInfor, extraInfor } = this.state;
        let { language } = this.props
        return (
            <>
                <div className='doctor-extra-info-container'>
                    <div className='content-up'>
                        <div className='text-address'><FormattedMessage id="patient.extra-info-doctor.text-address" /></div>
                        <div className='name-clinic'>{extraInfor && extraInfor.nameClinic ? extraInfor.nameClinic : ''}</div>
                        <div className='address-clinic'>{extraInfor && extraInfor.addressClinic ? extraInfor.addressClinic : ''}</div>
                    </div>

                    <div className='content-down'>
                        {isShowDetailInfor === false ?
                            <div className='short-info'>
                                <div className='title-info'>
                                    <FormattedMessage id="patient.extra-info-doctor.price" />
                                    {extraInfor && extraInfor.priceTypeData && language === LANGUAGES.VI
                                        &&
                                        <NumberFormat
                                            className='currency'
                                            value={extraInfor.priceTypeData.valueVie}
                                            displayType={'text'}
                                            thousandSeparator={true}
                                            suffix='đ'
                                        />
                                    }

                                    {extraInfor && extraInfor.priceTypeData && language === LANGUAGES.EN
                                        &&
                                        <NumberFormat
                                            className='currency'
                                            value={extraInfor.priceTypeData.valueEn}
                                            displayType={'text'}
                                            thousandSeparator={true}
                                            prefix='$'
                                        />
                                    }
                                </div>
                                <span className='view-detail' onClick={() => this.handleChangeShowHide()}>
                                    <FormattedMessage id="patient.extra-info-doctor.view-detail" />
                                </span>
                            </div>

                            :
                            <>
                                <div className='title-detail-info'><FormattedMessage id="patient.extra-info-doctor.price" /></div>
                                <div className='detail-info'>
                                    <div className='price'>
                                        <span className='left'><FormattedMessage id="patient.extra-info-doctor.price-avarage" /></span>
                                        <span className='right'>
                                            {extraInfor && extraInfor.priceTypeData && language === LANGUAGES.VI
                                                &&
                                                <NumberFormat
                                                    className='currency'
                                                    value={extraInfor.priceTypeData.valueVie}
                                                    displayType={'text'}
                                                    thousandSeparator={true}
                                                    suffix='đ'
                                                />
                                            }

                                            {extraInfor && extraInfor.priceTypeData && language === LANGUAGES.EN
                                                &&
                                                <NumberFormat
                                                    className='currency'
                                                    value={extraInfor.priceTypeData.valueEn}
                                                    displayType={'text'}
                                                    thousandSeparator={true}
                                                    prefix='$'
                                                />
                                            }
                                        </span>

                                        <div className='note'>{extraInfor && extraInfor.note ? extraInfor.note : ''}</div>
                                    </div>

                                    <div className='payment'><FormattedMessage id="patient.extra-info-doctor.accept-payment" /> {extraInfor && extraInfor.paymentTypeData && language === LANGUAGES.VI && extraInfor.paymentTypeData.valueVie}
                                        {extraInfor && extraInfor.paymentTypeData && language === LANGUAGES.EN && extraInfor.paymentTypeData.valueEn}
                                    </div>
                                </div>

                                <div className='hide-payment'>
                                    <span onClick={() => this.handleChangeShowHide()}>
                                        <FormattedMessage id="patient.extra-info-doctor.hidden-detail" />
                                    </span>
                                </div>
                            </>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfo);
