import React, { Component } from "react";

class Search extends Component{
    constructor(){
        super();
        this.state = { term: "" };
    }
    loadInput = () => {
        const { srchVal } = this.props.match.params;
        if(srchVal){
            this.setState({ term: srchVal });
        } else {
            this.setState({ term: "" });
        }
    };
    componentDidMount(){
        this.loadInput();
    }
    componentDidUpdate(prevProps){
        if(prevProps.match.params.srchVal !== this.props.match.params.srchVal){
            this.loadInput();
        }
    }
    handleChange = evt => {
        this.setState({ term: evt.target.value });
    };
    handleSubmit = evt => {
        const catId = this.props.match.params.catId;
        evt.preventDefault();
        this.props.history.push(catId ? `/productList/category/${catId}/search/${this.state.term}` : `/productList/search/${this.state.term}`)
    };
    handleClear = () => {
        const catId = this.props.match.params.catId;
        this.setState({ term: "" }, () => 
            this.props.history.push(catId ? `/productList/category/${catId}` : '/productList')
        )
    }
    render(){
        return (
            <form className="m-2" onSubmit={this.handleSubmit}>
                <input 
                    type="text" 
                    className="form-control" 
                    value={this.state.term} 
                    placeholder="Search" 
                    onChange={this.handleChange} 
                />
                <div className="input-group-append" style={{ marginLeft: "2px" }}>
                    <button 
                        type="submit" 
                        className="btn btn-primary" 
                        disabled={!this.state.term.length}>
                        Search
                    </button>
                    <button 
                        type="button" 
                        className="btn btn-info" 
                        onClick={this.handleClear}
                        disabled={!this.state.term.length}>
                        Clear
                    </button>
                </div>
            </form>
        );
    }
}

export default Search;
