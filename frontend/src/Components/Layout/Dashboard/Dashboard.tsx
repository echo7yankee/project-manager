import React from 'react'

//react router
import { Redirect } from 'react-router-dom';

//Components
import { Navbar } from '../Navbar/Navbar'

//redux
import { useSelector } from 'react-redux';



export const Dashboard = (): JSX.Element => {

    const authenticated = useSelector(state => state.auth.authenticated);

    if (!authenticated) { return <Redirect to='/register' /> }

    return (
        <>
            <div>
                <Navbar />
            </div>
        </>
    );
};
