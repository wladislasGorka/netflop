import React, { useState, useEffect, lazy, Suspense, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import './index.css';
import Home from './components/Home';
import NavBar from './components/NavBar';
import MovieList from './components/MovieList';
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';
import SearchTypeBox from './components/SearchTypeBox';
import AddFavourites from './components/AddFavourites';
import RemoveFavourites from './components/RemoveFavourites';
import About from './components/About';
import Contact from './components/Contact';
import MyPlan from './components/MyPlan';
import MyRegister from './components/MyRegister';
import MyLogin from './components/MyLogin';
import NoMatch from './components/NoMatch';
import MovieDetails from './components/MovieDetails';
import { LogContext } from './components/LogContext';

const App = () => {
  const apiKey = process.env.REACT_APP_OMDB_KEY;
  const [movies, setMovies] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [searchType, setSearchType] = useState('');
  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/MovieList', label: 'Movies' },
    { path: '/Contact', label: 'Contact' },
    { path: '/About', label: 'About' },
	{ path: '/Register', label: 'Register'},
	{ path: '/Login', label: 'Login'},
  { path: '/MyPlan', label: 'MyPlan'}
  ];
  const plans = [
	{
	  name: 'Basic',
	  price: '10€ / mois',
	  features: ['Accès limité', 'Support par email', '1 utilisateur'],
	},
	{
	  name: 'Standard',
	  price: '20€ / mois',
	  features: ['Accès illimité', 'Support par chat', '5 utilisateurs'],
	},
	{
	  name: 'Premium',
	  price: '30€ / mois',
	  features: ['Accès illimité', 'Support par téléphone', 'Utilisateurs illimités'],
	},
  ];
  const types = ["movie","series","episode","game"];
  const typesSearchLabel = "-Type of search-";

  const [selectedPlan, setSelectedPlan] = useState(null); 
  const handleSelectPlan = (planName) => { setSelectedPlan(planName); };
  
  const [subscribePlan, setSubscribePlan] = useState(null);
  const handleSubscribePlan = (planName) => {
    //console.log("plan:"+planName);
    setSubscribePlan(planName); 
  };

  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const handleLogin = (status) => { setIsLoggedIn(status); };

  const getMovieRequest = async (searchValue,searchType) => {
    if(!searchValue && !searchType){
      return
    }
    let url = `http://www.omdbapi.com/?s=${searchValue}&type=${searchType}&apikey=${apiKey}`;
    
    const response = await fetch(url);
    const responseJson = await response.json();
    //console.log(responseJson.Search);
    //console.log("type= "+searchType);
    if (responseJson.Search) {
      const shuffledMovies = shuffleArray(responseJson.Search);
      setMovies(shuffledMovies);
    }
  };

  useEffect(() => {
    getMovieRequest(searchValue,searchType);
  }, [searchValue,searchType]);

  useEffect(() => {
    const movieFavourites = JSON.parse(
      localStorage.getItem('react-movie-app-favourites')
    );

    if (movieFavourites) {
      setFavourites(movieFavourites);
    }
  }, []);

  const saveToLocalStorage = (items) => {
    localStorage.setItem('react-movie-app-favourites', JSON.stringify(items));
  };

  const addFavouriteMovie = (movie) => {
    const newFavouriteList = [...favourites, movie];
    setFavourites(newFavouriteList);
    saveToLocalStorage(newFavouriteList);
  };

  const removeFavouriteMovie = (movie) => {
    const newFavouriteList = favourites.filter(
      (favourite) => favourite.imdbID !== movie.imdbID
    );

    setFavourites(newFavouriteList);
    saveToLocalStorage(newFavouriteList);
  };

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  return (
    <Router> 
      {console.log("coucou")}
      <LogContext.Provider value={{isLoggedIn, setIsLoggedIn}}>
      <div className='container mx-auto p-4 movie-app'> 
		  <NavBar brandName="MyNetflop" navItems={navItems} searchValue={searchValue} setSearchValue={setSearchValue} isLoggedIn={isLoggedIn}/> 
			<Suspense fallback={<div className="container">Loading...</div>}> 
        <Routes> 
          <Route path="/" element={<Home plans={plans} onSelectPlan={handleSelectPlan} isLoggedIn={isLoggedIn} />} />
          
          <Route path="/About" element={<About />} /> 
          <Route path="/Contact" element={<Contact />} /> 
          <Route path="/MovieList/" element={ 
            <> 
            <MovieListHeading heading='Movies' /> 
            <div className='flex'>
            <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} /> 
            <SearchTypeBox searchType={searchType} setSearchType={setSearchType} types={types} typesSearchLabel={typesSearchLabel}/>
            </div>
            <MovieList movies={movies} handleFavouritesClick={addFavouriteMovie} favouriteComponent={AddFavourites} /> 
            <MovieListHeading heading='Favourites' /> 
            <MovieList movies={favourites} handleFavouritesClick={removeFavouriteMovie} favouriteComponent={RemoveFavourites} /> 
            </> 
          } /> 
          <Route path="/MovieDetails/:id" element={<MovieDetails />} /> 
          <Route path="/Register" element={<MyRegister />} />
          <Route path="/Login" element={<MyLogin onLogin={handleLogin}/>} />
          <Route path="/MyPlan" element={<MyPlan plans={plans} subscribePlan={subscribePlan} handleSubscribePlan={handleSubscribePlan}/>} />
          <Route path="*" element={<NoMatch />} /> 
        </Routes> 
		</Suspense> 
		</div> 
    </LogContext.Provider>
	</Router>
	
  );
};

export default App;



