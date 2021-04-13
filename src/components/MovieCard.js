import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { COLORS } from '../utils/constants';

const MovieCard = props => {

    return (
        <View style={styles.result}>
            <TouchableOpacity
                onPress={() => {
                    props.onSelectedMovie(props.itemData.item)
                }}
            >
                {props.itemData.item.stared ?
                    <Text style={styles.headingActive}>
                        {props.title && props.title}
                    </Text>
                    :
                    <Text style={styles.heading}>
                        {props.title && props.title}
                    </Text>
                }
                <Text style={styles.yearText}>
                    {props.year && props.year.substring(0, 7)}
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => {
                    props.onPressFavorite(props.itemData.item)
                }}
            >
                {props.itemData.item.stared ?
                    <Icon name='star' style={styles.iconActive} />
                    :
                    <Icon name='star' style={styles.icon} />
                }

            </TouchableOpacity>
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
        borderBottomWidth: .7,
    },
    headingActive: {
        width: windowWidth * .7,
        fontSize: 20,
        color: COLORS.favorite,
        fontSize: 20,
        fontWeight: '700',
        textAlign: 'left',
        paddingTop: 20,
    },
    heading: {
        width: windowWidth * .7,
        fontSize: 20,
        color: '#fff',
        fontSize: 20,
        fontWeight: '700',
        textAlign: 'left',
        paddingTop: 20,
    },
    yearText: {
        width: windowWidth * .7,
        fontSize: 20,
        color: '#fff',
        fontSize: 10,
        fontWeight: '300',
        textAlign: 'left',
        paddingTop: 5,
        paddingBottom: 20,
    },
    item: {
        flex: 1,
        alignSelf: 'stretch',
        alignItems: "center",
        justifyContent: 'center',
        margin: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee'
    },
    icon: {
        backgroundColor: 'transparent',
        color: '#fff',
        fontSize: 24,
        opacity: 0.8
    },
    iconActive: {
        backgroundColor: 'transparent',
        color: COLORS.favorite,
        fontSize: 24,
        opacity: 0.8
    },
});

export default MovieCard;