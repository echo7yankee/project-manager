import React, { useEffect, useRef, useState } from 'react';

//style
import style from './accountForm.module.css';

interface IAccountForm {
    inputValue: string;
    setEditable: () => void;
}

export const AccountForm = (props: IAccountForm): JSX.Element => {

    const [term, setTerm] = useState(props.inputValue);
    const inputRef: any = useRef(null);

    useEffect(() => {
        inputRef.current.focus();
    }, [])

    function handleChange(e) {
        setTerm(e.target.value)
    };

    return (
        <div>
            <form className={style.accountForm}>
                <input type='text' ref={inputRef} value={term} onChange={handleChange} />
                <div>
                    <button type='submit'>Save</button>
                    <button type='button' onClick={props.setEditable}>Cancel</button>
                </div>
            </form>
        </div>
    )
}
