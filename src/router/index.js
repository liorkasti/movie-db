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
import { TMDB, COLORS } from '../utils/constants';
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

<<<<<<< HEAD
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


    GoogleSignin.configure({
        webClientId: '1081725631941-b4gol59tl4imc6kj8pf3vc351rhs1cs1.apps.googleusercontent.com',
        offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
    });

    const logoff = async () => {
        try {
            await auth().signOut().then(() => console.log('User signed out!'));
            setUser(null);
        } catch (error) {
            console.error(error);
        }
    }

    onAuthStateChanged = (user) => {
        setUser(user);
        if (initializing) setInitializing(false);
    }
=======
>>>>>>> features/firestore-setup

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        fetchFavorites()
        return subscriber;
    }, []);

<<<<<<< HEAD
    if (initializing) return null;

    onGoogleButtonPress = async () => {
        try {
            const { idToken } = await GoogleSignin.signIn();
            const googleCredential = auth.GoogleAuthProvider.credential(idToken);
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            if (userInfo) {
                console.log("GOOGLE USER", userInfo.user);
                // alert('welcome ' + userInfo.user.name);
            }
            return auth().signInWithCredential(googleCredential);
        } catch {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) { // user cancelled the login flow
            } else if (error.code === statusCodes.IN_PROGRESS) { // operation (e.g. sign in) is in progress already
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) { // play services not available or outdated
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
                        onPress={() => onGoogleButtonPress().then(() => console.log('Signed in with Google! ', userInfo))}
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
=======
>>>>>>> features/firestore-setup

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
<<<<<<< HEAD
    },
    profileContainer: {
        flexDirection: 'row',
        // flexWrap: 'nowrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        // height: 120,
        // paddingLeft: 20,
        // width: 120, 
        // justifyContent: 'center',
        width: windowWidth * 0.9,
    },
    btnLogout: {
        // flexDirection: 'row-reverse',
        alignItems: 'center',
        justifyContent: 'center',
        width: 65,
        height: 30,
        right: 14,
        color: 'white',
        backgroundColor: COLORS.lightCard,
    },
    btnTitle: { width: 60, color: COLORS.favorite, padding: 5 },
    prompt: { color: 'white', padding: 5, right: 24,},
    btnSocial: { width: 110, height: 40, padding: 5, },
    profileImg: {
        height: 50,
        width: 50,
        padding: 10,
        borderRadius: 40,
    },
=======
    }
>>>>>>> features/firestore-setup
});
