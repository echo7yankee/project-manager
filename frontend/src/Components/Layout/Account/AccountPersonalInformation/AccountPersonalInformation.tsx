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
    const email: string = 'email';

    return (
        <div>
            <AccountInfo
                subtitle={firstName}
                subtitleUserInfo={userDetails.firstName}
                userDetails={userDetails}
                userDetailsName='firstName'
                handleChange={handleChange}
                userId={props.userId}
            />
            <AccountInfo
                subtitle={lastName}
                subtitleUserInfo={userDetails.lastName}
                userDetails={userDetails}
                userDetailsName='lastName'
                handleChange={handleChange}
                userId={props.userId} />
            <AccountInfo
                subtitle={email}
                subtitleUserInfo={userDetails.email}
                userDetails={userDetails}
                userDetailsName='email'
                handleChange={handleChange}
                userId={props.userId} />
        </div>
    )
};
