import React from 'react';
import { Link } from 'react-router-dom';

const ButtonNavigation = () => {
    return (
        <div className="mt-12">
            <Link to="/Home">
                <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded">
                    Log out
                </button>
            </Link>
        </div>
    );
}

export default ButtonNavigation;