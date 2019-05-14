import React, { Component } from 'react';
import { addCategory } from './store/category';
import { connect} from 'react-redux';

class CategoryForm extends Component {
    constructor() {
        super();
        this.state = { name: "" };
    }
    
    handleChange = evt => {
        this.setState({ name: evt.target.value });
    }

    handleSubmit = evt => {
        evt.preventDefault();
        this.props.addCategory(this.state)
            .then(() => this.props.history.push('/manageProduct'));
    }

    render(){
        return (
            <form onSubmit={this.handleSubmit}>
                <label htmlFor="name">Category Name</label>
                <input type="text" value={this.state.name} onChange={this.handleChange} />
                <button type="submit" className="btn btn-primary">Create Category</button>
            </form>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    addCategory: category => dispatch(addCategory(category))
});

export default connect(null, mapDispatchToProps)(CategoryForm);
