import React from 'react';

export const Error = ({textError}) => {
    return (
        <div className='set-center'>
            <p className='error'>{textError}</p>
        </div>
    )
};