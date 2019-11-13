import React, { useEffect, useRef, useState } from 'react';

interface IAccountForm {
    inputValue: string
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

    console.log(term)

    return (
        <div>
            <form>
                <input type='text' ref={inputRef} value={term} onChange={handleChange} />
            </form>
        </div>
    )
}
