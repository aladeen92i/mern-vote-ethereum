import React from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../store/actions';


const NavBar = ({ auth, logout }) => <div> 
    <ul>
        <li><Link to='/register'>Register</Link></li>
        <li><Link to='/login'>Login</Link></li>
        <li><a onClick={logout}>Logout</a></li>
    </ul>
    {auth.isAuthenticated && (<p>Logged is as {auth.user.username} </p>)}
</div>;

export default connect(store => ({ auth: store.auth}), {logout})(NavBar);