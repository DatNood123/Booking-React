import React, { Component } from 'react';
import { connect } from "react-redux";
import './BookingModal.scss';
import { LANGUAGES } from '../../../../utils';
import { FormattedMessage } from 'react-intl';
import { Modal } from 'reactstrap';
import ProfileDoctor from '../Doctor/ProfileDoctor';
import _ from 'lodash';


class BookingModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowInfo: true
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
        let { language, isOpenModalFromParent, closeBookingModalFromParent,
            dataScheduleTimeModalFromParent } = this.props;

        let { isShowInfo } = this.state
        let doctorId = '';

        if (dataScheduleTimeModalFromParent && !_.isEmpty(dataScheduleTimeModalFromParent)) {
            doctorId = dataScheduleTimeModalFromParent.doctorId;
        }



        console.log('dataScheduleTimeModalFromParent: ', dataScheduleTimeModalFromParent)
        return (
            <>
                <Modal
                    isOpen={isOpenModalFromParent}
                    className={'booking-modal-container'}
                    size='lg'
                    centered>
                    <div className='booking-modal-content'>
                        <div className='booking-modal-header'>
                            <span className='left'>Thông tin đặt lịch khám bệnh</span>
                            <span
                                onClick={closeBookingModalFromParent}
                                className='right'><i className='fas fa-times'></i></span>
                        </div>

                        <div className='booking-modal-body'>
                            <div className='doctor-info'>
                                <ProfileDoctor
                                    doctorIdFromParent={doctorId}
                                    dataScheduleTimeModalFromParent={dataScheduleTimeModalFromParent}
                                    isShowInfoFromParent={isShowInfo}
                                />

                            </div>

                            <div className='row'>
                                <div className='col-6 form-group'>
                                    <label>Họ tên</label>
                                    <input className='form-control' placeholder='Nhập họ và tên' />
                                </div>

                                <div className='col-6 form-group'>
                                    <label>Số điện thoại</label>
                                    <input className='form-control' placeholder='Nhập SĐT' />
                                </div>

                                <div className='col-6 form-group'>
                                    <label>Địa chỉ</label>
                                    <input className='form-control' placeholder='Nhập địa chỉ' />
                                </div>

                                <div className='col-6 form-group'>
                                    <label>Email</label>
                                    <input className='form-control' placeholder='Nhập email' />
                                </div>

                                <div className='col-12 form-group'>
                                    <label>Lý do khám bệnh</label>
                                    <textarea className='form-control' placeholder='Bạn cảm thấy như thế nào?' />
                                </div>

                                <div className='col-4 form-group'>
                                    <label>Đặt cho ai</label>
                                    <input className='form-control' />
                                </div>

                                <div className='col-4 form-group'>
                                    <label>Giới tính</label>
                                    <input className='form-control' />
                                </div>
                            </div>
                        </div>

                        <div className='booking-modal-footer'>
                            <button className='btn-confirm'>Xác nhận</button>
                            <button onClick={closeBookingModalFromParent} className='btn-cancel'>Hủy</button>
                        </div>
                    </div>
                </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
