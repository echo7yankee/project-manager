import React, { useState } from 'react';

//style
import style from '../account.module.css';
import { AccountForm } from '../AccountForm/AccountForm';
import { AccountInfoItem } from './AccountInfoItem';

interface IAccountInfo {
    subtitle: string;
    subtitleUserInfo: string;
    userDetails;
    oldUserDetails;
    userDetailsName: string;
    handleChange;
    userId: string;
    setUserDetails;
    isPassword: boolean;
}

export const AccountInfo = (props: IAccountInfo): JSX.Element => {

    const [isEditable, setIsEditable] = useState<boolean>(false);

    function setEditableTrue(): void {
        setIsEditable(true);
    }

    function setEditableFalse(): void {
        setIsEditable(false);
    }

    function setEditableFalseCancel(): void {
        setIsEditable(false);
        props.setUserDetails(props.oldUserDetails);
    }

    return (
        <div className={`${style.accountInfo} dflex`}>
            <div className={style.accountSubtitle}>
                {props.subtitle}
            </div>
            {isEditable ?
                <AccountForm
                    inputValue={props.subtitleUserInfo}
                    setEditableFalse={setEditableFalse}
                    setEditableFalseCancel={setEditableFalseCancel}
                    userDetails={props.userDetails}
                    subtitle={props.subtitle}
                    userDetailsName={props.userDetailsName}
                    handleChange={props.handleChange}
                    userId={props.userId}
                    isPassword={props.isPassword}
                /> :
                <AccountInfoItem
                    subtitle={props.subtitle}
                    subtitleUserInfo={props.subtitleUserInfo}
                    setEditable={setEditableTrue}
                />
            }
        </div>
    );
}
