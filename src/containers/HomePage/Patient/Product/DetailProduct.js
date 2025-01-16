import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../HomeHeader';
import './DetailProduct.scss';
import { serviceGetDetailProductById } from '../../../../services/userService';
import NumberFormat from 'react-number-format';

class DetailProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataProduct: [],
        }
    }

    async componentDidMount() {
        let { language } = this.props;
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let res = await serviceGetDetailProductById(this.props.match.params.id);
            if (res && res.errCode === 0) {
                this.setState({
                    dataProduct: res.data
                })
            }
        }

    }

    async componentDidUpdate(prevProps, prevState) {
        if (this.props.language !== prevProps.language) {

        }
    }

    render() {
        let { dataProduct } = this.state
        console.log(this.state.dataProduct)
        let { language } = this.props
        return (
            <>
                <div className='detail-product-container'>
                    <HomeHeader />
                    <div className='detail-product-content'>
                        <div className='content-left'>
                            <div className='title-product'>Thông tin sản phẩm</div>
                            <div className='boder-image'>
                                <div className='image-product' style={{ backgroundImage: `url(${dataProduct.image})` }}></div>
                            </div>

                        </div>

                        <div className='content-right'>
                            <div className='product-description'>
                                <div className='name-production'>
                                    {dataProduct.name}
                                </div>

                                <div className='description-content'>
                                    < div dangerouslySetInnerHTML={{ __html: dataProduct.descriptionHTML }}></div>
                                </div>
                            </div>

                            <div className='product-price'>
                                Tầm giá: <NumberFormat
                                    className='currency'
                                    value={dataProduct.price}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    suffix='đ'
                                /> (có thể thương lượng)

                            </div>


                            <div className='btn-give-contact'>
                                <button>Liên hệ với chúng tôi</button>
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
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailProduct);
