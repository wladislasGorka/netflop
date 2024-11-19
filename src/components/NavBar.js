import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import SearchBox from './SearchBox';
import ButtonDeconnexion from './ButtonDeconnexion';
import Modal from './Modal';

const NavBar = ({ brandName, navItems, searchValue, setSearchValue, isLoggedIn }) => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };
  
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-baseline">
        <div className="text-2xl font-bold text-lime-500">{brandName}</div>
        <ul className="flex space-x-4">
          {navItems.map((item, index) => (
            ((isLoggedIn || item.label!=="Movies" ) && (isLoggedIn || item.label!=="MyPlan" )) &&
            ((!isLoggedIn || item.label!=="Register") && (!isLoggedIn || item.label!=="Login")) &&
            (<li key={index}>
              <NavLink to={item.path} className="text-orange-600 hover:text-gray-400">
                {item.label}
              </NavLink>
            </li>)
          ))}
        </ul>
        {isLoggedIn && (
          <>
          <ButtonDeconnexion toggleModal={toggleModal}/>
          <Modal show={showModal} onClose={toggleModal} />
          </>
        )}
        {!isLoggedIn && (<div className='w-16'></div>)}
        
        {/* <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} /> */}
      </div>
    </nav>
  );
};

NavBar.propTypes = {
  brandName: PropTypes.string.isRequired,
  navItems: PropTypes.arrayOf(
    PropTypes.shape({
      path: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  searchValue: PropTypes.string.isRequired,
  setSearchValue: PropTypes.func.isRequired,
};

export default NavBar;


