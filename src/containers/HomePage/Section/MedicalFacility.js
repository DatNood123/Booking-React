import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from 'react-slick';
import { FormattedMessage } from 'react-intl';

class MedicalFacility extends Component {

    render() {
        return (
            <>
                <div className='section-share section-medical-facility'>
                    <div className='section-container'>
                        <div className='section-header'>
                            <span className='title-section'><FormattedMessage id="facility.good-facility" /></span>
                            <button className='btn-section'><FormattedMessage id="facility.more" /></button>
                        </div>
                        <div className='section-body'>
                            <Slider {...this.props.settings}>
                                <div className='section-custome'>
                                    <div className='bg-image section-medical1' />
                                    <div>Mai Vàng 20 năm tuổi</div>
                                </div>
                                <div className='section-custome'>
                                    <div className='bg-image section-medical2' />
                                    <div>Tùng quành 60</div>
                                </div>
                                <div className='section-custome'>
                                    <div className='bg-image section-medical3' />
                                    <div>Sơ Dừa</div>
                                </div>
                                <div className='section-custome'>
                                    <div className='bg-image section-medical4' />
                                    <div>Vú Sữa cao 25m</div>
                                </div>
                                <div className='section-custome'>
                                    <div className='bg-image section-medical5' />
                                    <div>Lộc Vừng kiểng</div>
                                </div>
                                <div className='section-custome'>
                                    <div className='bg-image section-medical6' />
                                    <div>Tha La</div>
                                </div>

                            </Slider>
                        </div>

                    </div>
                </div>
            </>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MedicalFacility);
