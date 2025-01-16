import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './ManageSpeacialty.scss';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import { CommonUtils } from '../../../utils';
import { toast } from 'react-toastify';
import { serviceCreateNewSpecialty } from '../../../services/userService';

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageSpeacialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            imageBase64: '',
            contentHTML: '',
            contentMarkdown: '',
        }
    }

    async componentDidMount() {
        let { language } = this.props;
    }

    async componentDidUpdate(prevProps, prevState) {
        if (this.props.language !== prevProps.language) {

        }
    }

    handleOnChangInput = (event, id) => {
        let copyState = { ...this.state };
        copyState[id] = event.target.value;

        this.setState({
            ...copyState
        })
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentHTML: html,
            contentMarkdown: text
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

    handleSaveSpecialty = async () => {
        let res = await serviceCreateNewSpecialty(this.state)

        if (res && res.errCode === 0) {
            toast.success('Create new specialty success!')
        } else {
            toast.error('Create new specialty failed!')
        }
    }

    render() {
        let { language } = this.props
        return (
            <>
                <div className='manage-specialty-container'>
                    <div className='ms-title'>Quản lý dịch vụ</div>

                    <div className='add-new-specialty row'>
                        <div className='col-6 form-group'>
                            <label>Tên dịch vụ</label>
                            <input
                                onChange={(event) => this.handleOnChangInput(event, 'name')}
                                className='form-control'
                                type='text'
                                value={this.state.name}>
                            </input>
                        </div>

                        <div className='col-6 form-group'>
                            <label>Ảnh dịch vụ</label>
                            <input
                                onChange={(event) => this.handleOnChangeImage(event)}
                                className='form-control-file'
                                type='file'></input>
                        </div>
                        <div className='col-12'>
                            <MdEditor
                                style={{ height: '350px', marginTop: '10px' }}
                                renderHTML={text => mdParser.render(text)}
                                onChange={this.handleEditorChange}
                                value={this.state.contentMarkdown}
                            />
                        </div>

                        <div className='col-12'>
                            <button
                                onClick={() => this.handleSaveSpecialty()}
                                className='btn-add-new-speacialty'>Save</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpeacialty);
