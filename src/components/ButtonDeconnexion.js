import {React, useContext} from 'react';
import { Link } from 'react-router-dom';
import { LogContext } from './LogContext';

const ButtonDeconnexion = ({toggleModal}) => {
    const { isLoggedIn, setIsLoggedIn } = useContext(LogContext);

    const handleClick = () => {
        //setIsLoggedIn(false);
        toggleModal();
        console.log("Deconnexion");
    }

    return (
        <div>
            {/* <Link to="/"> */}
                <button type="submit" onClick={() => handleClick()} className="px-4 py-2 bg-green-500 text-white rounded">
                    Log out
                </button>
            {/* </Link> */}
        </div>
    );
}

export default ButtonDeconnexion;