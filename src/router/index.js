import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, Dimensions, TouchableOpacity, Image, ActivateIndicator } from "react-native"
import { useHistory } from "react-router-dom";
import auth from '@react-native-firebase/auth';
import { GoogleSignin, GoogleSigninButton, statusCodes, } from '@react-native-community/google-signin';
import database from '@react-native-firebase/firestore';
import { ActivityIndicator } from 'react-native';

import Welcome from "../screens/Welcome";
import Favorites from "../screens/Favorites";
import Movie from "../screens/Movie";
import Movies from "../screens/Movies";
import HeaderBar from "../components/HeaderBar";
import FooterBar from "../components/FooterBar";
import { TMDB, COLORS } from '../utils/constants';
import useFetch from '../hooks/useFetch';

const currentUser = auth().currentUser;

export default function Index(props) {
    const [componentIndex, setComponentIndex] = useState(0);
    const [currentComponent, setCurrentComponent] = useState("Welcome");

    const components = { Welcome, Movies, Movie, Favorites };
    const componentKeys = ["Welcome", "Movies", "Movie", "Favorites"];

    const [popularMovies, popularResult, errorFetchMessage] = useFetch();
    const [indexPagination, setIndexPagination] = useState(1);

    const [initializing, setInitializing] = useState(true);

    const [user, setUser] = useState();
    const [users, setUsers] = useState([]);

    const [movieList, setMovieList] = useState([])
    const [renderedMovie, setRenderedMovie] = useState([]);
    const [favoriteList, setFavoriteList] = useState([]);
    const [isStared, setIsStared] = useState(false);

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
        setRenderedMovie(movie);
        setComponentIndex(2)
    }

    const fetchFavorites = async () => {
        console.log("currentUser: " + JSON.stringify(currentUser.providerData))
        database().collection('users').doc(currentUser.email).get()
            .then(userData => {
                if (userData.exists) {
                    console.log('fetchFavorites data list: ' + JSON.stringify(userData.data().favorites) + ', \n---\n ')
                    setFavoriteList(userData.data().favorites)
                    // favoriteList.push({
                    //     id: movie.id, title: movie.title, rating: movie.vote_average,
                    //     poster: movie.poster_path, summary: movie.overview, year: movie.release_date,
                    //     stared: isStared
                    // })
                }
                else { console.log('no such document!') }
                // setFavoriteList(JSON.stringify(userData.data()))
                console.log('favoriteList: ' + JSON.stringify(favoriteList) + ', \n---\n ')
            })
            .catch(err => {
                console.log('Error getting documents', err);
            });
    }

    // update the favorite list
    const favoritesHandler = async (movie) => {

        console.log("Movie to be rendered: " + JSON.stringify(movie.id));
        const index = popularResult.findIndex(m => m.id === movie.id);
        console.log("exist? " + (popularResult[index].stared))
        console.log("index: " + (index))
        if (popularResult[index].stared) { // remove from favorite list
            popularResult[index].stared = false
            console.log("favoriteList: " + JSON.stringify(favoriteList));
            console.log("before: " + favoriteList.length)
            console.log("movie to remove: " + movie.title + " " + movie.id)
            var newList = favoriteList.filter(m => m.id !== movie.id);
            setFavoriteList(newList);
            console.log("after filter: " + favoriteList)

            database()
                .collection('users')
                .doc(currentUser.email)
                .update({
                    favorites: database.FieldValue.delete({movie, stared: true})
                }).then(setFetchFavorites(favoriteList.filter(m => m.id !== movie.id)))

        } else { // add to favorite list
            popularResult[index].stared = true
            database()
                .collection('users')
                .doc(currentUser.email)
                .update({
                    favorites: database.FieldValue.arrayUnion({movie, stared: true})
                })
                // .update({ favorites: [...favoriteList, { movie, stared: true }] })
                .then(setFavoriteList([...favoriteList, { movie, stared: true }]))

}
    }


GoogleSignin.configure({
    webClientId: '1081725631941-b4gol59tl4imc6kj8pf3vc351rhs1cs1.apps.googleusercontent.com',
    offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
});

const logoff = () => {
    auth()
        .signOut()
        .then(() => console.log('User signed out!'));
}

onAuthStateChanged = (user) => {
    setUser(user);
    if (initializing) setInitializing(false);
}

useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
}, []);


if (initializing) return null;

onGoogleButtonPress = async () => {
    try {
        const { idToken } = await GoogleSignin.signIn();
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);

        await GoogleSignin.hasPlayServices();
        const userInfo = await GoogleSignin.signIn();
        if (userInfo) {
            console.log("GOOGLE USER", userInfo.user);
            await fetchFavorites()
        }
        return auth().signInWithCredential(googleCredential);
    } catch {
        if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        } else if (error.code === statusCodes.IN_PROGRESS) {
        } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        } else {
            if (error.code === 'auth/email-already-in-use') {
                console.log('That email address is already in use!');
            }
            if (error.code === 'auth/invalid-email') {
                console.log('That email address is invalid!');
            }
            console.error(error);
        }
    }
}

const Login = () => {

    if (!user) {
        return (
            <View>
                <GoogleSigninButton
                    onPress={() => onGoogleButtonPress()}
                    title="Google Sign-In"
                    style={styles.btnSocial}
                    color={GoogleSigninButton.Color.Dark}
                    size={GoogleSigninButton.Size.Standard}
                />
            </View>
        );
    } return (
        <>
            {componentIndex === 0 &&
                <View style={styles.profileContainer}>
                    < Image
                        source={{ uri: user.photoURL }}
                        style={styles.profileImg}
                        resizeMode='cover'
                    />
                    <Text style={styles.prompt}>Welcome {user.displayName}</Text>
                    <TouchableOpacity
                        title="Logout"
                        onPress={() => logoff()}
                        style={styles.btnLogout}
                    >
                        <Text style={styles.btnTitle}>Logout</Text>
                    </TouchableOpacity>
                </View>
            }
        </>
    );
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
        <Login />
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
    },
    profileContainer: {
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        flexWrap: 'nowrap',
        width: windowWidth * .8,
    },
    btnLogout: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
        justifyContent: 'center',
        width: 60,
        height: 30,
        // margin: 40,
        color: 'white',
        backgroundColor: COLORS.lightCard,
    },
    prompt: { flexDirection: 'row', flexWrap: 'wrap', color: 'white', padding: 5 },
    btnTitle: { width: 60, color: COLORS.favorite, padding: 5 },
    btnSocial: { width: 110, height: 40, padding: 5 },
    profileImg: {
        height: 50,
        width: 50,
        padding: 10,
        borderRadius: 40,
    },
});
