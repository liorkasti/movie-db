import React, { useState, useEffect } from "react";
import { View, StyleSheet, ActivateIndicator } from "react-native"

import Welcome from "../screens/Welcome";
import Favorites from "../screens/Favorites";
import Movie from "../screens/Movie";
import Movies from "../screens/Movies";
import { appendToFavorites, removeFavorite, updateFavorites } from "../action/modifyActions.js";
import HeaderBar from "../components/HeaderBar";
import FooterBar from "../components/FooterBar";
import { TMDB } from '../utils/constants';
import useFetch from '../hooks/useFetch';

export default function Index(props) {
    const [componentIndex, setComponentIndex] = useState(0);
    const [currentComponent, setCurrentComponent] = useState("Welcome");
    const [showBack, setShowBack] = useState(false);
    const components = { Welcome, Movies, Movie, Favorites };
    const componentKeys = ["Welcome", "Movies", "Movie", "Favorites"];
    // const headers = { Welcome: "My Movies Log", Movies: "Most Popular Movies", Movie: "Movie", Favorites: "Favorites" };

    const [popularMovies, popularResult, errorFetchMessage] = useFetch();
    const [indexPagination, setIndexPagination] = useState(1);

    const [movieList, setMovieList] = useState([])
    const [renderedMovie, setRenderedMovie] = useState([]);
    const [favoriteList, setFavoriteList] = useState([]);

    useEffect(() => {
        // fetchMovies();
        popularMovies(indexPagination)
        setMovieList([...movieList, popularResult])
        // setMovieList(...movieList, popularResult)
        // console.log("\n############\n$0" + indexPagination)
        // console.log("\term:\n" + term+'\n-------')
    }, [indexPagination]);

    useEffect(() => {
        console.log("\ncomponentIndex: $0" + componentIndex)

        if (componentIndex === 0) {
            setCurrentComponent("Welcome");
        }
        if (componentIndex === 1) {
            setCurrentComponent("Movies");
        }
        if (componentIndex === 2) {
            setCurrentComponent("Movie");
        }
        // TODO: if (componentIndex === 3) setPreviewIndex OR setFlag on and check flag when pressing back button come from Favorites. than the back should returns to Favorites screen and not  

        // console.log("componentIndex: ", componentIndex);

    }, [componentIndex])

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
        setRenderedMovie(movie);
        setComponentIndex(2)
    }

    // update the movies list
    const favoritesHandler = (movie) => {
        console.log("Movie to be rendered: " + JSON.stringify(movie.title));
        const index = popularResult.findIndex(m => m.id === movie.id);
        console.log("exist? " + (popularResult[index].stared))
        console.log("index: " + (index))
        if (popularResult[index].stared) {
            popularResult[index].stared = false
            // await setFavoriteList(favoriteList.movie.filter(popularMovies[index]));
            //  setFavoriteList(favoriteList.splice(favoriteList[index],1));
            setFavoriteList(removeFavorite(favoriteList, movie));
            // await setFavoriteList(favoriteList.filter(m => m.id !== movie.id));
            // setComponentIndex(1)
        } else {
            // setFavoriteList(appendToFavorites(popularResult, favoriteList, movie))
            setFavoriteList([...favoriteList, { movie }])
            popularResult[index].stared = true
        }
    }

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
            setFavoriteList={setFavoriteList}

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

                // header={headers[componentKeys[componentIndex]]}
                onBack={() => {
                    if (componentIndex === 3) setComponentIndex(0);
                    else setComponentIndex(componentIndex - 1);
                }}

                onNext={() => {
                    setComponentIndex(componentIndex + 1)
                }}
            />

            <CurrentComponentRouter />

            <FooterBar handleFooterBar={(screen) => { handleFooterBar(screen) }} />
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
    }
});
