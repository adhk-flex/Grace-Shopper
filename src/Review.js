import React, {Component} from 'react';
import {connect} from 'react-redux';

import {postReview,getReviewsByProduct} from './store/review';
import Errors from './Errors';

class Review extends Component{

    constructor(){
        super()
        this.state = {
            reviews: [],
            content: '',
            stars: 0,
            errors: []
        }
    }

    componentDidMount(){
        this.props.getReviewsByProduct(this.props.productId)
            .then(({reviews})=>{this.setState({reviews})})
            .catch(e=>this.setState({errors: e.response.data.errors}))
    }

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    onSave = (e) => {
        e.preventDefault()
        const {productId, user} = this.props
        this.props.postReview(this.state, productId, user.id)
        .then(()=>this.props.getReviewsByProduct(this.props.productId))
        .then(reviews=>this.setState(reviews)) // should use componentDidUpdate?
        .catch(e=>this.setState({errors: e.response.data.errors}))
    }

    render(){
        const {onChange, onSave} = this
        const {reviews ,content, stars} = this.state
        const starsArr = [1,2,3,4,5]
        return (
            <div>
                <h4>Please add Review Here:</h4>
                <form onSubmit={onSave}>
                    <label htmlFor='reviewContent'>Review Comments</label>
                    <br/>
                    <textarea name='content' value={content} onChange={onChange} rows="4" cols="50"/>
                    <br/>
                    <label htmlFor='stars'>Give Stars</label>
                    <select name='stars' value={stars} onChange={onChange}>
                        {
                            starsArr.map(stars=>{
                                return (
                                    <option key={stars} value={stars}>{stars}</option>
                                )
                            })
                        }
                    </select>
                    <br/>
                    <button type='submit'>Save Comments</button>
                </form>
                <h4>Here are the Reviews for this Product:</h4>
                {
                    reviews.length ? 
                    <table className='table'>
                    <thead>
                        <tr>
                            <th>Comments</th>
                            <th>Stars</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            reviews.map(review => {
                                return (
                                    <tr key={review.id}>
                                        <td>{review.content}</td>
                                        <td>{review.stars}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                    </table>
                    : null
                }
                <Errors errors={this.state.errors}/>
            </div>
        )
    }
} 

const mapStateToProps = (state) => {
    console.log('state:', state)
    return {
        user: state.user,
        product: state.product,
        reviews: state.reviews
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        postReview: (review, productId, userId) => dispatch(postReview(review, productId, userId)),
        getReviewsByProduct: (productId) => dispatch(getReviewsByProduct(productId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Review);