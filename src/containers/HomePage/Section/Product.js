import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from 'react-slick';
import { FormattedMessage } from 'react-intl';
import { serviceGetProductByType } from '../../../services/userService';
import './Product.scss';
import { withRouter } from 'react-router';

class Product extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listProduct: [],
        }
    }

    async componentDidMount() {
        let res = await serviceGetProductByType('ALL');
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
        return (
            <>
                <div className='section-share section-product'>
                    <div className='section-container'>
                        <div className='section-header'>
                            <span className='title-section'><FormattedMessage id="facility.good-facility" /></span>
                            <button
                                onClick={() => this.handleOnClickViewAllProduct()}
                                className='btn-section'><FormattedMessage id="facility.more" /></button>
                        </div>
                        <div className='section-body'>
                            <Slider {...this.props.settings}>
                                {listProduct && listProduct.length > 0 &&
                                    listProduct.map((item, index) => {
                                        return (
                                            <div
                                                onClick={() => this.handleOnClickProduct(item)}
                                                className='section-custome'
                                                key={index}>

                                                <div className='product-container'>
                                                    <div className='border-product'>
                                                        <div className='bg-image' style={{ backgroundImage: `url(${item.image})` }} />
                                                    </div>

                                                    <div className='name-product'>{item.name}</div>
                                                </div>

                                            </div>
                                        )
                                    })
                                }

                            </Slider>
                        </div>

                    </div>
                </div>
            </>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Product));
