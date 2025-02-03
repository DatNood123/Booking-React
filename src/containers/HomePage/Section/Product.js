import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from 'react-slick';
import { FormattedMessage } from 'react-intl';
import { serviceGetTopProduct } from '../../../services/userService';
import './Product.scss';
import { withRouter } from 'react-router';
import NumberFormat from 'react-number-format';
import { LANGUAGES } from '../../../utils/constant';

class Product extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listProduct: [],
        }
    }

    async componentDidMount() {
        let res = await serviceGetTopProduct();
        if (res && res.errCode === 0) {
            this.setState({
                listProduct: res.data
            })
        }
    }

    handleOnClickProduct = (item) => {
        if (this.props.history) {
            this.props.history.push(`/detail-product/${item.id}`)
        }
    }

    handleOnClickViewAllProduct = () => {
        if (this.props.history) {
            this.props.history.push(`/all-product`)
        }
    }

    render() {
        let { listProduct } = this.state;
        let { language } = this.props;

        return (
            <>
                <div className='section-share section-product wide'>
                    <div className='section-container'>
                        <div className='section-header'>
                            <span className='title-section'><FormattedMessage id="facility.good-facility" /></span>
                            <button
                                onClick={() => this.handleOnClickViewAllProduct()}
                                className='btn-section'><FormattedMessage id="facility.more" />
                            </button>
                        </div>
                        <div className='section-body'>
                            {listProduct && listProduct.length > 0 &&
                                listProduct.map((item, index) => {
                                    return (
                                        <div
                                            className='section-custome'
                                            key={index}>

                                            <div className='product-container'>
                                                <div className='border-product'>
                                                    <div
                                                        className='bg-image'
                                                        style={{ backgroundImage: `url(${item.image})` }}
                                                    />
                                                </div>

                                                <div className='info-product'>
                                                    <div className='name-product'>{item.name}</div>

                                                    <div className='type-product'>
                                                        Phân loại: {language === LANGUAGES.VI ? item.productTypeData.valueVie : item.productTypeData.valueEn}
                                                    </div>

                                                    <div className='price-product'>Giá đề xuất: <br></br>
                                                        <NumberFormat
                                                            className='currency'
                                                            value={item.price}
                                                            displayType={'text'}
                                                            thousandSeparator={true}
                                                            suffix='đ'
                                                        />
                                                    </div>

                                                    <button
                                                        onClick={() => this.handleOnClickProduct(item)}
                                                        className='btn-detail'>
                                                        Xem chi tiết
                                                    </button>
                                                </div>
                                            </div>

                                        </div>
                                    )
                                })
                            }


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
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Product));
