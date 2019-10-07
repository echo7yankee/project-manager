import React, { useEffect } from 'react';

//Components
import { Projects } from '../Sidebar/Projects/Projects';

//jwt
import jwt from 'jsonwebtoken';

//react router
import { Redirect } from 'react-router-dom';

//Components
import { Navbar } from '../Navbar/Navbar'

//redux
import { useDispatch, useSelector } from 'react-redux';
import { User } from '../../../Redux/actions/user';

export const Dashboard = (): JSX.Element => {

    //redux
    const dispatch = useDispatch();
    const authenticated = useSelector(state => state.auth.authenticated);
    const user = new User();

    //token
    let decodedToken;
    let userId;
    const token = localStorage.FBIdToken;

    if (token) {
        decodedToken = jwt.decode(token);
        userId = decodedToken.params && decodedToken.params.id;
    }

    useEffect(() => {
        dispatch(user.getUser(userId))
    }, [user, dispatch, userId])

    if (!authenticated) { return <Redirect to='/register' /> }

    return (
        <>
            <div>
                <Navbar />
                <Projects userId={userId} />
            </div>
        </>
    );
};
