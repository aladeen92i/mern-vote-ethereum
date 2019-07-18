import React from 'react';
import Polls from '../components/Polls';
import ErrorMessage from '../components/ErrorMessage';


const Homepage = props => <div>
    <Polls {...props} />
    {<ErrorMessage />}
</div>

export default Homepage;