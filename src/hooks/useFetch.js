import { useEffect, useState } from 'react';
import { ActivateIndicator } from "react-native"
import axios from 'axios';
// import AsyncStorage from '@react-native-community/async-storage';

import {TMDB} from "../utils/constants";

export default () => {
    const [popularResult, setPopularResult] = useState([]);
    const [errorFetchMessage, setErrorFetchMessage] = useState('');
    const [loading, setLoading] = useState(true)
    const [isStared, setIsStared] = useState(false);

    const popularMovies = async (indexPagination) => {
        try {
            const res = [];

            await axios.get(TMDB.baseURL + TMDB.popular + TMDB.Authorization + '&page=' + indexPagination)
                .then(response => {
                    // console.log(TMDB.baseURL + TMDB.popular + TMDB.Authorization + '&page=' + indexPagination)
                    response.data.results.forEach(movie => {
                        res.push({
                            id: movie.id, title: movie.title, rating: movie.vote_average,
                            poster: movie.poster_path, summary: movie.overview, year: movie.release_date,
                            stared: isStared
                        })
                        // )
                        // console.log('moviesResult: ', (movie.title));
                        setPopularResult(res)

                        if (isStared) {
                            // favoriteList.movie.filter(m => m.title !== movie.title);
                        }
                    });
                })
            // .finally(() => {
            //     setPopularResult(res)
            // })
        } catch (error) {
            console.error('There was an error!', error);
            setErrorFetchMessage('Something went wrong');
        }
    }

    return [popularMovies, popularResult, errorFetchMessage];
};
