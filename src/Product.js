import React, {Component} from 'react';

class Product extends Component{
    constructor(){
        super()
        this.state = {
            name: ''
        }
    }

    onChange = (ev) =>{
        this.setState({[ev.target.name]: ev.target.value})
    }

    render(){
        // fake data
        const {name, value} = {name: 'sports', value: '50'}
        const {onChange} = this
        return(
            <div>
                <h1>
                    Showing individual Product
                </h1>
                <form>
                    <input name={name} value={value} onChange={onChange} />
                </form>
            </div>
        )
        
    }
}

export default Product;