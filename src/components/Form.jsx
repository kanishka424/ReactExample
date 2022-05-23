import React, { Component } from 'react';
import CalculatorService from '../services/CalculatorService';

class Form extends Component {
    constructor(props) {
        super(props)
        this.state = {
            initialProductDetail: [],
            noOfCartons: 0,
            noOfSingleUnits: 0,
            unitsPerCarton: 0,
            productId: 0,
            totalPrice: 0,
            productName: ""

        }

    }

    handleCartonNumberChange = (event) => {
        this.setState({
            noOfCartons: parseInt(event.target.value)
        })
    }

    handleSingleUnitNumberChange = (event) => {
        this.setState({
            noOfSingleUnits: parseInt(event.target.value)
        })
    }

    handleProductChange = event => {
        const selecteProduct = this.state.initialProductDetail.find((data) => (data.id === parseInt(event.target.value))
        )

        this.setState({
            productId: selecteProduct.id,
            unitsPerCarton: selecteProduct.unitsPerCarton,
            productName: selecteProduct.productName
        }
        )

    }

    handleSubmit = event => {
        let numOfSingleUnits = this.state.noOfSingleUnits;
        let numOfCartons = this.state.noOfCartons;
        let unitsPerCarton = this.state.unitsPerCarton;

        if (numOfSingleUnits > unitsPerCarton) {
            alert("units are converting to Cartons");
            let numberOfCartonsFromSingleUnits = Math.trunc(numOfSingleUnits / unitsPerCarton);
            let remaingSingleUnits = numOfSingleUnits % unitsPerCarton;
            let numOfUpdatedCartons = numOfCartons + numberOfCartonsFromSingleUnits;

            this.setState({
                noOfSingleUnits: remaingSingleUnits,
                noOfCartons: numOfUpdatedCartons
            }, () => this.getTotal())
        } else {
            this.getTotal();
        }
        event.preventDefault();
    }

    getTotal = () => CalculatorService.getTotal({ productId: this.state.productId, numOfCartons: this.state.noOfCartons, numOfUnits: this.state.noOfSingleUnits }).then((res) => {
        this.setState(
            {
                totalPrice: res.data
            }
        );

    }
    )

    resetValues = () => {
        this.setState({
            productId: 0,
            numOfCartons: 0,
            numOfSingleUnits: 0,
            totalPrice: 0
        })
    }

    componentDidMount() {
        CalculatorService.getProducts().then((res) => {
            this.setState(
                {
                    initialProductDetail: res.data
                }
            )
        })
    }

    render() {
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="card col-md-6 offset-md-3 offset-md-3">

                            <div className="card-body">
                                <form onSubmit={this.handleSubmit}>
                                    <div className="form-group" >
                                        <label>Product</label>
                                        <select value={this.state.productId} onChange={this.handleProductChange} className="form-control" >
                                            <option value="0" disabled>Select product</option>
                                            {this.state.initialProductDetail.map((product) => <option value={product.id}>{product.productName}</option>)}
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>Number of Cartons</label>
                                        <input disabled={this.state.productId === 0} className="form-control"
                                            type="number"
                                            value={this.state.noOfCartons}
                                            min={0}
                                            onChange={this.handleCartonNumberChange}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Number of Single Units</label>
                                        <input
                                            type="number"
                                            value={this.state.noOfSingleUnits}
                                            min={0}
                                            onChange={this.handleSingleUnitNumberChange}
                                            disabled={this.state.productId === 0}
                                            className="form-control"
                                        />
                                        <label> {this.state.productId !== 0 ? " *Carton capacity for product " + this.state.productName + " is " + this.state.unitsPerCarton : ""}
                                        </label>
                                        <label>*If number of single units exceeds the capacity of a carton those units will automatically be converted to
                                            a carton
                                        </label>

                                    </div>

                                    <div className="form-group">
                                        <label>Total Price for selected</label>
                                        <input
                                            type="number"
                                            value={this.state.totalPrice}
                                            disabled
                                            className="form-control"
                                        />
                                    </div>
                                    <button className="btn btn-primary" type="submit" disabled={this.state.productId === 0 || (this.state.noOfCartons === 0 && this.state.noOfSingleUnits === 0)}>Calcuate</button>
                                    <button className="btn btn-secondary" disabled={this.state.productId === 0 || (this.state.noOfCartons === 0 && this.state.noOfSingleUnits === 0)} onClick={this.resetValues} style={{ marginLeft: "10px" }}>Reset</button>
                                    <div className="form-group">
                                        <label>*Purchase 3 cartons or more, you will receive a 10% discount off the carton price
                                        </label>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}

export default Form;

//can we make handleSingleUnitNumberChange and handleCartonNumberChange as one