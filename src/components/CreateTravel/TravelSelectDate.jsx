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
import TwoMonthCalendar from "./TwoMonthCalendar";
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

// mock fallback
const mockWeekDates = [
  { date: '2025-08-11', label: 'Monday 11' },
  { date: '2025-08-12', label: 'Tuesday 12' },
  { date: '2025-08-13', label: 'Wednesday 13' },
  { date: '2025-08-14', label: 'Thursday 14' },
  { date: '2025-08-15', label: 'Friday 15' },
  { date: '2025-08-16', label: 'Saturday 16' },
  { date: '2025-08-17', label: 'Sunday 17' },
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
        
          <TwoMonthCalendar/>
          <button className="project-next-button" onClick={handleNext}> <ProjectNextIcon/></button>

        </div>
                
    )
};

export default TravelSelectDate;
