import React from 'react';
import {Link} from 'react-router-dom'

const Nav = ({location: {pathname}}) => {
    const links = [
        {
            label: 'Home', to: '/home'
        },
        {
            label: 'ProductList', to: '/productList'
        },
        {
            label: 'Checkout', to: '/checkout'
        }
    ];

    return (
        <ul className='nav nav-pills' style={{marginBottom: '20px'}}>
            {
                links.map(link=>
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