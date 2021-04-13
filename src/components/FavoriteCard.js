import React, { useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image } from 'react-native';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { COLORS } from '../utils/constants';

const FavoriteCard = props => {

    useEffect(() => {
    }, []);

    return (
        <View style={styles.result}>
            <TouchableOpacity
                style={styles.cardContainer}
                onPress={() => {
                    props.onSelectedMovie(props.itemData.movie)
                }}
            >
                <Image
                    source={{ uri: props.posterUrlBase + props.poster }}
                    style={styles.imagePoster}
                    resizeMode='cover'
                />
                <Text style={styles.heading}>
                    {props.title}
                </Text>
            </TouchableOpacity>
            {/* <TouchableOpacity
                style={styles.removeContainer}
                onPress={() => { props.onPressFavorite(props.itemData) }}
            >
                <Text style={styles.removeText}>REMOVE </Text>
                <Icon name='star' style={styles.iconActive} />

            </TouchableOpacity> */}
        </View >
    );
};

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: windowWidth * .8,
        maxHeight: windowHeight * .9,
        paddingTop: 70,
    },
    results: {
        zIndex: 1,
    },
    result: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        zIndex: 1,
        width: '100%',
        borderColor: COLORS.lightCard,
        borderTopWidth: .7,
        marginBottom: 20,
        paddingBottom: 40,
    },
    cardContainer: {
        width: '100%',
        backgroundColor: COLORS.movieGreen,
        alignContent: 'center',
    },
    heading: {
        backgroundColor: COLORS.lightCard,
        color: '#fff',
        fontSize: 20,
        paddingVertical: 15,
        fontWeight: '700',
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
    imagePoster: {
        width: '100%',
        height: 300,
        height: 320,
    },
    item: {
        alignSelf: 'stretch',
        alignItems: "center",
        justifyContent: 'center',
        margin: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee'
    },
    removeContainer: {
        position: "absolute",
        top: 0,
        right: 0,
        flexDirection: 'row',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        zIndex: 1,
        padding: 5,
        paddingHorizontal: 10,
        margin: 10,
        backgroundColor: COLORS.movieDark,
        // backgroundColor: COLORS.lightCard,
        borderColor: COLORS.lightCard,
        borderRadius: 20,
        borderWidth: 1.7,
    },
    removeText: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'transparent',
        color: COLORS.favorite,
        fontSize: 10,
        opacity: 0.8
    },
    icon: {
        backgroundColor: 'transparent',
        color: '#fff',
        fontSize: 18,
        opacity: 0.8
    },
    iconActive: {
        backgroundColor: 'transparent',
        color: COLORS.favorite,
        fontSize: 18,
        opacity: 0.8
    },
});

export default FavoriteCard;