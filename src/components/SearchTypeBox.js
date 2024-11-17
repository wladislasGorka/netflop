import React from 'react';

const SearchTypeBox = ({ searchType, setSearchType, types, typesSearchLabel }) => {
    

  return (
    <div className='col col-sm-4'>
        <select name="type" id="type-select" onChange={(event) => setSearchType(event.target.value)}>
            <option value="">{typesSearchLabel}</option>
            {types.map((type,index) => {
                return <option key={type} value={type}>{type}</option>
            })}
        </select>
    </div>
  );
};

export default SearchTypeBox;

