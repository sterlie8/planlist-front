import React, { useState } from 'react';
import PlaceSelectionPopup from './PlaceSelectionPopup';
import { ReactComponent as BackIcon } from '../../assets/prev_arrow.svg';


const predefinedDates = ['2025-08-10', '2025-08-11', '2025-08-12'];

const TravelPlannerCreate = ({ formData, updateFormData, nextStep, prevStep }) => {
  const [itinerary, setItinerary] = useState({});
  const [activeDate, setActiveDate] = useState(predefinedDates[0]);
  const [showPopup, setShowPopup] = useState(false);

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

  return (
    <div className="travel-planner-container">
        <button onClick={prevStep} className="prev-button"><BackIcon /></button>
      <h2>Plan Your Trip</h2>

      {/* Date Tabs */}
      <div className="date-tabs">
        {predefinedDates.map((date) => (
          <button
            key={date}
            className={`date-tab ${activeDate === date ? 'active' : ''}`}
            onClick={() => setActiveDate(date)}
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
          const showAddTrafficBetween =
            isPlace && next?.type === 'place';

          return (
            <React.Fragment key={index}>
              <li className={`entry ${entry.type}`}>
                {isPlace ? (
                  <>
                    🏛 {entry.data.name}
                    <input
                      type="time"
                      value={entry.data.time}
                      onChange={(e) =>
                        updateEntryData(index, 'time', e.target.value)
                      }
                      placeholder="HH:MM"
                      style={{ marginLeft: '10px' }}
                    />
                    <button onClick={() => handleRemoveEntry(index)}>✕</button>
                  </>
                ) : (
                  <>
                    🚗
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
                    <button onClick={() => handleRemoveEntry(index)}>✕</button>
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

        {/* Add Traffic + Add Place at the end */}
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
                <button onClick={() => setShowPopup(true)}>+ Add Place</button>
              </li>
            </>
          );
        })()}
      </ul>

      {/* Place Selection Popup */}
      {showPopup && (
        <PlaceSelectionPopup
          places={formData.places}
          onSelect={handleAddPlace}
          onClose={() => setShowPopup(false)}
        />
      )}
    </div>
  );
};

export default TravelPlannerCreate;
