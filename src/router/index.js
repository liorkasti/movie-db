import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, Dimensions, ActivateIndicator } from "react-native"
import auth from '@react-native-firebase/auth';

import Welcome from "../screens/Welcome";
import Favorites from "../screens/Favorites";
import Movie from "../screens/Movie";
import Movies from "../screens/Movies";
import Login from "../components/Login";
import HeaderBar from "../components/HeaderBar";
import FooterBar from "../components/FooterBar";
import { TMDB } from '../utils/constants';
import useFetch from '../hooks/useFetch';

const currentUser = auth().currentUser;

export default function Index(props) {
    const [componentIndex, setComponentIndex] = useState(0);
    const [currentComponent, setCurrentComponent] = useState("Welcome");
    const components = { Welcome, Movies, Movie, Favorites };
    const componentKeys = ["Welcome", "Movies", "Movie", "Favorites"];

    const [favoriteList, setFavoriteList, fetchFavorites, favoritesHandler, popularMovies, popularResult, errorFetchMessage] = useFetch();
    const [indexPagination, setIndexPagination] = useState(1);

    const [movieList, setMovieList] = useState([])
    const [renderedMovie, setRenderedMovie] = useState([]);

    useEffect(() => {
        fetchFavorites()
        if (componentIndex === 0) {
            setCurrentComponent("Welcome");
        }
        if (componentIndex === 1) {
            setCurrentComponent("Movies");
        }
        if (componentIndex === 2) {
            setCurrentComponent("Movie");
        }
        // TODO: setPreviewIndex OR setFlag on and check flag when pressing back button come from Favorites. than the back should returns to Favorites screen and not  
    }, [componentIndex])

    useEffect(() => {
        popularMovies(indexPagination)
        setMovieList([...movieList, popularResult])
    }, [indexPagination]);

    const handleFooterBar = (page) => {
        switch (page) {
            case "favorites":
                setCurrentComponent("Favorites");
                setComponentIndex(3)
                break;
            case "movies":
                setCurrentComponent("Movies");
                setComponentIndex(1)
                break;
            case "welcome":
                setCurrentComponent("Welcome");
                setComponentIndex(0)
                break;
        }
    };

    // update the movie list
    const renderedMovieHandler = async (movie) => {
        await fetchFavorites()
        setRenderedMovie(movie);
        setComponentIndex(2)
    }


    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        fetchFavorites()
        console.log("subscriber: ", subscriber.toString())
        return subscriber;
    }, []);


    const CurrentComponentRouter = () => {
        if (!components[currentComponent]) return <ActivateIndicator />
        const CurrentComponent = components[currentComponent];

        return (<CurrentComponent
            currentComponent={components[componentKeys[componentIndex]]}
            componentIndex={componentIndex}

            onBack={() => { setComponentIndex(componentIndex - 1) }}
            onNext={() => { setComponentIndex(2) }}

            movieList={movieList}
            setMovieList={setMovieList}

            popularMovies={popularMovies}
            popularResult={popularResult}
            errorFetchMessage={errorFetchMessage}

            favoriteList={favoriteList}
            setFavoriteList={fetchFavorites}

            indexPagination={indexPagination}
            setIndexPagination={setIndexPagination}

            renderedMovie={renderedMovie}
            onSelectedMovie={renderedMovieHandler}
            setRenderedMovie={setRenderedMovie}

            onPressFavorite={favoritesHandler}

            posterUrlBase={TMDB.posterUrlBase}
        />)
    };

    return (
        <View style={styles.container}>
            <HeaderBar
                componentIndex={componentIndex}

                onBack={() => {
                    if (componentIndex === 3) setComponentIndex(0);
                    else setComponentIndex(componentIndex - 1);
                }}

                onNext={() => {
                    setComponentIndex(componentIndex + 1)
                }}
            />
            <Login
                componentIndex={componentIndex}
                fetchFavorites={fetchFavorites}
            />
            <CurrentComponentRouter />

            <FooterBar handleFooterBar={(screen) => { handleFooterBar(screen) }} />
        </View >
    );
}

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    }
});
