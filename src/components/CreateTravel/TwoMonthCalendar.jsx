import React, { useState } from "react";
import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  addMonths,
  format,
  isSameDay,
  isAfter,
  isBefore,
} from "date-fns";
import "./TwoMonthCalendar.css"; 


const TwoMonthCalendar = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const today = new Date();
  const monthsToShow = [0, 1];

  const handleClick = (date) => {
    if (!startDate) {
      setStartDate(date);
      setEndDate(null);
    } else if (!endDate) {
      if (isBefore(date, startDate)) {
        setStartDate(null);
        setEndDate(null);
      } else {
        setEndDate(date);
      }
    } else {
      setStartDate(date);
      setEndDate(null);
    }
  };

  const getDateClass = (date) => {
    if (startDate && isSameDay(date, startDate)) return "start";
    if (endDate && isSameDay(date, endDate)) return "end";
    if (startDate && endDate && isAfter(date, startDate) && isBefore(date, endDate))
      return "in-range";
    return "";
  };

  return (
    <div className="calendar-wrapper">
      <h3 className="calendar-title"> PROJECT NAME</h3>
      <div className="calendar-months">
        {monthsToShow.map((offset) => {
          const monthStart = startOfMonth(addMonths(today, offset));
          const monthEnd = endOfMonth(addMonths(today, offset));
          const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

          return (
            <div className="calendar-month" key={offset}>
              <h4 className="month-label">{format(monthStart, "MMMM yyyy")}</h4>
              <div className="calendar-grid">
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
                  <div className="calendar-day-name" key={d}>{d}</div>
                ))}
                {Array(monthStart.getDay() === 0 ? 6 : monthStart.getDay() - 1)
                  .fill("")
                  .map((_, i) => (
                    <div className="calendar-empty" key={`pad-${i}`} />
                  ))}
                {days.map((date) => (
                  <div
                    key={date}
                    onClick={() => handleClick(date)}
                    className={`calendar-date ${getDateClass(date)}`}
                  >
                    {format(date, "d")}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="calendar-footer">
        <p> start: {startDate ? format(startDate, "MM/dd") : "--"}</p>
        <p> end: {endDate ? format(endDate, "MM/dd") : "--"}</p>
      </div>
    </div>
  );
};

export default TwoMonthCalendar;
