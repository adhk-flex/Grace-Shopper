import React, {Component} from 'react';
import { connect } from 'react-redux';
import { addLineItem } from './store/lineitem';

class Product extends Component{
    constructor(props){
        super(props)
        this.state = {
            selectedQuantity: '',
        }
    }
    
    onChange = (ev) =>{
        this.setState({[ev.target.name]: ev.target.value}, ()=>console.log(this.state))
    }

    onSave = (ev) => {
        ev.preventDefault()
        const id = this.props.match.params.id;
        let product = this.props.products.find(p => p.id === id);
        const cartId = this.props.cart.id
        const item = {
            quantity: this.state.selectedQuantity,
            price: product.price,
            name: product.name,
            productNumber: product.productNumber,
            stockStatus: product.stockStatus,
            imgUrl: product.imgUrl,
            cartId: cartId,
            productId: product.id
        }
        this.props.addLineItem(item, cartId)
            .then(() => console.log(this.props.lineItems))
    }

    render(){
        const id = this.props.match.params.id;
        let product = this.props.products.find(p => p.id === id);
        const {name, quantity, imgUrl, description, price} = product;
        const quantityRange = []
        const {selectedQuantity} = this.state
        for (let i = 0; i <= quantity; i++){
            quantityRange.push(i)
        }
        const {onChange, onSave} = this
        return (
            <div>
                <h1>
                    Showing individual Product
                </h1>
                <span>{`Name: ${name}, Price: ${price}`}</span>
                <br/>
                <img className = 'product-image' src={imgUrl}/>
                <br/>
                <p>{description}</p>
                <form onSubmit={onSave}>
                    <select className = 'form-control' name='selectedQuantity' value={selectedQuantity} onChange={onChange}>
                        {
                            quantityRange.map(number=>{
                                return(
                                    <option key={number} value={number}>{number}</option>
                                )
                            })
                        }
                    </select>
                    <button className='btn btn-primary' type='submit'>Add to Cart</button>
                </form>
                <img className = 'shopping-cart' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKorRm0enmL_tFIgvKcNcOjb_3YkWnny-CIK0BW5F9DoGocc7DkA' onClick={()=>{this.props.history.push('/cart')}}/>
                <span className = 'shopping-item-quantity'>{this.state.selectedQuantity}</span>
            </div>
        )    
    }
}

const mapStateToProps = (state) => {
    return {
        products: state.products,
        lineItems: state.lineItems,
        cart: state.cart
    }
};

const mapDispatchToProps = dispatch => {
    return {
        addLineItem: (product, cartId) => dispatch(addLineItem(product, cartId)),
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(Product);