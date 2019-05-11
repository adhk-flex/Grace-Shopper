import React, {Component} from 'react';
import {connect} from 'react-redux';

import {postReview} from './store/review';

class Review extends Component{

    constructor(){
        super()
        this.state = {
            prevReviews: [],
            content: '',
            stars: 0,
        }
    }

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    onSave = (e) => {
        e.preventDefault()
        const {productId, user} = this.props
        this.props.postReview(this.state, productId, user.id)
    }

    render(){
        const {onChange, onSave} = this
        const {PrevReviews, content, stars} = this.state
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
            </div>
        )
    }
} 

const mapStateToProps = (state) => {
    return {
        user: state.user,
        product: state.product,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        postReview: (review, productId, userId) => dispatch(postReview(review, productId, userId))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Review);