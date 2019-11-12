import React from 'react';

interface INavTitle {
    title: string | JSX.Element
}

export const NavTitle = (props: INavTitle): JSX.Element => {
    return (
        <div>
            <h1>{props.title}</h1>
        </div>
    )
}
