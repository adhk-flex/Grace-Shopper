import React, { Component } from 'react';

class CategoryNav extends Component {
    constructor(){
        super();
        this.state = { choice: "" };
    }
    handleChange = evt => {
        this.setState({ choice: evt.target.value }, () => console.log(this.state.choice));
    }
    render () {
        return (
            <select
                className="form-control"
                name="Category"
                value={this.state.choice}
                onChange={this.handleChange}
            >
                <option value="">--none--</option>
                <option value="">--Cat1--</option>
            </select>
        );
    }
}

export default CategoryNav;
