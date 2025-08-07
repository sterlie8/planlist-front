import React, { useState, useEffect } from 'react';
import PlaceMap from '../StandardCreatePage/PlaceMap';
import LocationIcon from '../../icons/LocationIcon';
import { ReactComponent as BackIcon } from '../../assets/prev_arrow.svg';
import { ReactComponent as ProjectNextIcon } from "../../assets/Project_next_button.svg";
import { format, eachDayOfInterval } from 'date-fns';

const predefinedCategories = ['place', 'dining', 'stay'];

const TravelSelectPlace = ({ formData, updateFormData, nextStep, prevStep }) => {
  const [dateTabs, setDateTabs] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeDate, setActiveDate] = useState('All');

  useEffect(() => {
    if (formData.startDate && formData.endDate) {
      const dates = eachDayOfInterval({
        start: new Date(formData.startDate),
        end: new Date(formData.endDate),
      }).map(d => format(d, 'yyyy-MM-dd'));
      setDateTabs(dates);
    }
  }, [formData.startDate, formData.endDate]);

  const selectedPlaces = (formData.places || []).filter(p => p.date);

  const filteredPlaces = selectedPlaces.filter((place) => {
    const matchCategory = activeCategory === 'All' || place.category === activeCategory;
    const matchDate = activeDate === 'All' || place.date === activeDate;
    return matchCategory && matchDate;
  });

  return (
    <div className="choose-place-container">
      <div className="choose-title">
        <button onClick={prevStep} className="prev-button"><BackIcon /></button>
        <h2>Review Selected Places</h2>
      </div>

      <div className="choose-content">
        <div className="map-section">
          <PlaceMap selectedPlace={filteredPlaces[0] || null} />
        </div>

        <div className="choose-search-panel">
          {/* Category Tabs */}
          <div className="category-tabs">
            {['All', ...predefinedCategories].map((tab) => (
              <button
                key={tab}
                className={`category-tab ${activeCategory === tab ? 'active' : ''}`}
                onClick={() => setActiveCategory(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Date Tabs (dynamically generated) */}
          <div className="date-tabs">
            {['All', ...dateTabs].map((tab) => (
              <button
                key={tab}
                className={`date-tab ${activeDate === tab ? 'active' : ''}`}
                onClick={() => setActiveDate(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Place List */}
          <ul className="place-list">
            {filteredPlaces.length === 0 ? (
              <li>No places for this selection.</li>
            ) : (
              filteredPlaces.map((place) => (
                <li key={place.id} className="place-item selected">
                  <div className="place-title">
                    <LocationIcon color="#081F5C" />
                    <span>{place.name}</span>
                  </div>
                  <div className="place-address">{place.address}</div>
                  <div className="place-desc">
                    {place.description || 'No description...'}
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>

      <button className="project2-next-button" onClick={nextStep}>
        <ProjectNextIcon />
      </button>
    </div>
  );
};

export default TravelSelectPlace;
