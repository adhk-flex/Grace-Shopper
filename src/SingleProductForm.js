import React, { Component } from 'react';
import { connect } from 'react-redux';
import Errors from './Errors';
import { updateProduct, delProduct } from './store/product';
import { getProductCats } from './store/category'; 

class SingleProductForm extends Component {
    constructor(){
        super();
        this.state = {
            name: '',
            price: '',
            quantity: '',
            description: '',
            imgUrl: '',
            productNumber:  '',
            categories: [],
            id: null,
            errors: []
        };
    }

    load = () => {
        if(this.props.products){
            const product = this.props.products.find(_product => _product.id === this.props.match.params.productId);
            if(product){
                this.setState({
                    name: product.name,
                    price: product.price,
                    quantity: product.quantity,
                    description: product.description,
                    imgUrl: product.imgUrl,
                    productNumber: product.productNumber,
                    id: product.id,
                    errors:[]
                });
                getProductCats(product.id)
                        .then(categories => this.setState({ categories }))
                        .catch(e => e.response.data.errors);
            }
        }
    };

    componentDidMount() {
        this.load();
    }
    
    componentDidUpdate(prevProps) {
        if(JSON.stringify(prevProps.products) !== JSON.stringify(this.props.products)){
            this.load();
        }
    }

    render() {
        return (
            <div>
                { this.state.productNumber ? <div>{this.state.productNumber}</div> : null }
                { this.state.categories ? 
                        <ul>
                            {
                                this.state.categories.map(category => <li key={category.id}>{category.name}</li>)
                            }
                        </ul> : null
                }
            </div>
        );
    }
}

const mapStateToProps = state => ({
    products: state.products
});

export default connect(mapStateToProps)(SingleProductForm);
