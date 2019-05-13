import React, {Component} from 'react';
import {connect} from 'react-redux';
import Errors from './Errors';

import { loginNewUser, login, logout } from './store/user';
import { addLineItem } from './store/lineitem';

class Login extends Component{

    constructor(props){
        super(props)
        this.state = {
            email: '',
            password: '',
            errors: [],
            firstName: '',
            lastName: '',
            imgUrl: '',
            role: 'shopper'
        }
    }

    onChange = (ev) => {
        this.setState({[ev.target.name]: ev.target.value})
    }

    onSave = (ev) => {
        ev.preventDefault()
        if(this.props.match.path === '/signup'){
            this.props.signup(this.state)
            .then(() => {
                const items = JSON.parse(localStorage.getItem('lineItems'))
                items.forEach(item => {
                    item.cartId = this.props.cart.id;
                    item.quantity = Number(item.quantity);
                    this.props.addLineItem(item)
                })
            })
            .then(() => localStorage.clear())
            .then(()=>this.props.history.push('/home'))
            .catch((e)=>{this.setState({errors: e.response.data.errors})})
        }else if(this.props.match.path === '/login'){
            this.props.login(this.state)
            .then(() => {
                const items = JSON.parse(localStorage.getItem('lineItems'))
                items.forEach(item => {
                    item.cartId = this.props.cart.id;
                    item.quantity = Number(item.quantity);
                    this.props.addLineItem(item)
                })
            })
            .then(() => localStorage.clear())
            .then(()=>this.props.history.push('/home'))
            .catch((e)=>{this.setState({errors: ['Incorrect Email/password']})})
        }   
    }

    render(){
        const {email, password, error, firstName, lastName, imgUrl, role} =  this.state;
        const {onChange, onSave} = this;
        const toSignup = this.props.match.path === '/signup'
        return(
            <div>
                {this.props.match.path === '/logout' ? 
                (<div>
                    <span>Do you want to Logout?</span>
                    <button onClick={()=>{
                        this.props.logout()
                        .then(()=>this.props.history.push('/home'))
                    }}>Yes</button>
                    <button onClick={()=>this.props.history.push('/home')}>No</button>
                </div>
                ) 
                : (
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
                                        <option defaultValue = 'shopper' >shopper</option>
                                        <option value = 'admin'>admin</option>
                                    </select>
                                    </div>
                                )  
                                : null
                            }
                            <button type='submit'>submit</button>
                        </form>
                    </div>
                )}
                <Errors errors={this.state.errors} />
            </div>
        )     
    }
}

const mapStateToProps = state => {
    return {
        cart: state.cart,
        lineItems: state.lineItems
    }
}

const mapDispatchToProps = dispatch => {
    return {
        signup: user => dispatch(loginNewUser(user)),
        login: user => dispatch(login(user)),
        logout: () => dispatch(logout()),
        addLineItem: item => dispatch(addLineItem(item))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);