import { useState } from 'react';
import axios from 'axios';
import database from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

import { TMDB } from "../utils/constants";

const currentUser = auth().currentUser;

export default () => {
    const [popularResult, setPopularResult] = useState([]);
    const [errorFetchMessage, setErrorFetchMessage] = useState('');
    const [favoriteList, setFavoriteList] = useState([]);
    const [isStared, setIsStared] = useState(false);

    const fetchFavorites = async () => {
        database().collection('users').doc(currentUser.email).get()
            .then(userData => {
                if (userData.exists) {
                    setFavoriteList(userData.data().favorites)
                } else { console.log('no such document!') }
            })
            .catch(err => {
                console.log('Error getting documents', err);
            });
    }

    // update the favorite list
    const favoritesHandler = async (movie) => {
        const index = popularResult.findIndex(m => m.id === movie.id);
        if (popularResult[index].stared) { // remove from favorite list
            popularResult[index].stared = false
            database()
                .collection('users')
                .doc(currentUser.email)
                .update({
                    favorites: database.FieldValue.delete({ movie })
                }).then(fetchFavorites())

        } else { // add to favorite list
            database()
                .collection('users')
                .doc(currentUser.email)
                .update({
                    favorites: database.FieldValue.arrayUnion({ movie })
                })
                .then(
                    fetchFavorites(),
                    popularResult[index].stared = true
                )
        }
    }

    const popularMovies = async (indexPagination) => {
        try {
            const res = [];

            await axios.get(TMDB.baseURL + TMDB.popular + TMDB.Authorization + '&page=' + indexPagination)
                .then(response => {
                    response.data.results.forEach(movie => {
                        res.push({
                            id: movie.id, title: movie.title, rating: movie.vote_average,
                            poster: movie.poster_path, summary: movie.overview, year: movie.release_date,
                            stared: isStared
                        })
                        setPopularResult(res)
                    });
                })
        } catch (error) {
            console.error('There was an error!', error);
            setErrorFetchMessage('Something went wrong');
        }
    }

    return [favoriteList, setFavoriteList, popularMovies, favoritesHandler, popularMovies, popularResult, errorFetchMessage];
};
