import React, {Component} from 'react';
import { connect } from 'react-redux';
import UserForm from './UserForm';
import {getAllUsers} from './store/user';

class ManageUser extends Component {
  constructor () {
    super ()
    this.state = {
      users: []
    }
  }

  componentDidMount(){
    this.props.getAllUsers()
      .then(() => this.setState({users: this.props.users}))
  }

  render () {
    const {users} = this.state
    return (
      <div>
        <h1>Manage All Users</h1>
        <div>
          <table className='table'>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Password</th>
              <th>Image URL</th>
              <th>role</th>
              <th>Save</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {
              users.map(user => {
                return (
                  <UserForm user={user} key={user.id}/>
                )
              })
            }
          </tbody>
          </table>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    users: state.allUsers
  }
};

const mapDispatchToProps = dispatch => {
  return {
    getAllUsers: () => dispatch(getAllUsers())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageUser);
