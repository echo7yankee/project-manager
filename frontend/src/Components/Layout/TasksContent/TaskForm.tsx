import React, { SetStateAction, useEffect, useRef } from 'react';

//close component by clicking outside
import { useOutsideClose } from '../../CloseDropdown/CloseDropdown';

//style
import { DatePickerCalendar } from '../../Datepicker/DatePickerCalendar';
import style from './tasks.module.css';

interface ITaskForm {
  buttonDo: string;
  buttonClose: string;
  selectedDay: Date;
  inputValue: string;
  onClickClose: () => void;
  handleDayChange;
  onChange: (e: { target: { value: SetStateAction<string>; }; }) => void;
  request: (e: { preventDefault: () => void; }) => void;
  inputRef;
}

export const TaskForm = (props: ITaskForm): JSX.Element => {

  useEffect(() => {
    props.inputRef.current.focus();
  }, [props.inputRef])

  //close taskForm
  const wrapperRef = useRef(null);
  useOutsideClose(wrapperRef, props.onClickClose);

  return (
    <form className={style.taskForm} onSubmit={props.request} ref={wrapperRef} >
      <div className={style.taskFormInputGroup}>
        <input
          type='text'
          placeholder="Add a task ... e.g Read tonight's news"
          value={props.inputValue}
          onChange={props.onChange}
          ref={props.inputRef} />
        <DatePickerCalendar
          selectedDay={props.selectedDay}
          handleDayChange={props.handleDayChange}
        />
      </div>
      <div className={style.taskFormButtonContainer}>
        <button disabled={props.inputValue === ''}
          className={props.inputValue === '' ? 'disabled-button' : ''}>{props.buttonDo}</button>
        <button onClick={props.onClickClose}>{props.buttonClose}</button>
      </div>
    </form>
  );
};
