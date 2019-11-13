import React from 'react';

//style
import style from '../account.module.css';

interface IAccountInfoItem {
    subtitle: string
    subtitleUserInfo: string
}

export const AccountInfoItem = (props: IAccountInfoItem): JSX.Element => {
    return (
        <div className='dflex mt-2'>
            <div className={style.accountSubtitle}>
                {props.subtitle}
            </div>
            <div>
                <span className={style.accountInfoItemSpan}>{props.subtitleUserInfo}</span>
                <button className={style.accountInfoItemButton} >Edit</button>
            </div>
        </div>
    )
}
