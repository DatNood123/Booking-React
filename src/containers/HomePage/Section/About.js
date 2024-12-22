import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

class About extends Component {
    render() {
        return (
            <>
                <div className='section-share section-about'>
                    <div className='section-about-header'>
                        <FormattedMessage id="about.about-peachbooking" />
                    </div>
                    <div className='section-about-content'>
                        <div className='content-left'>
                            <iframe
                                width="100%"
                                height="450px"
                                src="https://www.youtube.com/embed/8vJqftQGYUg?list=RD8vJqftQGYUg"
                                title="Video clip"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                referrerPolicy="strict-origin-when-cross-origin"
                                allowFullScreen>
                            </iframe>
                        </div>

                        <div className='content-right'>
                            <div>
                                "<FormattedMessage id="about.saying" />"  <br></br>  <br></br>
                                "<FormattedMessage id="about.saying2" />"
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
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(About);
