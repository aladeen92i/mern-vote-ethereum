import React from 'react';
import Polls from '../components/Polls';
import ErrorMessage from '../components/ErrorMessage';
import { Redirect } from 'react-router-dom';



const Homepage = ({ isAuthenticated }) => {
    if (!isAuthenticated) return <Redirect to="/login" />;
    return(    
        <div>
            <Polls  />
            <ErrorMessage />
        </div>
    )
}

export default Homepage;