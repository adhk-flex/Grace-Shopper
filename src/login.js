import React, {Component} from 'react';
import {connect} from 'react-redux';

import { loginNewUser } from './store';

class Login extends Component{

    constructor(){
        super()
        this.state = {
            email: '',
            password: '',
            error: ''
        }
    }

    onChange = (ev) => {
        this.setState({[ev.target.name]: ev.target.value}, ()=>console.log(this.state))
    }

    onSave = (ev) => {
        ev.preventDefault()
        this.props.login(this.state)
            .catch(({response})=>{this.setState({error: response.data})})
    }

    render(){
        console.log('loginNewUser: ', loginNewUser)
        const {email, password, error} =  this.state;
        const {onChange, onSave} = this;
        return(
            <div>
                <h2>This is the login page</h2>
                <form onSubmit={onSave}>
                    <label htmlFor = 'email'>Email</label>
                    <input name = 'email' value = {email} onChange={onChange}/>
                    <label htmlFor = 'password'>Password</label>
                    <input name = 'password' value = {password} onChange={onChange}/>
                    <button type='submit'>submit</button>
                </form>
            </div>
        )     
    }
}

const mapDispatchToProps = dispatch => {
    return {
        login: user => dispatch(loginNewUser(user))
    }
}

export default connect(null, mapDispatchToProps)(Login);