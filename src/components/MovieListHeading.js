import React from 'react';

const MovieListHeading = (props) => {
	return (
		<div className='col'>
			<h1 className="bg-neutral-700 text-orange-500 text-2xl">{props.heading}</h1>
		</div>
	);
};

export default MovieListHeading;
