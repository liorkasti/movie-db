import React from "react";
import { StyleSheet, View, Text, Dimensions } from "react-native";

import { COLORS } from '../utils/constants';
import ItemsList from '../components/ItemsList'

export default function Favorites(props) {


  const title = "Favorite Movies";
  const emptyList = "Your List is Empty!";
  const instructions = "Please select a movie from the list by pressing on the star.";

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {props.favoriteList.length ?
        <ItemsList
          componentIndex={props.componentIndex}
          favoriteList={props.favoriteList}
          popularMovies={props.popularMovies}
          onSelectedMovie={props.onSelectedMovie}
          onPressFavorite={props.onPressFavorite}
          posterUrlBase={props.posterUrlBase}
          renderedMovie={props.renderedMovie}
          style={styles.results}
        />
        :
        <>
          <Text style={styles.emptyList}>{emptyList}</Text>
          <Text style={styles.instructions}>{instructions}</Text>
        </>
      }

    </View >
  );
}


const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: windowWidth * .8,
    maxHeight: windowHeight * .9,
    paddingTop: 20,
  },
  title: {
    color: COLORS.favorite,
    marginBottom: 70,
    paddingHorizontal: 20,
    fontSize: 32,
    fontWeight: '700',
    textAlign: 'center',
  },
  searchBox: {
    fontSize: 20,
    fontWeight: '300',
    padding: 20,
    width: '100%',
    backgroundColor: '#fff',
    marginBottom: 40,
    borderRadius: 8,
  },
  emptyList: {
    color: COLORS.movieGreen,
    marginTop: '50%',
    // top: '50%',
    paddingHorizontal: 20,
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
  },
  instructions: {
    color: COLORS.movieLight,
    marginTop: 10,
    // top: '50%',
    paddingHorizontal: 20,
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
});