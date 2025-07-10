import React from 'react';
import './SearchBar.css'; // 스타일 분리

function SearchBar({ placeholder = "Search", onSearch }) {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder={placeholder}
        onChange={(e) => onSearch(e.target.value)}
      />
      <button type="button" className="search-button">
        🔍
      </button>
    </div>
  );
}

export default SearchBar;