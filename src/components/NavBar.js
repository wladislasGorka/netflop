import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import SearchBox from './SearchBox';

const NavBar = ({ brandName, navItems, searchValue, setSearchValue }) => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold text-lime-500">{brandName}</div>
        <ul className="flex space-x-4">
          {navItems.map((item, index) => (
            <li key={index}>
              <NavLink to={item.path} className="text-orange-600 hover:text-gray-400">
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
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


