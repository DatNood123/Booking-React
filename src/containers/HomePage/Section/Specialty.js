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
                                    <div>Cơ Xương Khớp</div>
                                </div>
                                <div className='section-custome'>
                                    <div className='bg-image section-specialty2' />
                                    <div>Răng Hàm Mặt</div>
                                </div>
                                <div className='section-custome'>
                                    <div className='bg-image section-specialty3' />
                                    <div>Sản Phụ Khoa</div>
                                </div>
                                <div className='section-custome'>
                                    <div className='bg-image section-specialty4' />
                                    <div>Chấn Thương Chỉnh Hình</div>
                                </div>
                                <div className='section-custome'>
                                    <div className='bg-image section-specialty5' />
                                    <div>Da Liễu</div>
                                </div>
                                <div className='section-custome'>
                                    <div className='bg-image section-specialty6' />
                                    <div>Đa Khoa</div>
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
