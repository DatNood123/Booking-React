import React, { Component } from 'react';
import { connect } from "react-redux";
import { LANGUAGES } from '../../../../utils';
import { FormattedMessage } from 'react-intl';
import './AllProduct.scss';
import { withRouter } from 'react-router';
import NumberFormat from 'react-number-format';
import HomeHeader from '../../HomeHeader.js';
import { serviceGetAllCode, serviceGetProductByType } from '../../../../services/userService';

class AllProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listAllProduct: [],
            listOptions: [],
            selectedOption: '',
        }
    }

    async componentDidMount() {
        let { language } = this.props;
        let res = await serviceGetProductByType('ALL');
        if (res && res.errCode === 0) {
            this.setState({
                listAllProduct: res.data
            })
        }

        let res2 = await serviceGetAllCode('TREE');

        let listOption = res2.data
        if (listOption && listOption.length > 0) {
            listOption.unshift({
                keyMap: 'ALL',
                type: 'TREE',
                valueEn: 'All',
                valueVie: 'Tất cả các loại cây'
            })

            this.setState({
                listOptions: listOption
            })
        }
    }

    async componentDidUpdate(prevProps, prevState) {
        if (this.props.language !== prevProps.language) {

        }

        if (this.state.selectedOption !== prevState.selectedOption) {
            let res = await serviceGetProductByType(this.state.selectedOption);

            if (res && res.errCode === 0) {
                if (res.data !== this.state.listAllProduct) {
                    this.setState({
                        listAllProduct: res.data
                    });
                }
            }

            if (res && res.errCode === 99) {
                this.setState({
                    listAllProduct: []
                });
            }
        }
    }

    handleOnChangeSelect = async (event) => {
        this.setState({
            selectedOption: event.target.value
        })
    }

    handleOnClickProduct = (item) => {
        if (this.props.history) {
            this.props.history.push(`/detail-product/${item.id}`)
        }
    }

    render() {
        let { language } = this.props;
        let { listAllProduct, listOptions, selectedOption } = this.state;

        return (
            <>
                <div className='all-product-container'>
                    <HomeHeader />

                    <div className='all-product-border'>
                        <div className='search-section'>
                            <div className='title-search'>
                                <FormattedMessage id='all-product.search' />
                            </div>
                            <div>
                                <select onChange={(event) => this.handleOnChangeSelect(event)}>
                                    {listOptions && listOptions.length > 0 &&
                                        listOptions.map((item, index) => {
                                            return (
                                                <option key={index} value={item.keyMap}>
                                                    {language === LANGUAGES.VI ? item.valueVie : item.valueEn}
                                                </option>
                                            )
                                        })
                                    }
                                </select>
                            </div>

                        </div>

                        <div className='product-container wide'>
                            {listAllProduct && listAllProduct.length > 0 ?
                                listAllProduct.map((item, index) => {
                                    return (
                                        <div
                                            className='section-custome'
                                            key={index}>

                                            <div className='product-boder'>
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

                                :

                                <div className='text-sorry'><FormattedMessage id='all-product.sorry-out-tree' /></div>
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
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AllProduct));
