import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from 'react-slick';
import { FormattedMessage } from 'react-intl';

class OutstandingDoctor extends Component {

    render() {
        return (
            <>
                <div className='section-share section-oustanding-doctor'>
                    <div className='section-container'>
                        <div className='section-header'>
                            <span className='title-section'><FormattedMessage id="doctor.good-doctor" /></span>
                            <button className='btn-section'><FormattedMessage id="doctor.more" /></button>
                        </div>
                        <div className='section-body'>
                            <Slider {...this.props.settings}>
                                <div className='section-custome'>
                                    <div className='cutome-border'>
                                        <div className='outter-bg'>
                                            <div className='bg-image section-doctor1 neon-border-pink' />
                                        </div>
                                        <div className='position text-center'>
                                            <div>TS Trần Hà Linh</div>
                                            <div>Giám Đốc</div>
                                        </div>
                                    </div>
                                </div>

                                <div className='section-custome'>
                                    <div className='cutome-border'>
                                        <div className='outter-bg'>
                                            <div className='bg-image section-doctor2 neon-border-red' />
                                        </div>
                                        <div className='position text-center'>
                                            <div>GS Ngọc Trinh</div>
                                            <div>Phó Giám Đốc</div>
                                        </div>
                                    </div>
                                </div>

                                <div className='section-custome'>
                                    <div className='cutome-border'>
                                        <div className='outter-bg'>
                                            <div className='bg-image section-doctor3 neon-border-blue' />
                                        </div>
                                        <div className='position text-center'>
                                            <div>ThS Lan Anh</div>
                                            <div>Chuyên gia Hòn Non Bộ</div>
                                        </div>
                                    </div>
                                </div>

                                <div className='section-custome'>
                                    <div className='cutome-border'>
                                        <div className='outter-bg'>
                                            <div className='bg-image section-doctor4 neon-border-green' />
                                        </div>
                                        <div className='position text-center'>
                                            <div> ThS JessicaNgow</div>
                                            <div>Trưởng nhóm Hòn Non Bộ</div>
                                        </div>
                                    </div>
                                </div>

                                <div className='section-custome'>
                                    <div className='cutome-border'>
                                        <div className='outter-bg'>
                                            <div className='bg-image section-doctor5 neon-border-purple' />
                                        </div>
                                        <div className='position text-center'>
                                            <div>Konami Kawari</div>
                                            <div>Chuyên Gia Hồ Cá Koi</div>
                                        </div>
                                    </div>
                                </div>

                                <div className='section-custome'>
                                    <div className='cutome-border'>
                                        <div className='outter-bg'>
                                            <div className='bg-image section-doctor6 neon-border-red-blue' />
                                        </div>
                                        <div className='position text-center'>
                                            <div>Melody Marks</div>
                                            <div>Nhân Viên</div>
                                        </div>
                                    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(OutstandingDoctor);
