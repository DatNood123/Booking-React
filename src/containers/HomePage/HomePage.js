import React, { Component, createRef } from 'react';
import { connect } from 'react-redux';
import HomeHeader from './HomeHeader';
import Specialty from './Section/Specialty';
import Product from './Section/Product';
import OutstandingDoctor from './Section/OutstandingDoctor';
import HankBook from './Section/HankBook';
import About from './Section/About';
import HomeFooter from './HomeFooter';
import './HomePage.scss';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class HomePage extends Component {

    constructor(props) {
        super(props);
        this.sections = {
            homeHeader: createRef(),
            specialty: createRef(),
            product: createRef(),
            staff: createRef(),
        }
    }

    handleScrollTo = (section) => {
        if (this.sections[section]?.current) {
            this.sections[section].current.scrollIntoView({
                behavior: 'smooth', // Hiệu ứng cuộn mượt
                block: 'start', // Đưa phần tử lên đầu màn hình
            });
        }
    }

    render() {
        let settings = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1,
        }
        return (
            <div>
                <div ref={this.sections.homeHeader}>
                    <HomeHeader onNavigate={this.handleScrollTo} isShowBanner={true} />
                </div>
                <div ref={this.sections.specialty}>
                    <Specialty settings={settings} />
                </div>
                <div ref={this.sections.product}>
                    <Product settings={settings} />
                </div>
                <div ref={this.sections.staff}>
                    <OutstandingDoctor settings={settings} />
                </div>
                <About />
                <HomeFooter />
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
