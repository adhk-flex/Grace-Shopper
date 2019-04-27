import React, {Component} from 'react';

class Product extends Component{
    constructor(){
        super()
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
        const {productName, quantity} = {productName: 'Ergonomic Plastic Hat', quantity: '39'}
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
                <span>{productName}</span>
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
            </div>
        )
        
    }
}

export default Product;