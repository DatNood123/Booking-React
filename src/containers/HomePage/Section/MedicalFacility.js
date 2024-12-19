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
                                    <div>Hệ thống đào Q1</div>
                                </div>
                                <div className='section-custome'>
                                    <div className='bg-image section-medical2' />
                                    <div>Hệ thống đào Q2</div>
                                </div>
                                <div className='section-custome'>
                                    <div className='bg-image section-medical3' />
                                    <div>Hệ thống đào Q3</div>
                                </div>
                                <div className='section-custome'>
                                    <div className='bg-image section-medical4' />
                                    <div>Hệ thống đào Q4</div>
                                </div>
                                <div className='section-custome'>
                                    <div className='bg-image section-medical5' />
                                    <div>Hệ thống đào Q5</div>
                                </div>
                                <div className='section-custome'>
                                    <div className='bg-image section-medical6' />
                                    <div>Hệ thống đào Q6</div>
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
