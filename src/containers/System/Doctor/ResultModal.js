import React, { Component } from 'react';
import { connect } from "react-redux";
import './ResultModal.scss';
import { FormattedMessage } from 'react-intl';
import { Modal, ModalBody, ModalFooter, Button } from 'reactstrap';
import { CommonUtils } from '../../../utils';

class ResultModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            imageBase64: ''
        }
    }

    async componentDidMount() {
        if (this.props.dataModalFromParent) {
            this.setState({
                email: this.props.dataModalFromParent.email
            })
        }
    }


    async componentDidUpdate(prevProps, prevState) {
        if (this.props.dataModalFromParent !== prevProps.dataModalFromParent) {
            this.setState({
                email: this.props.dataModalFromParent.email
            })
        }
    }

    handleOnChangeEmail = (event) => {
        this.setState({
            email: event.target.value
        })
    }

    handleOnChangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file)
            this.setState({
                imageBase64: base64
            })
        }
    }

    handleSendResultSurvey = () => {
        this.props.sendResultSurveyFromParent(this.state)
    }

    render() {
        let { isOpenResultModalFromParent, dataModalFromParent,
            closeResultModelFromParent, sendResultSurveyFromParent } = this.props;
        return (
            <>
                <Modal
                    isOpen={isOpenResultModalFromParent}
                    className={'results-modal-container'}
                    size='md'
                    centered>
                    <div className='booking-modal-header'>
                        <span className='left'><FormattedMessage id='manage-customer.title-modal' /></span>
                        <span
                            onClick={closeResultModelFromParent}
                            className='right'>
                            <i className='fas fa-times'></i>
                        </span>
                    </div>
                    <ModalBody>
                        <div className='row'>
                            <div className='col-6 form-group'>
                                <label>Email khách hàng</label>
                                <input
                                    className='form-control'
                                    type='email'
                                    value={this.state.email}
                                    onChange={(event) => this.handleOnChangeEmail(event)}
                                />
                            </div>

                            <div className='col-6 form-group'>
                                <label>Chọn file khảo sát</label>
                                <input
                                    className='form-control-file'
                                    type='file'
                                    onChange={(event) => this.handleOnChangeImage(event)}
                                />
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color='primary' onClick={() => this.handleSendResultSurvey()}>Send</Button>
                        <Button color='secondary' onClick={closeResultModelFromParent}>Cancel</Button>
                    </ModalFooter>
                </Modal>


            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ResultModal);
