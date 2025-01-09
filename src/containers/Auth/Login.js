import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import './Login.scss';
import { FormattedMessage } from 'react-intl';
import { handleLoginApi } from '../../services/userService';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            password: '',
            isShowPassword: false,
            errMsg: '',
        }

    }

    handleOnChangeInput = (event, field) => {
        this.setState({
            [field]: event.target.value
        })
    }

    handleLogin = async () => {
        this.setState({
            errMsg: ''
        })
        try {
            let data = await handleLoginApi(this.state.userName, this.state.password)
            if (data && data.errCode !== 0) {
                this.setState({
                    errMsg: data.msg
                })
            }

            if (data && data.errCode === 0) {
                this.props.userLoginSuccess(data.user)
            }
        } catch (e) {
            if (e.response) {
                if (e.response.data) {
                    this.setState({
                        errMsg: e.response.data.msg
                    })
                }
            }
        }
    }

    handleShowHidePassword = () => {
        this.setState({
            isShowPassword: !this.state.isShowPassword
        })
    }

    handleKeyDown = (event) => {
        if (event.key === 'Enter' || event.keyCode === 13) {
            this.handleLogin()
        }
    }

    render() {
        return (
            <div className='login-background'>
                <div className='login-container'>
                    <div className='login-content row' >
                        <div className='col-12 text-login'>Login</div>

                        <div className='col-12 form-group login-input'>
                            <label>Username</label>
                            <input type='text' className='form-control' placeholder='Enter your username'
                                value={this.state.userName}
                                onChange={(event) => { this.handleOnChangeInput(event, 'userName') }}
                            />
                        </div>

                        <div className='col-12 form-group login-input'>
                            <label>Password</label>
                            <div className='custom-input-password'>
                                <input type={this.state.isShowPassword ? 'text' : 'password'} className='form-control' placeholder='Enter your password'
                                    value={this.state.password}
                                    onChange={(event) => { this.handleOnChangeInput(event, 'password') }}
                                    onKeyDown={(event) => this.handleKeyDown(event)}

                                />
                                <span onClick={() => { this.handleShowHidePassword() }}>
                                    <i className={this.state.isShowPassword ? "fas fa-eye" : "fas fa-eye-slash"}></i>
                                </span>

                            </div>

                        </div>

                        <div className='col-12' style={{ color: 'red' }}>
                            {this.state.errMsg}
                        </div>

                        <div className='col-12'>
                            <button className='btn-login'
                                onClick={() => { this.handleLogin() }}>
                                LOGIN
                            </button>
                        </div>

                        <div className='col-12'>
                            <span className='forgot-password'>Forgot your password?</span>
                        </div>

                        <div className='col-12'>
                            <span className='text-other-login'>
                                Or Login with:
                            </span>
                        </div>

                        <div className='col-12 social-login'>
                            <i className="fab fa-google-plus-g google"></i>
                            <i className="fab fa-facebook-f facebook"></i>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        // userLoginFail: () => dispatch(actions.adminLoginFail()),
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
