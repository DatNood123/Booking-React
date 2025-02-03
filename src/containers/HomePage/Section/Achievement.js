import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './Achievement.scss';

class Achievement extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }

        this.lenis = null;
    }

    async componentDidMount() {
        let { language } = this.props;

    }

    async componentDidUpdate(prevProps, prevState) {
        if (this.props.language !== prevProps.language) {

        }
    }

    render() {
        let { language } = this.props;
        let images = [
            'https://images.unsplash.com/photo-1718969604981-de826f44ce15?w=1200&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1476180814856-a36609db0493?w=1200&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1595407660626-db35dcd16609?w=1200&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1599054799131-4b09c73a63cf?w=1200&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1719963532023-01b573d1d584?w=1200&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1714328101501-3594de6cb80f?w=1200&auto=format&fit=crop'
        ];
        return (
            <>
                <div className='achievement-container wide'>
                    <div className='achievement-content'>
                        <div className='header'>
                            <div className='header-content'>Công Trình Đã Hoàn Thiện</div>
                        </div>

                        <div className="achievement-wrapper">
                            <div className={`sticky-item sticky-item-0`}>
                                <div style={{ backgroundImage: `url(${images[0]})` }} className={`image-style image-style-0`}>
                                    <div className='content-description-container achievement-one'>
                                        <div className='content-title-left'>

                                        </div>

                                        <div className='content-desciption-left'>

                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className={`sticky-item sticky-item-1`}>
                                <div style={{ backgroundImage: `url(${images[1]})` }} className={`image-style image-style-1`}>
                                    <div className='content-description-container achievement-two' >
                                        <div className='content-title-right'>

                                        </div>

                                        <div className='content-desciption-right'>

                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className={`sticky-item sticky-item-2`}>
                                <div style={{ backgroundImage: `url(${images[2]})` }} className={`image-style image-style-2`}>
                                    <div className='content-description-container achievement-three'>
                                        <div className='content-title-center'>

                                        </div>

                                        <div className='content-desciption-center'>

                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className={`sticky-item sticky-item-3`}>
                                <div style={{ backgroundImage: `url(${images[3]})` }} className={`image-style image-style-3`}>
                                    <div className='content-description-container achievement-four'>
                                        <div className='content-title-left-bottom'>

                                        </div>

                                        <div className='content-desciption-left-bottom'>

                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className={`sticky-item sticky-item-4`}>
                                <div style={{ backgroundImage: `url(${images[4]})` }} className={`image-style image-style-4`}>
                                    <div className='content-description-container achievement-five'></div>
                                </div>
                            </div>

                            <div className={`sticky-item sticky-item-5`}>
                                <div style={{ backgroundImage: `url(${images[5]})` }} className={`image-style image-style-5`}>
                                    <div className='content-description-container'></div>
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
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Achievement);



