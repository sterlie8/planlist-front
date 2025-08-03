const PlaceSelectionPopup = ({ places, onSelect, onClose }) => {
  return (
    <div className="popup-overlay">
      <div className="popup">
        <h3>Select a Place</h3>
        <ul>
          {places.map(place => (
            <li key={place.id} onClick={() => onSelect(place)}>
              {place.name} – {place.address}
            </li>
          ))}
        </ul>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default PlaceSelectionPopup;
