import { useState, useEffect } from 'react';
import axios from 'axios';
import database from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

import { TMDB } from "../utils/constants";

export default () => {
    const [popularResult, setPopularResult] = useState([]);
    const [errorFetchMessage, setErrorFetchMessage] = useState('');
    const [favoriteList, setFavoriteList] = useState([]);
    const [isStared, setIsStared] = useState(false);

    const currentUser = auth().currentUser;

    // useEffect(() => {
    //     if (currentUser) {
    //         database()
    //             .ref(`/users/favorites/${currentUser.email}`)
    //             .once('value')
    //             .then(snapshot => {
    //                 const response = snapshot.val();
    //                 console.warn("response favorites", response)
    //                 setFavoriteList(response.favorites);
    //             })
    //     }
    // }, []);

    const fetchFavorites = async () => {
        console.log('currentUser: ', currentUser)
        if (currentUser) {
            database().collection('users').doc(currentUser.email).get()
                .then(userData => {
                    if (userData.exists) {
                        console.log('userData: ', userData)
                        setFavoriteList(userData.data().favorites)
                    } else { console.log('no such document!') }
                })
                .catch(err => {
                    console.log('Error getting documents', err);
                });
        }
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
