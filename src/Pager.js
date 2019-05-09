import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchProducts } from './store/product';

class Pager extends Component {
  constructor (props) {
    super(props)
    this.state = {
      count: 0,
      pageNum: 1
    }
  }

  componentDidMount () {
    this.props.fetchProducts()
      .then(() => this.setState({count: this.props.products.length}))
  }

  onClick = (value) => {
    this.setState({pageNum: value})
    this.props.history.push(`/productList/${value}`)
  }

  render(){
    const {pageNum, count} = this.state;
    const lastPage = Math.ceil(count/10);
    const {onClick} = this;
    const pgButtons = [
      {text: 'First', value: 1, disabled: pageNum === 1},
      {text: 'Prev', value: pageNum - 1, disabled: pageNum === 1 || lastPage === 1 },
      {text: pageNum, value: pageNum, disabled: true},
      {text: 'Next', value: pageNum + 1, disabled: pageNum === lastPage || lastPage === 1},
      {text: 'Last', value: lastPage, disabled: pageNum === lastPage || lastPage ===1}
    ]
    return (
      <div>
        <div>You are viewing page {pageNum} of {lastPage}</div>
        <div className='btn-group'>
          {pgButtons.map(button => (
            <button
              className="btn btn-info"
              key={button.text}
              disabled={button.disabled}
              onClick={() => onClick(button.value)}>
              {button.text}
            </button>
          ))}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    products: state.products,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    fetchProducts: () => dispatch(fetchProducts())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Pager);
