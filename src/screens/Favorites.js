import React, { useEffect } from "react";
import { StyleSheet, View, Text, Dimensions } from "react-native";

import {COLORS} from '../utils/constants';
import ItemsList from '../components/ItemsList'

export default function Favorites(props) {

  useEffect(() => {
    
  }, [])

  const title = "My Favorites Movies";
  const emptyList = "Your List is Empty!";

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {props.favoriteList ?
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
        <Text style={styles.emptyList}>{emptyList}</Text>
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
    color: '#fff',
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
    color: '#fff',
    color: COLORS.movieLight,
    marginTop: '50%',
    // top: '50%',
    paddingHorizontal: 20,
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
  },
});