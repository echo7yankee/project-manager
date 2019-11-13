import React from 'react';

//style
import style from '../account.module.css';

interface IAccountInfoItem {
    subtitle: string;
    subtitleUserInfo: string;
    setEditable: () => void;
}

export const AccountInfoItem = (props: IAccountInfoItem): JSX.Element => {
    return (
        <div>
            <span className={style.accountInfoItemSpan}>{props.subtitleUserInfo}</span>
            <button className={style.accountInfoItemButton} onClick={props.setEditable}>Edit</button>
        </div>
    );
}
