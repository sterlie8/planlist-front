import React, { useState } from 'react';
import SearchBar from '../components/SearchBar/SearchBar';

function Meeting() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (value) => {
    setSearchQuery(value);
    console.log("Meeting 페이지 검색어:", value);
    // 예: 필터링, API 요청 등
  };

  return (
    <div>
      <h2>홈 페이지</h2>
      <SearchBar placeholder="검색할 내용을 입력하세요" onSearch={handleSearch} />      
    </div>
  );
}

//<p>검색어: {searchQuery}</p>
export default Meeting;