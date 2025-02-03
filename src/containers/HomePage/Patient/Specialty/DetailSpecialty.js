import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './DetailSpecialty.scss';
import HomeHeader from '../../HomeHeader';
import DoctorSchedule from '../Doctor/DoctorSchedule';
import DoctorExtraInfo from '../Doctor/DoctorExtraInfo';
import ProfileDoctor from '../Doctor/ProfileDoctor';
import { serviceGetDetailSpecialtyById, serviceGetAllCode } from '../../../../services/userService';
import _ from 'lodash';
import { LANGUAGES } from '../../../../utils';
import Select from 'react-select';

class DetailSpecialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrDoctorId: [],
            dataDetailSpecialty: {},

            listProvince: [],
            selectedProvince: { label: 'Toàn quốc', value: 'ALL' },
        }
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            let res = await serviceGetDetailSpecialtyById({
                id: id,
                location: this.state.selectedProvince.value
            })

            let resProvince = await serviceGetAllCode('PROVINCE');

            if (res && res.errCode === 0 && resProvince
                && resProvince.errCode === 0) {

                let data = res.data;
                let arrDoctorId = [];
                if (data && !_.isEmpty(res.data)) {
                    let arr = data.doctorSpecialty;
                    if (arr && arr.length > 0) {
                        arr.map(item => {
                            arrDoctorId.push(item.doctorId);
                        })

                    }
                }

                let dataProvince = resProvince.data;
                if (dataProvince && dataProvince.length > 0) {
                    dataProvince.unshift({
                        keyMap: 'ALL',
                        type: 'PROVINCE',
                        valueEn: 'All',
                        valueVie: 'Toàn quốc'
                    })
                }

                this.setState({
                    dataDetailSpecialty: res.data,
                    arrDoctorId: arrDoctorId,
                    listProvince: this.buildListProvince(dataProvince)
                })
            }
        }
    }

    async componentDidUpdate(prevProps, prevState) {
        if (this.props.language !== prevProps.language) {
            let resProvince = await serviceGetAllCode('PROVINCE');
            let dataProvince = resProvince.data;
            if (dataProvince && dataProvince.length > 0) {
                dataProvince.unshift({
                    keyMap: 'ALL',
                    type: 'PROVINCE',
                    valueEn: 'All',
                    valueVie: 'Toàn quốc'
                })
            }
            this.setState({
                listProvince: this.buildListProvince(dataProvince)
            })
        }
    }

    handleChangeSelected = async (selectedOption) => {
        let id = this.props.match.params.id;
        let location = selectedOption.value;
        let res = await serviceGetDetailSpecialtyById({
            id: id,
            location: location,
        });

        if (res && res.errCode === 0) {
            let data = res.data;
            let arrDoctorId = [];
            if (data && !_.isEmpty(res.data)) {
                let arr = data.doctorSpecialty;
                if (arr && arr.length > 0) {
                    arr.map((item) => {
                        arrDoctorId.push(item.doctorId);
                    });
                }
            }

            this.setState({
                arrDoctorId: arrDoctorId,
                selectedProvince: selectedOption
            })
        }
    }

    buildListProvince = (inputData) => {
        let result = [];
        let { language } = this.props;
        if (inputData && inputData.length > 0) {
            inputData.map(item => {
                let object = {};
                let labelVi = item.valueVie;
                let labelEn = item.valueEn;

                object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                object.value = item.keyMap;
                result.push(object)
            })
        }

        return result;
    }

    render() {
        let { arrDoctorId, dataDetailSpecialty } = this.state;
        console.log(dataDetailSpecialty)
        return (
            <div className='detail-specialty-container'>
                <HomeHeader />
                {/* grid */}
                <div className='detail-specialty-boder'>
                    <div className='detail-specialty-body wide'>
                        <div className='description-specialty' style={{ backgroundImage: `url(${dataDetailSpecialty.image})` }}>
                            <div className='content-description-title'>
                                {dataDetailSpecialty && !_.isEmpty(dataDetailSpecialty) &&
                                    <div dangerouslySetInnerHTML={{ __html: dataDetailSpecialty.descriptionHTML }}></div>
                                }
                            </div>
                        </div>

                        <div className='feature'>
                            {dataDetailSpecialty && !_.isEmpty(dataDetailSpecialty) &&
                                <div id='content-feature' className='content-feature' dangerouslySetInnerHTML={{ __html: dataDetailSpecialty.descriptionHTML }}></div>
                            }
                        </div>
                    </div>
                </div>

            </div >
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
