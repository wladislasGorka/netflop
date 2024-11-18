import React from 'react';
import { Link } from 'react-router-dom';

const ButtonNavigation = ({path,label}) => {
    return (
        <div className="mt-12">
            <Link to={path}>
                <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded">
                    {label}
                </button>
            </Link>
        </div>
    );
}

export default ButtonNavigation;