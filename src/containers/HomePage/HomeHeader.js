import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeHeader.scss';
import logo from '../../assets/images/logo-transparent-png.png'
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../utils/constant';
import { changeLanguageApp } from "../../store/actions"
class HomeHeader extends Component {

    changeLanguage = (language) => {
        //fire redux event: actions
        this.props.changeLanguageAppRedux(language)

    }

    render() {
        let language = this.props.language
        return (
            <>
                <div className='home-header-container'>
                    <div className='home-header-content'>
                        <div className='left-content'>
                            <i className="fas fa-bars"></i>
                            <img src={logo} />
                        </div>
                        <div className='center-content'>
                            <div className='child-content'>
                                <div><b><FormattedMessage id="homeheader.specialty" /></b></div>
                                <div className='sub-title'><FormattedMessage id="homeheader.searchdoctor" /></div>
                            </div>
                            <div className='child-content'>
                                <div><b><FormattedMessage id="homeheader.health-facility" /></b></div>
                                <div className='sub-title'><FormattedMessage id="homeheader.select-room" /></div>
                            </div>
                            <div className='child-content'>
                                <div><b><FormattedMessage id="homeheader.doctor" /></b></div>
                                <div className='sub-title'><FormattedMessage id="homeheader.select-doctor" /></div>
                            </div>
                            <div className='child-content'>
                                <div><b><FormattedMessage id="homeheader.fee" /></b></div>
                                <div className='sub-title'><FormattedMessage id="homeheader.choose-fee" /></div>
                            </div>
                        </div>
                        <div className='right-content'>
                            <div className='support'><i className="far fa-question-circle"></i>
                                <FormattedMessage id="homeheader.support" /> </div>
                            <div className={language === LANGUAGES.VI ? 'language-vi active' : 'language-vi'}><span onClick={() => { this.changeLanguage(LANGUAGES.VI) }}>VN</span></div>
                            <div className={language === LANGUAGES.EN ? 'language-en active' : 'language-en'}><span onClick={() => { this.changeLanguage(LANGUAGES.EN) }}>EN</span></div>
                        </div>
                    </div>
                </div>

                <div className='home-header-banner'>
                    <div className='home-header-border'>
                        <div className='content-up'>
                            <div className='title-1'>
                                <div className="leaf"></div>
                                <FormattedMessage id="banner.title1" />
                            </div>
                            <div className='title-2'><FormattedMessage id="banner.title2" /></div>
                            <div className='search'>
                                <div className="icon-search"></div>
                                <input type='text' placeholder='Nhu cầu của bạn là gì?'></input>
                            </div>
                        </div>
                        <div className='content-down'>
                            <div className='options'>
                                <div className='option-child'>
                                    <div className='icon-child'>
                                        <div className='icon-bonsai'></div>
                                    </div>
                                    <div className='text-child'>
                                        <FormattedMessage id="banner.specialist" />
                                    </div>
                                </div>

                                <div className='option-child'>
                                    <div className='icon-child'>
                                        <div className='icon-koi'></div>
                                    </div>
                                    <div className='text-child'>
                                        <FormattedMessage id="banner.remote" />
                                    </div>
                                </div>

                                <div className='option-child'>
                                    <div className='icon-child'>
                                        <div className='icon-tree'></div>
                                    </div>
                                    <div className='text-child'>
                                        <FormattedMessage id="banner.general" />
                                    </div>
                                </div>

                                <div className='option-child'>
                                    <div className='icon-child'>
                                        <div className='icon-forest'></div>
                                    </div>
                                    <div className='text-child'>
                                        <FormattedMessage id="banner.medical-test" />
                                    </div>
                                </div>

                                <div className='option-child'>
                                    <div className='icon-child'>
                                        <div className='icon-mountain'></div>
                                    </div>
                                    <div className='text-child'>
                                        <FormattedMessage id="banner.metal-health" />
                                    </div>
                                </div>

                                <div className='option-child'>
                                    <div className='icon-child'>
                                        <div className='icon-book'></div>
                                    </div>
                                    <div className='text-child'>
                                        <FormattedMessage id="banner.dental" />
                                    </div>
                                </div>
                            </div>
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
        userInfo: state.user.userInfo,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
