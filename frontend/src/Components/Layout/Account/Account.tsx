import React, { useEffect } from 'react';

//jwt
import jwt from 'jsonwebtoken';

//redux
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../../Redux/actions/user';

//style
import style from './account.module.css';

//components
import { AccountPersonalInformation } from './AccountPersonalInformation/AccountPersonalInformation';

export const Account = (): JSX.Element => {

    //redux
    const dispatch = useDispatch();
    const userDetails = useSelector(state => state.user.user);

    //token
    let decodedToken;
    let userId;
    const token: string = localStorage.FBIdToken;

    if (token) {
        decodedToken = jwt.decode(token);
        userId = decodedToken.params && decodedToken.params.id;
    }

    useEffect(() => {
        dispatch(getUser(userId));
    }, [dispatch, userId]);

    return (
        <div>
            <div>
                <h1 className={style.settingsMainPageHeader}>
                    Personal Information
                </h1>
            </div>
            {userDetails.email && <AccountPersonalInformation userDetails={userDetails} userId={userId} />}
        </div>
    )
}
