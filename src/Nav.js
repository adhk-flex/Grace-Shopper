import React from 'react';
import {Link} from 'react-router-dom'

const Nav = (isLogin, {location: {pathname}}) => {
    let finalLinks=[];
    const adminLinks = [
        {
            label: 'Home', to: '/home'
        },
        {
            label: 'Manage Products', to: '/manageProduct'
        },
        {
            label: 'Manage Orders', to: '/manageOrder'
        },
        {
            label: 'Logout', to: '/logout'
        },
    ]
    
    const userLinks = [
        {
            label: 'Home', to: '/home'
        },
        {
            label: 'ProductList', to: '/productList'
        },
        {
            label: 'Checkout', to: '/checkout'
        },
        {
            label: 'Order', to: '/order'
        },
        {
            label: 'Logout', to: '/logout'
        }
    ];
    const guestLinks = [
        {
            label: 'Home', to: '/home'
        },
        {
            label: 'Login', to: '/login'
        },
        {
            label: 'SignUp', to: '/signup'
        },
        {
            label: 'ProductList', to: '/productList'
        },
        {
            label: 'Checkout', to: '/checkout'
        }
    ];

    if(isLogin && isLogin.role ==='admin'){
        finalLinks = adminLinks;
    }
    else if(isLogin.id){
        finalLinks = userLinks;
    }
    else{
        finalLinks = guestLinks;
    }

    return (
        <ul className='nav nav-pills' style={{marginBottom: '20px'}}>
            {
                finalLinks.map(link=>
                    (
                        <li key={link.to} className={`nav-item${ pathname === link.to ? ' active': ''}`}>
                            <Link to={link.to} className={`nav-link${ pathname === link.to ? ' active': ''}`}>{link.label}</Link>
                        </li>
                    )
                )
            }
        </ul>
    )
}

export default Nav;