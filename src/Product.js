import React, {Component} from 'react';
import { connect } from 'react-redux';
import { addLineItem, fetchLineItems, updateLineItem } from './store/lineitem';

class Product extends Component{
    constructor(props){
        super(props)
        this.state = {
            selectedQuantity: '',
        }
    }

    componentDidUpdate (prevProps) {
        if(prevProps.cart.id !== this.props.cart.id){
            this.props.fetchLineItems(this.props.cart.id)
        }     
    }

    onChange = (ev) =>{
        this.setState({[ev.target.name]: ev.target.value}, ()=>console.log(this.state))
    }

    onSave = (ev) => {
        ev.preventDefault()
        const productId = this.props.match.params.id;
        let product = this.props.products.find(p => p.id === productId);
        const cartId = this.props.cart.id
        const {lineItems} = this.props
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
        if (lineItems.find(i => i.productId === item.productId)) {
            const i = lineItems.find(i => i.productId === item.productId)
            i.quantity = Number(i.quantity) + Number(this.state.selectedQuantity)
            this.props.updateLineItem(i.id, i, cartId)
        } else {
            this.props.addLineItem(item, cartId)
        }
    }

    render(){
        const id = this.props.match.params.id;
        const {lineItems} = this.props
        const totalItems = lineItems.reduce((acc, item) => {
            acc += item.quantity
            return acc
        }, 0)
        let product = this.props.products.find(p => p.id === id);
        const lineItemExist = () => {
            if (lineItems.find(i => i.productId === product.id)) {
                return lineItems.find(i => i.productId === product.id)
            } else {
                return false
            }
        }
        if (!product) {
            return null
        }
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
                <div>
                    {lineItemExist() !== false ? `There ${lineItemExist().quantity >1 ? 'are' : 'is'} ${lineItemExist().quantity} ${lineItemExist().name} in cart`: null}
                </div>
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
                <span className = 'shopping-item-quantity'>{totalItems}</span>
            </div>
        )    
    }
}

const mapStateToProps = (state) => {
    return {
        products: state.products? state.products: false,
        lineItems: state.lineItems? state.lineItems:false,
        cart: state.cart? state.cart:false
    }
};

const mapDispatchToProps = dispatch => {
    return {
        fetchLineItems: cartId => dispatch(fetchLineItems(cartId)),
        addLineItem: (product, cartId) => dispatch(addLineItem(product, cartId)),
        updateLineItem: (id, formData, cartId) => dispatch(updateLineItem(id, formData, cartId))
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(Product);