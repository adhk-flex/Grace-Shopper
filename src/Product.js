import React, {Component} from 'react';

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

    onSave = (ev) =>{
        ev.preventDefault()
    }


    render(){
        // fake data
        const {productName, quantity, imageUrl, description, price} = 
            {
                productName: 'Ergonomic Plastic Hat', 
                quantity: '39', 
                imageUrl: 'http://lorempixel.com/640/480/abstract', 
                description: 'Et quidem est voluptas quis eum. Sed ut est quidem distinctio error maiores dolores amet enim. Rerum aut reprehenderit autem vel velit inventore sit. Earum ut ipsam cum quia.',
                price: 112.00,
            }
        const quantityRange = []
        const {selectedQuantity} = this.state
        for(let i =0; i<=quantity; i++){
            quantityRange.push(i)
        }
        const {onChange, onSave} = this
        return(
            <div>
                <h1>
                    Showing individual Product
                </h1>
                <span>{`Name: ${productName}, Price: ${price}`}</span>
                <br/>
                <img className = 'product-image' src={imageUrl}/>
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

export default Product;