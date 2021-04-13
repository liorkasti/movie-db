import { useEffect, useState } from 'react';
import { ActivateIndicator } from "react-native"
import axios from 'axios';
import database from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
// import AsyncStorage from '@react-native-community/async-storage';

import {TMDB} from "../utils/constants";

const currentUser = auth().currentUser;

export default () => {
    const [popularResult, setPopularResult] = useState([]);
    const [errorFetchMessage, setErrorFetchMessage] = useState('');
    const [favoriteList, setFavoriteList] = useState([]);
    const [isStared, setIsStared] = useState(false);

    useEffect(() => {
        // console.log('fetch list data: ' + JSON.stringify(favoriteList))
      }, [])

    const fetchFavorites = async () => {
        // console.log("currentUser: " + JSON.stringify(currentUser.providerData))
        const list = database().collection('users').doc(currentUser.email)
            .get()
            .then(userData => {
                if (userData.exists) {
                    console.log('userData: ' + JSON.stringify(userData.data().favorites) + ', ')
                }
                else {
                    console.log('no such document!')
                }

                setFavoriteList(list)
            })
            .catch(err => {
                console.log('Error getting documents', err);
            });
    }

    const favoritesHandler = async (movie) => {

        console.log("favoriteList: " + JSON.stringify(favoriteList));
        console.log("Movie to be rendered: " + JSON.stringify(movie.title));
        const index = popularResult.findIndex(m => m.id === movie.id);
        console.log("exist? " + (popularResult[index].stared))
        console.log("index: " + (index))
        if (popularResult[index].stared) {
            popularResult[index].stared = false
            setFavoriteList(favoriteList.filter(m => m.id !== movie.id));
            // await setFavoriteList(favoriteList.movie.filter(popularMovies[index]));
            //  setFavoriteList(favoriteList.splice(favoriteList[index],1));
            database()
                .collection('users')
                .doc(currentUser.email).set({ favorites: favoriteList})
                .then(fetchFavorites())

            // await setFavoriteList(removeFavorite(favoriteList, movie));
            // await setFavoriteList(favoriteList.filter(m => m.id !== movie.id));
            // setComponentIndex(1)
        } else {
            // setFavoriteList(appendToFavorites(popularResult, favoriteList, movie))
            popularResult[index].stared = true
            database()
                .collection('users')
                .doc(currentUser.email).update({ favorites: [...favoriteList, movie] })
                .then(setFavoriteList([...favoriteList, { movie }]))
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

    // return [favoriteList, fetchFavorites, favoritesHandler, popularMovies, popularResult, errorFetchMessage];
    return [popularMovies, popularResult, errorFetchMessage];
};
