import React, {Component} from 'react';
import {connect} from 'react-redux';

import { loginNewUser, login } from './store';

class Login extends Component{

    constructor(props){
        super(props)
        this.state = {
            email: '',
            password: '',
            error: '',
            firstName: '',
            lastName: '',
            imgUrl: '',
            role: ''
        }
    }

    onChange = (ev) => {
        this.setState({[ev.target.name]: ev.target.value})
    }

    onSave = (ev) => {
        ev.preventDefault()
        this.props.match.path === '/signup' ? 
        this.props.signup(this.state)
        : this.props.login(this.state)
            .then(()=>this.props.history.push('/home'))
            .catch(({response})=>{this.setState({error: response.data})})
    }

    render(){
        const {email, password, error, firstName, lastName, imgUrl, role} =  this.state;
        const {onChange, onSave} = this;
        const toSignup = this.props.match.path === '/signup'
        return(
            <div>
                <h2>{`This is the ${toSignup ? 'signup' : 'login'} page`}</h2>
                <form onSubmit={onSave}>
                    <label htmlFor = 'email'>Email</label>
                    <input name = 'email' value = {email} onChange={onChange}/>
                    <label htmlFor = 'password'>Password</label>
                    <input name = 'password' value = {password} onChange={onChange}/>
                    {
                        toSignup ? 
                        (
                            <div>
                            <label htmlFor = 'firstName'>FirstName</label>
                            <input name = 'firstName' value = {firstName} onChange = {onChange}/>
                            <label htmlFor = 'lastName'>LastName</label>
                            <input name = 'lastName' value = {lastName} onChange = {onChange}/>
                            <label htmlFor = 'imgUrl'>ImageUrl</label>
                            <input name = 'imgUrl' value = {imgUrl} onChange = {onChange}/>
                            <label htmlFor = 'role'>Role</label>
                            <select name = 'role' value = {role} onChange = {onChange}>
                                <option value = 'shopper'>shopper</option>
                                <option value = 'admin'>admin</option>
                            </select>
                            </div>
                        )  
                        : null
                    }
                    <button type='submit'>submit</button>
                </form>
            </div>
        )     
    }
}

const mapDispatchToProps = dispatch => {
    return {
        signup: user => dispatch(loginNewUser(user)),
        login: user => dispatch(login(user))
    }
}

export default connect(null, mapDispatchToProps)(Login);