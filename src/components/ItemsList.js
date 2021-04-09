import React, { useEffect } from "react";
import { StyleSheet, View, SafeAreaView, FlatList, Dimensions } from "react-native";

import MovieCard from './MovieCard';
import FavoriteCard from './FavoriteCard';

const ItemsList = (props) => {

  useEffect(() => {
    // console.warn("------------------\n\nItemsList props.results: \n\n-------------------------", JSON.stringify(props.results) + '---------------------')
    if (props.favoriteList.length) {
      
    }

  }, [])

  return (
    <View style={styles.container}>
      <SafeAreaView>
        {/* --------------------- Movies View: --------------------- */}
        {props.componentIndex === 1 &&

          // TODO: Add react-native-pagination 
          <FlatList
            keyExtractor={(item, index) => item.id.toString()}
            data={props.results}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            renderItem={(itemData) => {
              return (
                <MovieCard
                  itemData={itemData}
                  id={itemData.item.id}
                  title={itemData.item.title}
                  poster={itemData.item.poster}
                  // year={itemData.item.year.str.substring(0, 4)}
                  year={itemData.item.year}
                  componentIndex={props.componentIndex}
                  renderedMovie={props.renderedMovie}
                  results={props.results}
                  setSelectedMovie={props.setSelectedMovie}
                  onSelectedMovie={props.onSelectedMovie}
                  onPressFavorite={props.onPressFavorite}
                  favoriteList={props.favoriteList}
                  posterUrlBase={props.posterUrlBase}
                />
              )
            }}
          />
        }
        {/* --------------------- Favorites View: --------------------- */}
        {props.componentIndex === 3 &&
          <FlatList
            keyExtractor={(item) => item.movie.id.toString()}
            data={props.favoriteList}
            showsVerticalScrollIndicator ={false}
            showsHorizontalScrollIndicator={false}
            renderItem={(itemData) => {
              return (
                <FavoriteCard
                  itemData={itemData.item}
                  id={itemData.item.movie.id}
                  title={itemData.item.movie.title}
                  poster={itemData.item.movie.poster}
                  year={itemData.item.year}
                  renderedMovie={props.renderedMovie}
                  componentIndex={props.componentIndex}
                  results={props.results}
                  onSelectedMovie={props.onSelectedMovie}
                  onPressFavorite={props.onPressFavorite}
                  favoriteList={props.favoriteList}
                  posterUrlBase={props.posterUrlBase}
                />
              )
            }}
          />
        }
      </SafeAreaView>
    </View >
  );
}


const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    maxHeight: "98%",
    zIndex: 10,
    alignContent: "center",
    justifyContent: 'center',
  },
  heading: {
    width: windowWidth * .7,
    fontSize: 20,
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'left',
    padding: 20,
  },
});

export default ItemsList;
