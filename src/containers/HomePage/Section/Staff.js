import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from 'react-slick';
import { FormattedMessage } from 'react-intl';
import * as actions from "../../../store/actions";
import { LANGUAGES } from "../../../utils";
import { withRouter } from 'react-router';
import './Staff.scss'

class Staff extends Component {
    constructor(props) {
        super(props)
        this.state = {
            arrDoctors: []
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.topDoctorsRedux !== this.props.topDoctorsRedux) {
            this.setState({
                arrDoctors: this.props.topDoctorsRedux
            })
        }
    }

    componentDidMount() {
        this.props.loadTopDoctor();
    }

    handleViewDetailDoctor = (doctor) => {
        if (this.props.history) {
            this.props.history.push(`/detail-doctor/${doctor.id}`)
        }

    }

    render() {
        let { language } = this.props;
        let allDoctors = this.state.arrDoctors;

        let settings = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 2,
            slidesToScroll: 1,
        }
        return (
            <>
                <div className='section-share section-staff wide'>
                    <div className='section-container'>
                        <div className='section-header'>
                            <span className='title-section'><FormattedMessage id="doctor.good-doctor" /></span>
                        </div>
                        <div className='section-body'>
                            <Slider {...this.props.settings}>
                                {allDoctors && allDoctors.length > 0 &&
                                    allDoctors.map((item, index) => {
                                        let imageBase64 = '';
                                        if (item.image) {
                                            imageBase64 = new Buffer(item.image, 'base64').toString('binary')
                                        }
                                        let nameVi = `${item.positionData.valueVie} ${item.lastName} ${item.firstName} `
                                        let nameEn = `${item.positionData.valueEn} ${item.firstName} ${item.lastName}`

                                        return (
                                            <div className='section-custome' key={index}>
                                                <div className='cutome-border'>
                                                    <div className='outter-bg'>
                                                        <div className='bg-image section-doctor'
                                                            style={{ backgroundImage: `url(${imageBase64})` }} />
                                                    </div>
                                                    <div className='position text-center'>
                                                        <div className='name-staff'>{language === LANGUAGES.VI ? nameVi : nameEn}</div>
                                                        <div>{item.address}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }

                            </Slider>
                        </div>

                        <div className='section-body2'>
                            <Slider {...settings}>
                                {allDoctors && allDoctors.length > 0 &&
                                    allDoctors.map((item, index) => {
                                        let imageBase64 = '';
                                        if (item.image) {
                                            imageBase64 = new Buffer(item.image, 'base64').toString('binary')
                                        }
                                        let nameVi = `${item.positionData.valueVie} ${item.lastName} ${item.firstName} `
                                        let nameEn = `${item.positionData.valueEn} ${item.firstName} ${item.lastName}`

                                        return (
                                            <div className='section-custome' key={index}>
                                                <div className='cutome-border'>
                                                    <div className='outter-bg'>
                                                        <div className='bg-image section-doctor'
                                                            style={{ backgroundImage: `url(${imageBase64})` }} />
                                                    </div>
                                                    <div className='position text-center'>
                                                        <div className='name-staff'>{language === LANGUAGES.VI ? nameVi : nameEn}</div>
                                                        <div>{item.address}</div>
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
        topDoctorsRedux: state.admin.topDoctors,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadTopDoctor: () => dispatch(actions.fetchTopDoctor())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Staff));
