import React, { Component } from 'react';
import CalculatorService from '../services/CalculatorService';


class ProductPriceTable extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tableData: [],
            loading: true,
            noOfRows: 0,
            initialProductDetail: []
        }

    }
    componentDidMount() {


        let productsUnitRangeDetails = {
            "productIds": [],
            "offSet": 1,
            "limit": 50
        }
        CalculatorService.getProducts().then((res) => {
            this.setState(
                {
                    initialProductDetail: res.data
                }
                , () => {
                    this.state.initialProductDetail.map((product) => {
                        productsUnitRangeDetails.productIds.push(product.id)
                    })
                    // getPriceForUnits(productsUnitRangeDetails);
                    CalculatorService.getPriceForUnits(productsUnitRangeDetails).then((res) => {
                        this.setState({
                            tableData: res.data,
                            loading: false,
                            mapKeys: Object.keys(res.data[0].priceMap)
                        })
                    })
                }
            )
        })

    }

    render() {
        if (this.state.loading === true) {
            return (<div class="spinner-border text-primary" role="status">
                <span class="sr-only">Loading...</span>
            </div>
            )
        } else {
            return (

                <div class="container">
                    <h2>Product Prices from 1-50 units</h2>
                    <table class="table table-striped">
                        <tbody>
                            <tr>
                                <th>Number Of Units</th>
                                {this.state.tableData.map((unitProduct) => <th>{unitProduct.product.productName}</th>)}

                            </tr>
                            {this.state.mapKeys.map((keyValue) => <tr><td>{keyValue}</td>
                                {this.state.tableData.map((unitProduct) => <th> {unitProduct.priceMap[keyValue]}</th>)}</tr>)}
                        </tbody>
                    </table>

                </div>


            );
        }
    }
}

export default ProductPriceTable;