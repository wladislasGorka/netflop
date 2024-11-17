import React, { useState, useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import './index.css';
import Home from './components/Home';
import NavBar from './components/NavBar';
import MovieList from './components/MovieList';
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';
import AddFavourites from './components/AddFavourites';
import RemoveFavourites from './components/RemoveFavourites';
import About from './components/About';
import Contact from './components/Contact';
import MyPlan from './components/MyPlan';
import MyRegister from './components/MyRegister';
import MyLogin from './components/MyLogin';
import NoMatch from './components/NoMatch';
import MovieDetails from './components/MovieDetails';

const App = () => {
  const apiKey = process.env.REACT_APP_OMDB_KEY;
  const [movies, setMovies] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/MovieList', label: 'Movies' },
    { path: '/Contact', label: 'Contact' },
    { path: '/About', label: 'About' },
	{ path: '/Register', label: 'Register'},
	{ path: '/Login', label: 'Login'}
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

  const [selectedPlan, setSelectedPlan] = useState(null); 
  const handleSelectPlan = (planName) => { setSelectedPlan(planName); };
  
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const handleLogin = (status) => { setIsLoggedIn(status); };

  const getMovieRequest = async (searchValue) => {
    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=${apiKey}`;
    const response = await fetch(url);
    const responseJson = await response.json();
    console.log(responseJson);
    setMovies([responseJson]);
    if (responseJson.Search) {
      const shuffledMovies = shuffleArray(responseJson.Search);
      setMovies(shuffledMovies);
    }
  };

  useEffect(() => {
    getMovieRequest(searchValue);
  }, [searchValue]);

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
    <Router> <div className='container mx-auto p-4 movie-app'> 
		  <NavBar brandName="MyNetflop" navItems={navItems} searchValue={searchValue} setSearchValue={setSearchValue} /> 
			<Suspense fallback={<div className="container">Loading...</div>}> 
        <Routes> 
          <Route path="/" element={<Home plans={plans} onSelectPlan={handleSelectPlan}/>} /> 
          <Route path="/About" element={<About />} /> 
          <Route path="/Contact" element={<Contact />} /> 
          <Route path="/MovieList" element={ 
            <> 
            <MovieListHeading heading='Movies' /> 
            <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} /> 
            <MovieList movies={movies} handleFavouritesClick={addFavouriteMovie} favouriteComponent={AddFavourites} /> 
            <MovieListHeading heading='Favourites' /> 
            <MovieList movies={favourites} handleFavouritesClick={removeFavouriteMovie} favouriteComponent={RemoveFavourites} /> </> } /> 
            <Route path="/MovieDetails/:id" element={<MovieDetails />} /> 
          <Route path="/Register" element={<MyRegister />} />
          <Route path="/Login" element={<MyLogin onLogin={handleLogin}/>} />
          <Route path="/Plan" element={<MyPlan />} />
          <Route path="*" element={<NoMatch />} /> 
        </Routes> 
		</Suspense> 
		</div> 
	</Router>
	
  );
};

export default App;



