import React, { useState } from 'react';

function UserSearchId({ onSearch }) {
  const [userId, setUserId] = useState('');

  const handleSearch = () => {
    if (userId) {
      onSearch(userId);
    }
  };

  return (
    <div className="user-search">
      <input
        type="text"
        placeholder="Enter User ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}

export default UserSearchId;
