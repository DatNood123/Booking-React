import React, { Component } from 'react';
import { connect } from "react-redux";
import './LoadingModal.scss';
import { LANGUAGES } from '../../../../utils';
import { FormattedMessage } from 'react-intl';
import { Modal } from 'reactstrap';

class LoadingModal extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    async componentDidMount() {
        let { language } = this.props;
    }

    async componentDidUpdate(prevProps, prevState) {
        if (this.props.language !== prevProps.language) {

        }
    }


    render() {
        let { isLoadingFromParent } = this.props

        return (
            <>
                <Modal
                    isOpen={isLoadingFromParent}
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

export default connect(mapStateToProps, mapDispatchToProps)(LoadingModal);
