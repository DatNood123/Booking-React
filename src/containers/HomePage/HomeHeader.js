import React, { Component } from 'react';
import './HomeHeader.scss';
import { connect } from 'react-redux';
import logo from '../../assets/images/logo-transparent-png.png';
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../utils/constant';
import { changeLanguageApp } from "../../store/actions";
import { withRouter } from 'react-router';

class HomeHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeIndex: 0,
        };

        this.sadecRef = React.createRef(); // Tạo tham chiếu đến phần tử DOM
        this.observer = null; // Biến lưu trữ Intersection Observer
    }

    componentDidMount() {
        // Tạo một Intersection Observer
        this.observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const element = this.sadecRef.current;
                        element.classList.remove('tracking'); // Reset animation
                        void element.offsetWidth; // Buộc reflow
                        element.classList.add('tracking'); // Kích hoạt lại animation
                    }
                });
            },
            { threshold: 0.5 } // Tỷ lệ hiển thị cần thiết để kích hoạt
        );

        // Gắn Observer vào phần tử
        if (this.sadecRef.current) {
            this.observer.observe(this.sadecRef.current);
        }
    }

    componentWillUnmount() {
        // Hủy Observer khi component bị unmount
        if (this.observer && this.sadecRef.current) {
            this.observer.unobserve(this.sadecRef.current);
        }
    }

    changeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language);
    };

    handleBackToHomepage = () => {
        if (this.props.history) {
            this.props.history.push(`/home`);
        }
    };

    handleItemClick = (index) => {
        let { onNavigate } = this.props;
        this.setState({ activeIndex: index });

        if (!onNavigate) {
            alert("onNavigate is not provided");
            return;
        }

        let sections = ["homeHeader", "specialty", "product", "staff"];
        onNavigate(sections[index]);
    };

    render() {
        let { language, isShowBanner } = this.props;
        let { activeIndex } = this.state;

        return (
            <>
                {/* Nav header */}
                <div className="home-header-container">
                    <div className="left-content">
                        <img
                            onClick={this.handleBackToHomepage}
                            src={logo}
                        />
                    </div>

                    {isShowBanner === true &&
                        <div className="content-center">
                            {["Trang chủ", "Dịch vụ", "Sản phẩm", "Giới thiệu"].map((item, index) => (
                                <div
                                    className="nav-item"
                                    key={index}
                                    onClick={() => this.handleItemClick(index)}
                                >
                                    {activeIndex === index ? (
                                        <>
                                            <button className="item-text">{item}</button>
                                            <div className="item-line"></div>
                                        </>
                                    ) : (
                                        <button className="item-text">{item}</button>
                                    )}
                                </div>
                            ))}
                        </div>
                    }

                    <div className="right-content">
                        <button class="button">
                            <span class="button-content">Liên hệ</span>
                        </button>

                        <div className="change-language">
                            <div
                                className={language === LANGUAGES.VI ? 'language-vi active' : 'language-vi'}
                                onClick={() => this.changeLanguage(LANGUAGES.VI)}
                            >
                                VN
                            </div>

                            <div
                                className={language === LANGUAGES.EN ? 'language-en active' : 'language-en'}
                                onClick={() => this.changeLanguage(LANGUAGES.EN)}
                            >
                                EN
                            </div>
                        </div>
                    </div>
                </div>

                {isShowBanner === true &&
                    <div className="hero-page-container">
                        <div className='grid wide'>
                            <div className="main-hero-content">
                                <div className="hero-content-left">
                                    <div className='logo'>
                                        <div className='chau'>CHAU</div>
                                        <div ref={this.sadecRef} className='sadec'>SA DEC</div>
                                        <span>Chuyên cung cấp hoa kiểng chất lượng
                                            và dịch vụ thi công sân vườn chuyên nghiệp,
                                            mang đến không gian xanh hoàn hảo cho ngôi nhà của bạn.
                                        </span>
                                        <button className='btn-contact'>
                                            Làm Đẹp Sân Vườn
                                            <div className="hoverEffect">
                                                <div></div>
                                            </div>
                                        </button>
                                    </div>
                                </div>

                                <div className="hero-content-right">
                                    <div className='image-icon-outter'>
                                        <div className='image-icon'></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <div className="fish-effect"></div> */}
                        <div className="water-effect"></div>
                    </div>
                }
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    isLoggedIn: state.user.isLoggedIn,
    userInfo: state.user.userInfo,
    language: state.app.language,
});

const mapDispatchToProps = (dispatch) => ({
    changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeHeader));
