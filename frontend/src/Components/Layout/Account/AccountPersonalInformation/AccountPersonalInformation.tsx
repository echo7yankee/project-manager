import React, { useState } from 'react';

//components
import { AccountInfo } from '../AccountInfo/AccountInfo';

interface IAccountPersonalInformation {
    userDetails;
    userId: string;
}

export const AccountPersonalInformation = (props: IAccountPersonalInformation): JSX.Element => {

    const [userDetails, setUserdetails] = useState(props.userDetails);

    function handleChange(e): void {
        setUserdetails({
            ...userDetails,
            [e.target.name]: e.target.value,
        })
    };

    const firstName: string = 'First Name';
    const lastName: string = 'Last Name';
    const email: string = 'Email';
    const password: string = 'Password';

    return (
        <div>
            <AccountInfo
                subtitle={firstName}
                subtitleUserInfo={userDetails.firstName}
                userDetails={userDetails}
                oldUserDetails={props.userDetails}
                userDetailsName='firstName'
                handleChange={handleChange}
                userId={props.userId}
                setUserDetails={setUserdetails}
                isPassword={false}
            />
            <AccountInfo
                subtitle={lastName}
                subtitleUserInfo={userDetails.lastName}
                userDetails={userDetails}
                oldUserDetails={props.userDetails}
                userDetailsName='lastName'
                handleChange={handleChange}
                userId={props.userId}
                setUserDetails={setUserdetails}
                isPassword={false}
            />
            <AccountInfo
                subtitle={email}
                subtitleUserInfo={userDetails.email}
                userDetails={userDetails}
                oldUserDetails={props.userDetails}
                userDetailsName='email'
                handleChange={handleChange}
                userId={props.userId}
                setUserDetails={setUserdetails}
                isPassword={false}
            />
            <AccountInfo
                subtitle={password}
                subtitleUserInfo='*******'
                userDetails={userDetails}
                oldUserDetails={props.userDetails}
                userDetailsName='password'
                handleChange={handleChange}
                userId={props.userId}
                setUserDetails={setUserdetails}
                isPassword={true}
            />
        </div>
    )
};
