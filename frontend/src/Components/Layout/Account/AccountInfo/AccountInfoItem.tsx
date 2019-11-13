import React from 'react';

//style
import style from '../account.module.css';

interface IAccountInfoItem {
    subtitle: string
}

export const AccountInfoItem = (props: IAccountInfoItem): JSX.Element => {
    return (
        <div className='dflex mt-2'>
            <div className={style.accountSubtitle}>
                {props.subtitle}
            </div>
            <div>
                stuff
            </div>
        </div>
    )
}
