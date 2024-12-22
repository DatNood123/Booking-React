import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Slider from 'react-slick';


class HankBook extends Component {
    render() {
        let settings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 2,
            slidesToScroll: 1,
        }
        return (
            <>
                <div className='section-share section-hankbook'>
                    <div className='section-container'>
                        <div className='section-header'>
                            <span className='title-section'><FormattedMessage id="handbook.handbook" /></span>
                            <button className='btn-section'><FormattedMessage id="handbook.more" /></button>
                        </div>
                        <div className='section-body'>
                            <Slider {...settings}>
                                <div className='section-custome'>
                                    <div className='custome-border-handbook'>
                                        <div className='bg-image section-handbook1' />
                                        <div className='text-handbook'>
                                            <div className='text-title-handbook'>Cẩm nang chọn cá Koi khỏe mạnh</div>
                                            <div className='text-content-hanbook'>Lựa chọn trái đào tươi là một kỹ năng quan trọng để đảm bảo bạn có được những quả đào ngọt, thơm và ngon nhất. Dưới đây là một số bí quyết giúp bạn lựa chọn trái đào tươi ngon</div>
                                        </div>
                                    </div>
                                </div>

                                <div className='section-custome'>
                                    <div className='custome-border-handbook'>
                                        <div className='bg-image section-handbook2' />
                                        <div className='text-handbook'>
                                            <div className='text-title-handbook'>Cẩm nang chọn cây phù hợp với phong thủy</div>
                                            <div className='text-content-hanbook'>Lựa chọn trái đào tươi là một kỹ năng quan trọng để đảm bảo bạn có được những quả đào ngọt, thơm và ngon nhất. Dưới đây là một số bí quyết giúp bạn lựa chọn trái đào tươi ngon</div>
                                        </div>
                                    </div>
                                </div>

                                <div className='section-custome'>
                                    <div className='custome-border-handbook'>
                                        <div className='bg-image section-handbook3' />
                                        <div className='text-handbook'>
                                            <div className='text-title-handbook'>Cẩm nang chăm sóc cây bóng mát</div>
                                            <div className='text-content-hanbook'>Để phòng tránh các căn bệnh thường gặp, việc duy trì lối sống lành mạnh và thực hiện các biện pháp phòng ngừa là rất quan trọng. Dưới đây là những cách phòng tránh một số căn bệnh thường gặp</div>
                                        </div>
                                    </div>
                                </div>

                                <div className='section-custome'>
                                    <div className='custome-border-handbook'>
                                        <div className='bg-image section-handbook4' />
                                        <div className='text-handbook'>
                                            <div className='text-title-handbook'>Cẩm nang giúp cây ra hoa nhanh chóng</div>
                                            <div className='text-content-hanbook'>Tăng cường sinh lý là một yếu tố quan trọng giúp cải thiện chất lượng đời sống tình dục và sức khỏe tổng thể. Dưới đây là cẩm nang các biện pháp giúp tăng cường sinh lý một cách tự nhiên và hiệu quả</div>
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
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HankBook);
