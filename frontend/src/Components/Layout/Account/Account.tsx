import React, { useEffect } from 'react';

//jwt
import jwt from 'jsonwebtoken';

//redux
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../../Redux/actions/user';

//style
import style from './account.module.css';

//components
import { AccountInfoItem } from './AccountInfo/AccountInfoItem';

export const Account = (): JSX.Element => {

    //redux
    const dispatch = useDispatch();
    const userDetails = useSelector(state => state.user.user);

    //token
    let decodedToken;
    let userId;
    const token = localStorage.FBIdToken;

    if (token) {
        decodedToken = jwt.decode(token);
        userId = decodedToken.params && decodedToken.params.id;
    }

    console.log(userDetails)

    useEffect(() => {
        dispatch(getUser(userId));
    }, [dispatch, userId]);

    const name: string = 'Name';
    const email: string = 'email';

    return (
        <div>
            <div>
                <h1 className={style.settingsMainPageHeader}>
                    Personal Information
                </h1>
            </div>
            <div>
                <AccountInfoItem subtitle={name} subtitleUserInfo={`${userDetails.firstName} ${userDetails.lastName}`} />
                <AccountInfoItem subtitle={email} subtitleUserInfo={userDetails.email} />
            </div>
        </div>
    )
}
