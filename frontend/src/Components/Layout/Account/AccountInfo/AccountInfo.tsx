import React, { useState } from 'react';

//style
import style from '../account.module.css';
import { AccountForm } from '../AccountForm/AccountForm';
import { AccountInfoItem } from './AccountInfoItem';

interface IAccountInfo {
    subtitle: string;
    subtitleUserInfo: string;
    userDetails;
    userDetailsName: string;
    handleChange;
    userId: string;
}

export const AccountInfo = (props: IAccountInfo): JSX.Element => {

    const [isEditable, setIsEditable] = useState<boolean>(false);

    function setEditable(): void {
        setIsEditable(prevState => !prevState);
    };

    return (
        <div className={`${style.accountInfo} dflex`}>
            <div className={style.accountSubtitle}>
                {props.subtitle}
            </div>
            {isEditable ?
                <AccountForm
                    inputValue={props.subtitleUserInfo}
                    setEditable={setEditable}
                    userDetails={props.userDetails}
                    subtitle={props.subtitle}
                    userDetailsName={props.userDetailsName}
                    handleChange={props.handleChange}
                    userId={props.userId}
                /> :
                <AccountInfoItem
                    subtitle={props.subtitle}
                    subtitleUserInfo={props.subtitleUserInfo}
                    setEditable={setEditable} />
            }
        </div>
    );
}
