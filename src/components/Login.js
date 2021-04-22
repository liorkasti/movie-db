import React, { useState } from "react";
import { StyleSheet, Image, Text, View, TouchableOpacity, Dimensions } from "react-native";
import auth from '@react-native-firebase/auth';
import { GoogleSignin, GoogleSigninButton, statusCodes, } from '@react-native-community/google-signin';
import database from '@react-native-firebase/firestore';

import useFetch from '../hooks/useFetch';
import { COLORS } from '../utils/constants';

const Login = (props) => {
    const [user, setUser] = useState('');
    const [loaded, setLoaded] = useState(false);
    const [favoriteList, setFavoriteList, fetchFavorites, favoritesHandler, popularMovies, popularResult, errorFetchMessage] = useFetch();

    const currentUser = auth().currentUser;

    function wait(timeout) {
        return new Promise(resolve => {
            setTimeout(resolve, timeout);
        });
    }

    GoogleSignin.configure({
        webClientId: '1081725631941-b4gol59tl4imc6kj8pf3vc351rhs1cs1.apps.googleusercontent.com',
        offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
    });

    const logoff = () => {
        auth()
            .signOut()
            .then(() => {
                fetchFavorites();
                setLoaded(false);
                console.log('User signed out!');
            });
    }

    onAuthStateChanged = (user) => {
        if (user) {
            // setUser(user)
            // setLoaded(!loaded)
            // , fetchFavorites()
            // wait(1000).then(() => (
            // setUser(user), fetchFavorites())
            // console.log('cur user uid: ', { user })
            // console.log('loaded status: ', loaded)
            // ))
        }
    }


    onGoogleButtonPress = async () => {
        try {
            const { idToken } = await GoogleSignin.signIn();
            const googleCredential = await auth.GoogleAuthProvider.credential(idToken);

            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn()

            if (userInfo) {
                console.log('User data: ', userInfo.user)
                try {
                    await database()
                        .collection('users')
                        .doc(userInfo.user.email)
                        .set({ favorites: favoriteList })
                        .then(
                            setUser(userInfo.user),
                            setLoaded(true)
                        )

                    console.log('User data: ', user)
                    console.log('loaded status: ', loaded)
                    console.log('User added!')

                } catch (e) { console.log("database update has failed!") }
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

    if (!loaded) {
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
            {props.componentIndex === 0 &&
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

export default Login;