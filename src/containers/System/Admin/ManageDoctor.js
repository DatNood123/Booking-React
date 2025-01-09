import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from "../../../store/actions";
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import './ManageDoctor.scss'
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';
import { CRUD_ACTIONS, LANGUAGES } from '../../../utils';
import { serviceGetDetailDoctor } from '../../../services/userService'

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            //save to Markdown table
            contentMarkdown: '',
            contentHTML: '',
            selectedOption: '',
            description: '',
            listDoctors: [],
            hasOldData: false,

            //save to doctor_infor table
            listPrice: [],
            listProvince: [],
            listPayment: [],

            selectedPrice: '',
            selectedProvince: '',
            selectedPayment: '',
            nameClinic: '',
            addressClinic: '',
            note: '',
        }
    }

    componentDidMount() {
        this.props.fetchAllDoctorRedux();
        this.props.getRequiredDoctorInfoRedux();
    }

    buildDataInputSelect = (inputData, type) => {
        let result = [];
        let { language } = this.props;
        if (inputData && inputData.length > 0) {
            if (type === 'USERS') {
                inputData.map((item, index) => {
                    let object = {};
                    let labelVi = `${item.lastName} ${item.firstName}`;
                    let labelEn = `${item.firstName} ${item.lastName}`;

                    object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                    object.value = item.id;
                    result.push(object)
                })
            }
            if (type === 'PRICE') {
                inputData.map((item, index) => {
                    let object = {};
                    let labelVi = `${item.valueVie} VND`;
                    let labelEn = `${item.valueEn} USD`;

                    object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                    object.value = item.keyMap;
                    result.push(object)
                })
            }

            if (type === 'PAYMENT' || type === 'PROVINCE') {
                inputData.map((item, index) => {
                    let object = {};
                    let labelVi = item.valueVie;
                    let labelEn = item.valueEn;

                    object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                    object.value = item.keyMap;
                    result.push(object)
                })
            }

            return result
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.allDoctors !== this.props.allDoctors) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors, 'USERS')
            this.setState({
                listDoctors: dataSelect
            })
        }

        if (prevProps.allRequiredDoctorInfor !== this.props.allRequiredDoctorInfor) {
            let { resPayment, resPrice, resProvince } = this.props.allRequiredDoctorInfor
            let dataSelectPrice = this.buildDataInputSelect(resPrice, 'PRICE')
            let dataSelectPayment = this.buildDataInputSelect(resPayment, 'PAYMENT')
            let dataSelectProvince = this.buildDataInputSelect(resProvince, 'PROVINCE')

            this.setState({
                listPrice: dataSelectPrice,
                listProvince: dataSelectProvince,
                listPayment: dataSelectPayment,
            })
        }

        if (prevProps.language !== this.props.language) {
            let { resPayment, resPrice, resProvince } = this.props.allRequiredDoctorInfor
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors, 'USERS')
            let dataSelectPrice = this.buildDataInputSelect(resPrice, 'PRICE')
            let dataSelectPayment = this.buildDataInputSelect(resPayment, 'PAYMENT')
            let dataSelectProvince = this.buildDataInputSelect(resProvince, 'PROVINCE')
            this.setState({
                listDoctors: dataSelect,
                listPrice: dataSelectPrice,
                listProvince: dataSelectProvince,
                listPayment: dataSelectPayment,
            })
        }
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html
        })
    }

    handleSaveContentMarkdown = () => {
        let { hasOldData } = this.state
        this.props.saveInfoDoctorRedux({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            doctorId: this.state.selectedOption.value,
            selectedPrice: this.state.selectedPrice.value,
            selectedProvince: this.state.selectedProvince.value,
            selectedPayment: this.state.selectedPayment.value,
            nameClinic: this.state.nameClinic,
            addressClinic: this.state.addressClinic,
            note: this.state.note,
            action: hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE
        })

        this.setState({
            contentMarkdown: '',
            contentHTML: '',
            selectedOption: '',
            description: '',
            selectedPrice: '',
            selectedProvince: '',
            selectedPayment: '',
            nameClinic: '',
            addressClinic: '',
            note: '',
            hasOldData: false
        })
    }

    handleChangeSelected = async (selectedOption) => {
        this.setState({ selectedOption })
        let res = await serviceGetDetailDoctor(selectedOption.value)
        if (res && res.errCode === 0 && res.data && res.data.Markdown) {
            let markdown = res.data.Markdown;
            let { listPayment, listPrice, listProvince } = this.state
            let addressClinic = '', nameClinic = '', note = '',
                paymentId = '', priceId = '', provinceId = '',
                selectedPayment = '', selectedPrice = '', selectedProvince = ''

            if (res.data.Doctor_Infor) {
                addressClinic = res.data.Doctor_Infor.addressClinic
                nameClinic = res.data.Doctor_Infor.nameClinic
                note = res.data.Doctor_Infor.note
                paymentId = res.data.Doctor_Infor.paymentId
                priceId = res.data.Doctor_Infor.priceId
                provinceId = res.data.Doctor_Infor.provinceId

                //Tim gia tri dang duoc chon
                selectedPayment = listPayment.find(item => {
                    return item && item.value === paymentId
                })

                selectedPrice = listPrice.find(item => {
                    return item && item.value === priceId
                })

                selectedProvince = listProvince.find(item => {
                    return item && item.value === provinceId
                })
            }
            this.setState({
                contentMarkdown: markdown.contentMarkdown,
                contentHTML: markdown.contentHTML,
                description: markdown.description,
                addressClinic: addressClinic,
                nameClinic: nameClinic,
                note: note,
                selectedPayment: selectedPayment,
                selectedPrice: selectedPrice,
                selectedProvince: selectedProvince,
                hasOldData: true
            })

        } else {
            this.setState({
                contentMarkdown: '',
                contentHTML: '',
                description: '',
                addressClinic: '',
                nameClinic: '',
                note: '',
                hasOldData: false,
            })
        }
    }

    handleChangeSelectedDoctorInfo = async (selectedOption, name) => {
        let stateName = name.name;
        let stateCopy = { ...this.state }
        stateCopy[stateName] = selectedOption;

        this.setState({
            ...stateCopy
        })
    }

    handleOnChangeText = (event, id) => {
        let stateCopy = { ...this.state };
        stateCopy[id] = event.target.value;
        this.setState({
            ...stateCopy
        })
    }

    render() {
        console.log(this.state)
        let { hasOldData } = this.state;
        return (
            <div className='manage-doctor-container'>
                <div className='manage-doctor-title'>
                    <FormattedMessage id="admin.manage-doctor.title" />
                </div>

                <div className='more-info'>
                    <div className='content-left form-group'>
                        <label><FormattedMessage id="admin.manage-doctor.choose-doctor" /></label>
                        <Select
                            value={this.state.selectedOption}
                            onChange={this.handleChangeSelected}
                            options={this.state.listDoctors}
                            placeholder={<FormattedMessage id="admin.manage-doctor.staff" />}
                        />
                    </div>

                    <div className='content-right'>
                        <label><FormattedMessage id="admin.manage-doctor.information" /> </label>
                        <textarea className='form-control' rows="2"
                            onChange={(event) => this.handleOnChangeText(event, 'description')}
                            value={this.state.description}
                        >
                        </textarea>
                    </div>
                </div>

                <div className='doctor-info-extra row mt-3'>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="admin.manage-doctor.price" /></label>
                        <Select
                            value={this.state.selectedPrice}
                            onChange={this.handleChangeSelectedDoctorInfo}
                            options={this.state.listPrice}
                            placeholder={<FormattedMessage id="admin.manage-doctor.price" />}
                            name="selectedPrice"
                        />
                    </div>

                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="admin.manage-doctor.payment" /></label>
                        <Select
                            value={this.state.selectedPayment}
                            onChange={this.handleChangeSelectedDoctorInfo}
                            options={this.state.listPayment}
                            placeholder={<FormattedMessage id="admin.manage-doctor.payment" />}
                            name="selectedPayment"
                        />
                    </div>

                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="admin.manage-doctor.province" /></label>
                        <Select
                            value={this.state.selectedProvince}
                            onChange={this.handleChangeSelectedDoctorInfo}
                            options={this.state.listProvince}
                            placeholder={<FormattedMessage id="admin.manage-doctor.province" />}
                            name="selectedProvince"
                        />
                    </div>

                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="admin.manage-doctor.nameClinic" /></label>
                        <input className='form-control'
                            value={this.state.nameClinic}
                            onChange={(event) => this.handleOnChangeText(event, 'nameClinic')}
                        />
                    </div>

                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="admin.manage-doctor.addressClinic" /></label>
                        <input className='form-control'
                            value={this.state.addressClinic}
                            onChange={(event) => this.handleOnChangeText(event, 'addressClinic')}
                        />
                    </div>

                    <div className='col-4 form-group'>
                        <label>Note</label>
                        <input className='form-control'
                            value={this.state.note}
                            onChange={(event) => this.handleOnChangeText(event, 'note')}
                        />
                    </div>
                </div>

                <div className='manage-doctor-editor'>
                    <MdEditor
                        style={{ height: '500px', marginTop: '20px' }}
                        renderHTML={text => mdParser.render(text)}
                        onChange={this.handleEditorChange}
                        value={this.state.contentMarkdown}
                    />
                </div>

                <button className={hasOldData === true ? 'save-content-markdown' : 'create-content-markdown'}
                    onClick={() => this.handleSaveContentMarkdown()}
                >
                    {hasOldData === true ?
                        <span><FormattedMessage id="admin.manage-doctor.update" /></span> : <span><FormattedMessage id="admin.manage-doctor.create" /></span>
                    }
                </button>

            </div>

        );
    }

}

const mapStateToProps = state => {
    return {
        allDoctors: state.admin.allDoctors,
        language: state.app.language,
        allRequiredDoctorInfor: state.admin.allRequiredDoctorInfor,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        saveInfoDoctorRedux: (data) => dispatch(actions.saveInfoDoctor(data)),
        fetchAllDoctorRedux: () => dispatch(actions.fetchAllDoctor()),
        getRequiredDoctorInfoRedux: () => dispatch(actions.getRequiredDoctorInfo()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
