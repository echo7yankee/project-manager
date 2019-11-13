import React from 'react';

//style
import style from './accountSidebar.module.css';

//react router dom
import { Link } from 'react-router-dom';

export const AccountSidebar = (): JSX.Element => {
    return (
        <div className={style.accountSidebar}>
            <ul>
                <li>
                    <span>icon acc</span>
                    <Link to='account'>Account</Link>
                </li>
            </ul>
        </div>
    )
};
