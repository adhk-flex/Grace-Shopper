import React, {Component} from 'react';
import { connect } from 'react-redux';
import { updateUser, deleteUser } from './store/user';


class UserForm extends Component{
  constructor(props) {
    super(props)
    this.state = {
      id: this.props.user.id,
      firstName: this.props.user.firstName,
      lastName: this.props.user.lastName,
      email: this.props.user.email,
      password: this.props.user.password,
      imgUrl: this.props.user.imgUrl,
      role: this.props.user.role,
      errors: []
    }
  }

  changeHandler = e => {
    this.setState({[e.target.name]: e.target.value})
  }

  saveHandler = e => {
    e.preventDefault();
    let user = {
      id: this.state.id,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      password: this.state.password,
      imgUrl: this.state.imgUrl,
      role: this.state.role
    }
    console.log('insaveHandler', user)
    this.props.updateUser(user)
      .then(()=>this.setState({...this.state, errors: []}))
      .catch(e=>this.setState({...this.state, errors: e.response.data.errors}));
  }

  deleteHandler = e => {
    e.preventDefault();
    this.props.deleteUser(this.state.id)
    .then(() => console.log('deleting'))
    .then(()=>this.setState({...this.state, errors: []}))
    .catch(e=>this.setState({...this.state, errors: e.response.data.errors}));
  }

  render(){
    let user = this.state;
    const {changeHandler, saveHandler, deleteHandler} = this;
    return (
      <tr key={user.id}>
        <td><input type='text' onChange={changeHandler} name='firstName' value={user.firstName} /></td>
        <td><input type='text' onChange={changeHandler} name='lastName' value={user.lastName} /></td>
        <td><input type='text' onChange={changeHandler} name='email' value={user.email} /></td>
        <td><input type='text' onChange={changeHandler} name='password' value={user.password} /></td>
        <td><input type='text' onChange={changeHandler} name='imgUrl' value={user.imgUrl} /></td>
        <td>
          <select onChange={changeHandler} name='role' value={user.role === 'admin'? 'admin': 'shopper'}>
            <option>admin</option>
            <option>shopper</option>
          </select>
        </td>
        <td> <button className='btn btn-primary' type='submit' onClick={saveHandler}/></td>
        <td> <button className='btn btn-danger' onClick={deleteHandler}/></td>
      </tr>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateUser: user => dispatch(updateUser(user)),
    deleteUser: userId => dispatch(deleteUser(userId))
  }
}

export default connect(null, mapDispatchToProps)(UserForm);

