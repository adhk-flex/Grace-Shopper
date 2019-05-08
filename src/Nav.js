import React from 'react';
import {Link} from 'react-router-dom'

const Nav = (isLogin, {location: {pathname}}) => {
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
            label: 'Logout', to: '/logout'
        },
        {
            label: 'Order', to: '/order'
        }
    ];
    const guestLinks = [
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
            label: 'Login', to: '/login'
        },
        {
            label: 'SignUp', to: '/signup'
        }
    ];

    return (
        <ul className='nav nav-pills' style={{marginBottom: '20px'}}>
            {
                (isLogin? userLinks:guestLinks).map(link=>
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