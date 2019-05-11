import React from 'react';
import {connect} from 'react-redux';

const Home = (props) => {
    return(
        <h1>Welcome to Grace Shopper {props.user.firstName}</h1>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}


export default connect(mapStateToProps)(Home);