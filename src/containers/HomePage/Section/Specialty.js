import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Slider from 'react-slick';
import { serviceGetAllSpecialty } from '../../../services/userService';
import './Specialty.scss';
import { withRouter } from 'react-router';

class Specialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSpecialty: []
        }
    }

    async componentDidMount() {
        let res = await serviceGetAllSpecialty();
        if (res && res.errCode === 0) {
            this.setState({
                dataSpecialty: res.data ? res.data : []
            })
        }
    }

    handleViewDetailSpecialty = (item) => {
        if (this.props.history) {
            this.props.history.push(`/detail-specialty/${item.id}`)
        }

    }

    render() {
        let settings = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
        }

        let { dataSpecialty } = this.state;
        return (
            <>
                <div className='section-share section-specialty'>
                    <div className='section-container'>
                        <div className='section-header'>
                            <span className='title-section'><FormattedMessage id="specialty.popular-spceialty" /></span>
                        </div>
                        <div className='section-specialty-body'>
                            <Slider {...settings}>
                                {dataSpecialty && dataSpecialty.length > 0 &&
                                    dataSpecialty.map((item, index) => {
                                        return (
                                            <div className='section-custome' key={index}>
                                                <div className='specialty-container'>

                                                    <div className='specialty-name-container'>
                                                        <div className='specialty-name'>{item.name}</div>
                                                    </div>

                                                    <div className='specialty-info'>
                                                        <div
                                                            style={{ backgroundImage: `url(${item.image})` }}
                                                            className='bg-image '>

                                                        </div>

                                                        <div className='specialty-name-info-container'>
                                                            {/* <div className='specialty-name-info'>Chau SaDec</div> */}
                                                            <div className='specialty-slogan'>Nâng tầm vẻ đẹp <br></br> ~Kiến tạo không gian~</div>
                                                            <div className='specialty-content'>
                                                                Công ty Hoa Kiểng Chau SaDec chuyên thi công
                                                                cảnh quan sân vườn, cung cấp dịch vụ làm đẹp toàn diện cho không gian xanh.

                                                            </div>

                                                            <div className='specialty-button'>
                                                                <button onClick={() => this.handleViewDetailSpecialty(item)}>Tìm hiểu thêm</button>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        )
                                    })
                                }

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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Specialty));
