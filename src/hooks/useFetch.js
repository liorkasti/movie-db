import { useEffect, useState } from 'react';
import { ActivateIndicator } from "react-native"
import axios from 'axios';
import database from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
// import AsyncStorage from '@react-native-community/async-storage';

import { TMDB } from "../utils/constants";

const currentUser = auth().currentUser;

export default () => {
    const [popularResult, setPopularResult] = useState([]);
    const [errorFetchMessage, setErrorFetchMessage] = useState('');
    const [favoriteList, setFavoriteList] = useState([]);
    const [isStared, setIsStared] = useState(false);

    useEffect(() => {
        console.log('fדדדדדדדד: ' + JSON.stringify(favoriteList))
        console.log("\currentUser.email: $0" + currentUser.email)

    }, [])

    const fetchFavorites = async () => {
        console.log("currentUser: " + JSON.stringify(currentUser.providerData))
        database().collection('users').doc(currentUser.email).get()
            .then(userData => {
                if (userData.exists) {
                    console.log('fetchFavorites data list: ' + JSON.stringify(userData.data().favorites) + ', \n---\n ')
                    setFavoriteList(userData.data().favorites)
                }
                else { console.log('no such document!') }
                console.log('favoriteList: ' + JSON.stringify(favoriteList) + ', \n---\n ')
            })
            .catch(err => {
                console.log('Error getting documents', err);
            });
    }

    // update the favorite list
    const favoritesHandler = async (movie) => {
        console.log("Movie to be rendered: " + JSON.stringify(movie));
        const index = popularResult.findIndex(m => m.id === movie.id);
        console.log("exist? " + (popularResult[index].stared))
        console.log("index: " + (index))
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

    return [favoriteList, setFavoriteList, popularMovies, favoritesHandler, popularMovies, popularResult, errorFetchMessage];
    // return [popularMovies, popularResult, errorFetchMessage];
};
