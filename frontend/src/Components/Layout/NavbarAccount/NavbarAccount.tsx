import React from 'react';

//components
import { NavTitle } from './NavTitle';

//style
import { IoIosClose } from 'react-icons/io';

export const NavbarAccount = (): JSX.Element => {

    const title: string = 'Settings';
    const closeTtitle: JSX.Element = <div>
        <span>Close</span>
        <span><IoIosClose /></span>
    </div>

    return (
        <div>
            <NavTitle title={title} />
            <NavTitle title={closeTtitle} />
        </div>
    )
}
