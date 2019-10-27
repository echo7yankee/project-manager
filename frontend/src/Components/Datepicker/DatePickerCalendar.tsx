import React from 'react'

//react daypicker
import DayPickerInput from 'react-day-picker/DayPickerInput';

import 'react-day-picker/lib/style.css';

export function DatePickerCalendar({ selectedDay, handleDayChange }) {

    return (
        <DayPickerInput placeholder='Schedule' dayPickerProps={{
            selectedDays: selectedDay,
            disabledDays: {
                before: new Date()
            },
        }} onDayChange={handleDayChange} />
    )
}

