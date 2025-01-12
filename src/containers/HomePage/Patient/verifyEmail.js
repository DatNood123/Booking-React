import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import { servicePostVerifyAppointment } from '../../../services/userService';
import HomeHeader from '../HomeHeader';
import './verifyEmail.scss';
import { Modal } from 'reactstrap';

class verifyEmail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            statusVerify: false,
            errCode: 0
        }
    }


    async componentDidMount() {
        if (this.props.location && this.props.location.search) {
            let urlParams = new URLSearchParams(this.props.location.search);
            let token = urlParams.get('token');
            let doctorId = urlParams.get('doctorId');

            let res = await servicePostVerifyAppointment({
                token: token,
                doctorId: doctorId
            })

            if (res && res.errCode === 0) {
                this.setState({
                    statusVerify: true,
                    errCode: res.errCode
                })
            } else {
                this.setState({
                    statusVerify: true,
                    errCode: res && res.errCode ? res.errCode : -1
                })
            }

        }
    }


    async componentDidUpdate(prevProps, prevState) {
        if (this.props.language !== prevProps.language) {

        }
    }

    render() {
        let { statusVerify, errCode } = this.state;
        return (
            <>
                <HomeHeader />
                <div className='verify-email-container'>
                    {statusVerify === false ?

                        <Modal
                            isOpen={true}
                            className={'loading-modal-container'}
                            size='md'
                            centered>
                            <div class="modal-content">
                                <div className="capybara" />
                                <div class="loading-line"></div>
                                <div className="spinner"></div>
                                <p>Đang xử lý...</p>
                            </div>
                        </Modal>

                        :
                        <div>
                            {errCode === 0 ?
                                <div className='success'>Xác nhận lịch hẹn thành công, vui lòng kiểm tra email!!!</div>
                                :
                                <div className='failed'>Lịch hẹn không tồn tại hoặc đã được xác nhận!!!</div>
                            }
                        </div>
                    }
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

export default connect(mapStateToProps, mapDispatchToProps)(verifyEmail);
