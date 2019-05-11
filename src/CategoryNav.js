import React, { Component } from 'react';
import { connect } from 'react-redux';

class CategoryNav extends Component {
    constructor(){
        super();
        this.state = { choice: "" };
    }
    componentDidUpdate(prevProps){
        if(this.props.match.params.catId !== prevProps.match.params.catId){
            this.setState({ choice: this.props.match.params.catId || "" });
        }
    }
    handleChange = evt => {
        this.setState({ choice: evt.target.value }, () => {
            if(this.state.choice){
                this.props.history.push(`/productList/category/${this.state.choice}`)
            } else {
                this.props.history.push('/productList')
            }
        });
    }
    render () {
        return (
            <select
                className="form-control"
                name="Category"
                value={this.state.choice}
                onChange={this.handleChange}
            >
                <option value="">All Products</option>
                {
                    this.props.categories.map(category => (
                        <option 
                            value={category.id} 
                            key={category.id}
                            >
                                {category.name}
                        </option>
                    ))
                }
            </select>
        );
    }
}

const mapStateToProps = state => ({
    categories: state.categories
});

export default connect(mapStateToProps)(CategoryNav);
