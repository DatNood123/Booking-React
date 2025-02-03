import React, { Component, createRef, useRef } from 'react';
import { connect } from 'react-redux';
import HomeHeader from './HomeHeader';
import Specialty from './Section/Specialty';
import Product from './Section/Product';
import Staff from './Section/Staff';
import About from './Section/About';
import HomeFooter from './HomeFooter';
import './HomePage.scss';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Achievement from './Section/Achievement';

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

    componentDidMount() {
        this.createFallingLeaves();
    }

    createFallingLeaves = () => {
        let numberOfLeaves = 10;
        let leavesContainer = document.querySelector('.falling-leaves');

        if (!leavesContainer) {
            return;
        }

        for (let i = 0; i < numberOfLeaves; i++) {
            let leaf = document.createElement('div');
            leaf.classList.add('leaf');
            leaf.style.left = `${Math.random() * 100}vw`; // Vị trí ngẫu nhiên từ 0 đến 100% chiều ngang
            leaf.style.animationDuration = `${Math.random() * 3 + 6}s`; // Thời gian rơi ngẫu nhiên từ 4s đến 7s
            leaf.style.animationDelay = `${Math.random() * 5}s`; // Độ trễ ngẫu nhiên từ 0 đến 5s
            leavesContainer.appendChild(leaf);
        }
    }

    handleScrollTo = (section) => {
        if (this.sections[section]?.current) {
            this.sections[section].current.scrollIntoView({
                behavior: 'smooth', // Hiệu ứng cuộn mượt
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
            <div className='all-page'>
                <div className="falling-leaves"></div>
                <div ref={this.sections.homeHeader}>
                    <HomeHeader onNavigate={this.handleScrollTo} isShowBanner={true} />
                </div>
                <div ref={this.sections.specialty}>
                    <Specialty />
                </div>
                <div ref={this.sections.product}>
                    <Product />
                </div>
                <div ref={this.sections.staff}>
                    <Achievement />
                </div>
                <Staff settings={settings} />
                {/* <About /> */}
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
