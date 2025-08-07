import React, { useEffect, useState } from 'react';
import PlaceSelectionPopup from './PlaceSelectionPopup';
import { ReactComponent as BackIcon } from '../../assets/prev_arrow.svg';
import { ReactComponent as ProjectNextIcon } from "../../assets/Project_next_button.svg";
import { format, addDays, eachDayOfInterval } from 'date-fns';
import PlaceMap from '../StandardCreatePage/PlaceMap';
import MemoCard from '../ProjectViewTravel/TravelMemoCard';
import LocationIcon from '../../icons/LocationIcon';


import "./TravelCreatePlanner.css";

const TravelPlannerCreate = ({ formData, updateFormData, nextStep, prevStep }) => {
  const [itinerary, setItinerary] = useState({});
  const [dateList, setDateList] = useState([]);
  const [activeDate, setActiveDate] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (formData.startDate && formData.endDate) {
      const allDates = eachDayOfInterval({
        start: new Date(formData.startDate),
        end: new Date(formData.endDate)
      }).map(d => format(d, 'MM/dd'));
      setDateList(allDates);
      setActiveDate(allDates[0]); // default to first
    }
  }, [formData.startDate, formData.endDate]);

  const currentList = itinerary[activeDate] || [];

  const handleAddPlace = (place) => {
    const updated = [
      ...currentList,
      {
        type: 'place',
        data: { ...place, time: '' },
      },
    ];
    setItinerary((prev) => ({ ...prev, [activeDate]: updated }));
    setShowPopup(false);
  };

  const handleInsertTraffic = (index) => {
    const updated = [...currentList];
    updated.splice(index, 0, {
      type: 'traffic',
      data: { kind: 'walk', duration: '' },
    });
    setItinerary((prev) => ({ ...prev, [activeDate]: updated }));
  };

  const handleRemoveEntry = (index) => {
    const updated = [...currentList];
    updated.splice(index, 1);
    setItinerary((prev) => ({ ...prev, [activeDate]: updated }));
  };

  const updateEntryData = (index, field, value) => {
    const updated = [...currentList];
    updated[index].data[field] = value;
    setItinerary((prev) => ({ ...prev, [activeDate]: updated }));
  };

  const handleNext = () => {
    const allScheduledPlaces = [];

    for (const [date, entries] of Object.entries(itinerary)) {
      entries.forEach(entry => {
        if (entry.type === 'place') {
          allScheduledPlaces.push({
            ...entry.data,
            date, // attach scheduled date
          });
        }
      });
    }

    updateFormData({ places: allScheduledPlaces });
    nextStep();
  };
  const selectedPlaces = (formData.places || []).filter(p => p.date);
const filteredPlaces = selectedPlaces.filter(p => p.date === activeDate); // or some other condition


  

  return (
    <div className="travel-planner-container">
      <button onClick={prevStep} className="prev-button"><BackIcon /></button>
      <h2>Project name</h2>

      {/* Date Tabs */}
      <div className=" tab date-tabs">
        {dateList.map((date) => (
          <button
            key={date}
            className={`date-tab ${activeDate === date ? 'active' : ''}`}
            onClick={() => setActiveDate(date)}
            disabled={activeDate === date} 
          >
            {date}
          </button>
        ))}
      </div>

      {/* Itinerary List */}
      <ul className="itinerary-list">
        {currentList.map((entry, index) => {
          const isPlace = entry.type === 'place';
          const next = currentList[index + 1];
          const showAddTrafficBetween = isPlace && next?.type === 'place';

          return (
            <React.Fragment key={index}>
              <li className={`entry ${entry.type}`}>
                {isPlace ? (
                  <>
                    <div className="planner-place-item">
                      <LocationIcon color={"#BAD6EB"} />
                      <span className='place-title'>{entry.data.name}</span>
                      <div className="place-address">{entry.data.address}</div>
                        <div className="place-desc">
                          {entry.data.description || 'description about the place......'}
                        </div>


                    </div>
                    <button onClick={() => handleRemoveEntry(index)}>✕</button>

                    <input
                      type="time"
                      value={entry.data.time}
                      onChange={(e) =>
                        updateEntryData(index, 'time', e.target.value)
                      }
                      placeholder="HH:MM"
                      style={{ marginLeft: '10px' }}
                    />
                  </>
                ) : (
                  <>
                    
                    <select
                      value={entry.data.kind}
                      onChange={(e) =>
                        updateEntryData(index, 'kind', e.target.value)
                      }
                    >
                      <option value="walk">Walk</option>
                      <option value="car">Car</option>
                      <option value="bus">Bus</option>
                      <option value="subway">Subway</option>
                    </select>
                    <button onClick={() => handleRemoveEntry(index)}>✕</button>

                    <input
                      type="text"
                      placeholder="Duration"
                      value={entry.data.duration}
                      onChange={(e) =>
                        updateEntryData(index, 'duration', e.target.value)
                      }
                      style={{ marginLeft: '10px', width: '60px' }}
                    />
                    <span>min</span>

                  </>
                )}
              </li>

              {/* Add traffic button between two places */}
              {showAddTrafficBetween && (
                <li className="add-traffic-between">
                  <button onClick={() => handleInsertTraffic(index + 1)}>+ Add Traffic</button>
                </li>
              )}
            </React.Fragment>
          );
        })}

        {/* Add buttons at the end */}
        {(() => {
          const last = currentList[currentList.length - 1];
          const allowTrailingTraffic = last?.type === 'place';

          return (
            <>
              {allowTrailingTraffic && (
                <li>
                  <button onClick={() => handleInsertTraffic(currentList.length)}>+ Add Traffic</button>
                </li>
              )}
              <li>
                <button className="planner-add-place-button" onClick={() => setShowPopup(true)}>Add Place</button>
              </li>
            </>
          );
        })()}
      </ul>

      {/* Popup */}
      {showPopup && (
        <PlaceSelectionPopup
          places={formData.places}
          onSelect={handleAddPlace}
          onClose={() => setShowPopup(false)}
        />
      )}

      


      <PlaceMap selectedPlace={(formData.places || []).find(p => p.date === activeDate) || null} />
      
      <MemoCard/>
      <button className="project2-next-button" onClick={handleNext}>
        <ProjectNextIcon />
      </button>
    </div>
  );
};

export default TravelPlannerCreate;
