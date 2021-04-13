import React, { useState, useEffect } from "react";
import { StyleSheet, Image, Text, View, TouchableOpacity, Dimensions } from "react-native";
import auth from '@react-native-firebase/auth';
import { GoogleSignin, GoogleSigninButton, statusCodes, } from '@react-native-community/google-signin';
import database from '@react-native-firebase/firestore';
import { ActivityIndicator } from 'react-native';

import { TMDB, COLORS } from '../utils/constants';

const Login = (props) => {

    const [user, setUser] = useState();


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
            .then(() => console.log('User signed out!'));
    }

    onAuthStateChanged = (user) => {
        wait(200).then(() => (
            setUser(user), fetchFavorites())
        );
    }


    onGoogleButtonPress = async () => {
        try {
            const { idToken } = await GoogleSignin.signIn();
            const googleCredential = auth.GoogleAuthProvider.credential(idToken);

            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            if (userInfo) {
                console.log("GOOGLE USER", userInfo.user);
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