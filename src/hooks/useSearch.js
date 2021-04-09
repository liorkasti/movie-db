import { useEffect, useState } from 'react';
import axios from 'axios';

import {TMDB} from '../utils/constants';

export default () => {
  const [searchResults, setSearchResults] = useState([]);
  const [errorSearchMessage, setErrorSearchMessage] = useState('');
  // const [loading, setLoading] = useState(true)

  useEffect(() => {
  
  }, []);
  
  const searchMovies = async searchTerm => {
    console.log('searchTerm:  ', searchTerm);
    if (searchTerm) {
      try {
        const response = await axios.get(TMDB.baseURL + TMDB.search + TMDB.Authorization + TMDB.language + '&query=' + searchTerm)
          .then(({ data }) => {
            setSearchResults(data.results);
          });
      } catch (err) {
        setErrorSearchMessage('Something went wrong');
      }
      console.log('results: ', JSON.stringify(searchResults))
    }
  };

  return [searchMovies, searchResults, errorSearchMessage];
};
