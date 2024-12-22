import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Slider from 'react-slick';


class Specialty extends Component {
    render() {
        return (
            <>
                <div className='section-share section-specialty'>
                    <div className='section-container'>
                        <div className='section-header'>
                            <span className='title-section'><FormattedMessage id="specialty.popular-spceialty" /></span>
                            <button className='btn-section'><FormattedMessage id="specialty.more" /></button>
                        </div>
                        <div className='section-body'>
                            <Slider {...this.props.settings}>
                                <div className='section-custome'>
                                    <div className='bg-image section-specialty1' />
                                    <div>Thiết kế - Thi công sân vườn</div>
                                </div>
                                <div className='section-custome'>
                                    <div className='bg-image section-specialty2' />
                                    <div>Thiết kế - Thi công hồ cá Koi</div>
                                </div>
                                <div className='section-custome'>
                                    <div className='bg-image section-specialty3' />
                                    <div>Thiết kế - Thi công hòn non bộ</div>
                                </div>
                                <div className='section-custome'>
                                    <div className='bg-image section-specialty4' />
                                    <div>Xây dựng tiểu cảnh</div>
                                </div>
                                <div className='section-custome'>
                                    <div className='bg-image section-specialty5' />
                                    <div>Thi công hồ bơi</div>
                                </div>
                                <div className='section-custome'>
                                    <div className='bg-image section-specialty6' />
                                    <div>Trang trí cảnh quanh nhà ở</div>
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
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
