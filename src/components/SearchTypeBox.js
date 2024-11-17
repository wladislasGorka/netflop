import React from 'react';

const SearchTypeBox = ({ searchType, setSearchType }) => {
    const types = ["movie","series","episode","game"];

  return (
    <div className='col col-sm-4'>
        <select name="type" id="type-select" onChange={(event) => setSearchType(event.target.value)}>
            <option value="">-Type of search-</option>
            {types.map((type,index) => {
                return <option value={type}>{type}</option>
            })}
        </select>
    </div>
  );
};

export default SearchTypeBox;

