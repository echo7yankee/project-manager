import React from 'react'

//style
import style from './toast.module.css'

export const Toast = ({ showToast, text }) => {
    return (
        <div className={showToast ? style.toastContainerShow : style.toastContainer}>
            <span>{text}</span>
        </div>
    )
}
