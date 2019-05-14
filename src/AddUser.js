import React, {Component} from 'react';
import { connect } from 'react-redux';
import { addUser } from './store/user';

class AddUser extends Component{
  constructor(){
    super()
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      imgUrl: '',
      role: 'admin',
    }
  }

  changeHandler = e => {
    this.setState({[e.target.name]:e.target.value})
  }

  saveHandler = e => {
    e.preventDefault();
    const user = this.state;
    this.props.addUser(user)
      .then(() => this.props.history.push('/manageUser'))
  }

  render () {
    const user = this.state;
    const {changeHandler, saveHandler} = this;
    return (
      <form onSubmit={saveHandler}>
        <label htmlFor='firstName'>FirstName</label>
        <input name='firstName' onChange={changeHandler} name='firstName' value={user.firstName}/>
        <label htmlFor='lastName'>LastName</label>
        <input name='lastName' onChange={changeHandler} name='lastName' value={user.lastName}/>
        <label htmlFor='email'>Email</label>
        <input name='email' onChange={changeHandler} name='email' value={user.email}/>
        <label htmlFor='password'>Password</label>
        <input name='password' onChange={changeHandler} name='password' value={user.password}/>
        <label htmlFor='imgUrl'>Image URL</label>
        <input name='imgUrl' onChange={changeHandler} name='imgUrl' value={user.imgUrl}/>
        <select onChange={changeHandler} name='role'>
          <option>admin</option>
          <option>shopper</option>
        </select>
        <button type='submit'>Create!</button>
      </form>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addUser: user => dispatch(addUser(user))
  }
}

export default connect(null, mapDispatchToProps)(AddUser);
