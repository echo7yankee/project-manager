import React from 'react';

//style
import { IoMdCalendar } from 'react-icons/io';
import style from './today.module.css';

export const Today = (): JSX.Element => {
  return (
    <div>
      <h1 className={style.todayHeader}>
        <span><IoMdCalendar /></span>
        <span>Today</span>
      </h1>
    </div>
  );
}
