import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './ManageClinic.scss';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import { CommonUtils, LANGUAGES } from '../../../utils';
import { toast } from 'react-toastify';
import { serviceCreateNewProduct, serviceGetAllCode } from '../../../services/userService';
import Select from 'react-select';

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageClinic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            imageBase64: '',
            contentHTML: '',
            contentMarkdown: '',
            price: '',

            selectedOption: '',
            listProduct: [],
        }
    }

    async componentDidMount() {
        let { language } = this.props;
        let dataProduct = await serviceGetAllCode('TREE');

        if (dataProduct && dataProduct.errCode === 0) {
            this.setState({
                listProduct: this.buildDataProduct(dataProduct.data)
            })
        }


    }

    buildDataProduct = (inputData) => {
        let { language } = this.props;
        let data = [];
        if (inputData && inputData.length > 0) {

            inputData.map((item, index) => {
                let object = {};
                let nameVi = item.valueVie;
                let nameEn = item.valueEn;

                object.label = language === LANGUAGES.VI ? nameVi : nameEn;
                object.value = item.keyMap

                data.push(object)
            })

        }

        return data
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

    handleSaveProduct = async () => {
        let res = await serviceCreateNewProduct({
            name: this.state.name,
            imageBase64: this.state.imageBase64,
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            price: this.state.price,
            selectedOption: this.state.selectedOption.value,
        })

        if (res && res.errCode === 0) {
            toast.success('Create new product succeed!')
            this.setState({
                name: '',
                imageBase64: '',
                contentHTML: '',
                contentMarkdown: '',
                price: '',
                selectedOption: '',
            })
        } else {
            toast.error('Create new product failed!')
        }
    }

    handleChangeSelected = (selectedOption) => {
        this.setState({ selectedOption })
    }

    render() {
        console.log('listProduct: ', this.state.listProduct)
        let { language } = this.props
        return (
            <>
                <div className='manage-specialty-container'>
                    <div className='ms-title'>Quản lý sản phẩm</div>

                    <div className='add-new-specialty row'>
                        <div className='col-6 form-group'>
                            <label>Tên sản phẩm</label>
                            <input
                                onChange={(event) => this.handleOnChangInput(event, 'name')}
                                className='form-control'
                                type='text'
                                value={this.state.name}>
                            </input>
                        </div>

                        <div className='col-6 form-group'>
                            <label>Ảnh sản phẩm</label>
                            <input
                                onChange={(event) => this.handleOnChangeImage(event)}
                                className='form-control-file'
                                type='file'></input>
                        </div>


                        <div className='col-6 form-group'>
                            <label>Loại sản phẩm</label>
                            <Select
                                value={this.state.selectedOption}
                                onChange={this.handleChangeSelected}
                                options={this.state.listProduct}
                                placeholder={'Chọn loại sản phẩm'}
                            />
                        </div>

                        <div className='col-6 form-group'>
                            <label>Giá sản phẩm</label>
                            <input
                                value={this.state.price}
                                onChange={(event) => this.handleOnChangInput(event, 'price')}
                                className='form-control'
                            ></input>
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
                                onClick={() => this.handleSaveProduct()}
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageClinic);
