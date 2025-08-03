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

import { ReactComponent as ProjectNextIcon } from "../../assets/Project_next_button.svg";
import { ReactComponent as BackIcon } from '../../assets/prev_arrow.svg';


// 테스트용 프로필 이미지 import
import profile1 from '../../assets/ProfilePic.png';
import profile2 from '../../assets/ProfilePic02.svg';
import profile3 from '../../assets/ProfilePic03.svg';
import profile4 from '../../assets/ProfilePic04.svg';
import {ReactComponent as ProfileOverflowIcon } from '../../assets/profile_overflow.svg';

// 테스트용 친구 데이터
const mockFriends = [
  { id: 1, name: 'NAME1', email: 'example1@gmail.com', profileImage: profile1 },
  { id: 2, name: 'NAME2', email: 'example2@gmail.com', profileImage: profile2 },
  { id: 3, name: 'NAME3', email: 'example3@gmail.com', profileImage: profile3 },
  { id: 4, name: 'NAME4', email: 'example4@gmail.com', profileImage: profile4 },
  { id: 5, name: 'NAME5', email: 'example5@gmail.com', profileImage: profile1 },
  { id: 6, name: 'NAME6', email: 'example6@gmail.com', profileImage: profile1 },
];




const TravelSelectDate = ({ formData, updateFormData, nextStep, prevStep }) => {
    const [title, setTitle] = useState(formData.title || '');
      const [startDate, setStartDate] = useState(formData.startDate || new Date());
      const [endDate, setEndDate] = useState(formData.endDate || new Date());
    
      const handleNext = () => {
        // formData에 값 저장 후 다음 스텝으로 이동
        updateFormData({ title, startDate, endDate });
        nextStep();
      };
      
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
          
            

    return(
        <div>
          <button onClick={prevStep} className="prev-button"><BackIcon /></button>
          <div className="selcet-friends-profile">
              {mockFriends.slice(0, 3).map((friend) => (
                  <img
                  key={friend.id}
                  src={friend.profileImage}
                  alt={friend.name}
                  className="selcet-profile-img"
                  />
              ))}
              {mockFriends.length > 4 && (
                  <ProfileOverflowIcon className="profile-skip-icon" />
              )}
          </div>

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
          <button className="project-next-button" onClick={handleNext}> <ProjectNextIcon/></button>

        </div>
                
    )
};

export default TravelSelectDate;
