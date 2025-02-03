import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import checklist from '../../../assets/images/checklist.png';
import leaf from '../../../assets/images/leaf.png';
import koi from '../../../assets/images/koi.png';
import rock from '../../../assets/images/rock.png';
import plant from '../../../assets/images/plant.png';
import apricot from '../../../assets/images/apricot.png';
import { serviceGetAllSpecialty } from '../../../services/userService';
import './Specialty.scss';
import { withRouter } from 'react-router';

class Specialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSpecialty: []
        };

        this.serviceTitle = React.createRef();
        this.bgImageRefs = [];
        this.observer = null;
    }

    async componentDidMount() {
        let res = await serviceGetAllSpecialty();
        if (res && res.errCode === 0) {
            this.setState({
                dataSpecialty: res.data ? res.data : []
            })
        }

        this.observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        // Xử lý hiệu ứng cho tiêu đề
                        if (entry.target === this.serviceTitle.current) {
                            const element = this.serviceTitle.current;
                            element.classList.remove('tracking');
                            void element.offsetWidth; // Trigger reflow
                            element.classList.add('tracking');
                        }

                        // Xử lý cho các phần tử bg-image
                        if (this.bgImageRefs.some((ref) => ref.current === entry.target)) {
                            const element = entry.target;
                            element.classList.remove('fade-in'); // Reset animation
                            void element.offsetWidth; // Trigger reflow
                            element.classList.add('fade-in'); // Thêm lại animation
                        }
                    }
                });
            },
            { threshold: 0.5 } // Tỷ lệ hiển thị cần thiết để kích hoạt
        );

        // Gắn Observer vào tiêu đề
        if (this.serviceTitle.current) {
            this.observer.observe(this.serviceTitle.current);
        }

        // Gắn Observer vào từng phần tử bg-image
        this.bgImageRefs.forEach((ref) => {
            if (ref.current) {
                this.observer.observe(ref.current);
            }
        });
    }

    componentWillUnmount() {
        if (this.observer) {
            if (this.serviceTitle.current) {
                this.observer.unobserve(this.serviceTitle.current);
            }
            this.bgImageRefs.forEach((ref) => {
                if (ref.current) {
                    this.observer.unobserve(ref.current);
                }
            });
        }
    }

    handleViewDetailSpecialty = (id) => {
        if (this.props.history) {
            this.props.history.push(`/detail-specialty/${id}`)
        }

    }

    render() {
        let settings = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
        }

        let { dataSpecialty } = this.state;
        return (
            <>
                {/* Grid */} {/* Wide */}
                <div className='section-share section-specialty wide'>
                    {/* Row 1 */}
                    <div className='section-container'>

                        <div className='section-header'>
                            <div ref={this.serviceTitle} className='title-section'><FormattedMessage id="specialty.popular-spceialty" /></div>
                        </div>

                        <div className='specialty-body-main1'>
                            <div className='section-custome'>
                                <div className='specialty-info'>
                                    <div className='specialty-image'>
                                        <div
                                            style={{ backgroundImage: dataSpecialty[2] ? `url(${dataSpecialty[2].image})` : 'none' }}
                                            className='bg-image '>
                                        </div>
                                    </div>

                                    <div className='specialty-name-info-container'>
                                        <div className='specialty-title'>{dataSpecialty[2] ? dataSpecialty[2].name : "Loading..."}</div>
                                        <div className='specialty-feature'>
                                            <span><img src={checklist} />Khảo sát không gian</span>
                                            <span><img src={checklist} />Trồng cây và bố trí tiểu cảnh</span>
                                            <span><img src={checklist} />Lắp đặt hệ thống tưới tự động</span>
                                            <span><img src={checklist} />Bảo trì sân vườn sau khi hoàn thiện</span>
                                        </div>
                                        <div className='btn-view-more'>
                                            <button className='btn-more'
                                                onClick={() => this.handleViewDetailSpecialty(dataSpecialty ? dataSpecialty[2].id : '')}
                                            >Tìm hiểu thêm</button>
                                        </div>

                                    </div>
                                </div>
                            </div>

                            <div className='statistic'>
                                <div className='border-light'></div>
                                <div className='statistic-title'>
                                    Bảng Thống Kê
                                </div>

                                <div className="chart-container">
                                    <div className="outer-circle"></div>
                                    <div className="linear-overlay">
                                        <div></div>
                                    </div>
                                    <div className="inner-circle"></div>
                                    <div className="center-text">
                                        85%
                                        <span>Quay lại</span>
                                    </div>
                                </div>

                                <div className='statistic-item-container'>
                                    <div className='statistic-item'>
                                        Số cây đã bán: 1000+
                                    </div>

                                    <div className='statistic-item'>
                                        Tỷ lệ hoàn thành: 100%
                                    </div>

                                    <div className='statistic-item'>
                                        Công trình đã bàn giao: 100+
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='specialty-body-main2'>
                            <div className='section-custome'>
                                <div className='specialty-info'>
                                    <div className='specialty-image'>
                                        <div
                                            style={{ backgroundImage: dataSpecialty[4] ? `url(${dataSpecialty[4].image})` : 'none' }}
                                            className='bg-image '>
                                        </div>
                                    </div>

                                    <div className='specialty-name-info-container'>
                                        <div className='specialty-title'>{dataSpecialty[4] ? dataSpecialty[4].name : "Loading..."}</div>
                                        <div className='specialty-feature'>
                                            <span><img src={leaf} />Giá cả hợp lý, phải chăng</span>
                                            <span><img src={leaf} />Tư vấn lựa chọn cây phù hợp</span>
                                            <span><img src={leaf} />Cung cấp đa dạng nhiều loại cây</span>
                                            <span><img src={leaf} />Bao sống trong vòng 3 tháng</span>
                                        </div>
                                        <div className='btn-view-more'>
                                            <button className='btn-more'
                                                onClick={() => this.handleViewDetailSpecialty(dataSpecialty ? dataSpecialty[4].id : '')}
                                            >Tìm hiểu thêm</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='specialty-content'>
                                Công ty Hoa Kiểng Chau SaDec chuyên thi công
                                cảnh quan sân vườn, cung cấp dịch vụ làm đẹp toàn diện cho không gian xanh.

                            </div>
                        </div>

                        <div className='specialty-body-sub-sevrice'>
                            <div className='sub-service-container'>
                                <div className='service-content'>
                                    <div className='image-container'>
                                        <div
                                            style={{ backgroundImage: dataSpecialty[0] ? `url(${dataSpecialty[0].image})` : 'none' }}
                                            className='bg-image '>
                                        </div>
                                    </div>

                                    <div className='info-sub-serive'>
                                        <div className='name-service'>
                                            {dataSpecialty[0] ? dataSpecialty[0].name : "Loading..."}
                                        </div>

                                        <div className='specialty-feature'>
                                            <span><img src={koi} />Thành phẩm đẹp mắt</span>
                                            <span><img src={koi} />Tiến độ thi công nhanh chóng</span>
                                            <span><img src={koi} />Tích hợp hệ thống lọc hiện đại</span>
                                            <span><img src={koi} />Kinh nghiệm, chuyên môn cao</span>
                                        </div>
                                        <div className='btn-view-more'>
                                            <button className='btn-more'
                                                onClick={() => this.handleViewDetailSpecialty(dataSpecialty ? dataSpecialty[0].id : '')}
                                            >Tìm hiểu thêm</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='sub-service-container'>
                                <div className='service-content'>
                                    <div className='image-container'>
                                        <div
                                            style={{ backgroundImage: dataSpecialty[1] ? `url(${dataSpecialty[1].image})` : 'none' }}
                                            className='bg-image '>
                                        </div>
                                    </div>

                                    <div className='info-sub-serive'>
                                        <div className='name-service'>
                                            {dataSpecialty[1] ? dataSpecialty[1].name : "Loading..."}
                                        </div>

                                        <div className='specialty-feature'>
                                            <span><img src={rock} />Thiết kế cá nhân hóa</span>
                                            <span><img src={rock} />Sử dụng vật liệu cao cấp</span>
                                            <span><img src={rock} />Hoàn thiện đúng tiến độ</span>
                                            <span><img src={rock} />Đảm bảo tính phong thủy</span>
                                        </div>
                                        <div className='btn-view-more'>
                                            <button className='btn-more'
                                                onClick={() => this.handleViewDetailSpecialty(dataSpecialty ? dataSpecialty[1].id : '')}
                                            >Tìm hiểu thêm</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='sub-service-container'>
                                <div className='service-content'>
                                    <div className='image-container'>
                                        <div
                                            style={{ backgroundImage: dataSpecialty[3] ? `url(${dataSpecialty[3].image})` : 'none' }}
                                            className='bg-image '>
                                        </div>
                                    </div>

                                    <div className='info-sub-serive'>
                                        <div className='name-service'>
                                            {dataSpecialty[3] ? dataSpecialty[3].name : "Loading..."}
                                        </div>
                                        <div className='specialty-feature'>
                                            <span><img src={plant} />Kế hoạch thi công bài bản </span>
                                            <span><img src={plant} />Đảm bảo tiến độ và chất lượng</span>
                                            <span><img src={plant} />Sử dụng cây xanh phù hợp</span>
                                            <span><img src={plant} />Thi công chuyên nghiệp</span>
                                        </div>
                                        <div className='btn-view-more'>
                                            <button className='btn-more'
                                                onClick={() => this.handleViewDetailSpecialty(dataSpecialty ? dataSpecialty[3].id : '')}
                                            >Tìm hiểu thêm</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='sub-service-container'>
                                <div className='service-content'>
                                    <div className='image-container'>
                                        <div
                                            style={{ backgroundImage: dataSpecialty[5] ? `url(${dataSpecialty[5].image})` : 'none' }}
                                            className='bg-image '>
                                        </div>
                                    </div>

                                    <div className='info-sub-serive'>
                                        <div className='name-service'>
                                            {dataSpecialty[5] ? dataSpecialty[5].name : "Loading..."}
                                        </div>
                                        <div className='specialty-feature'>
                                            <span><img src={apricot} />Giao cây tận nhà</span>
                                            <span><img src={apricot} />Đảm bảo cây chất lượng</span>
                                            <span><img src={apricot} />Chăm cây trong suốt Tết</span>
                                            <span><img src={apricot} />Nhiều kiểu dáng và kích thước</span>
                                        </div>
                                        <div className='btn-view-more'>
                                            <button className='btn-more'
                                                onClick={() => this.handleViewDetailSpecialty(dataSpecialty ? dataSpecialty[3].id : '')}
                                            >Tìm hiểu thêm</button>
                                        </div>
                                    </div>
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
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Specialty));
