import React, { useState } from "react";
import { StyleSheet, View, Text, Image, SafeAreaView, Dimensions } from "react-native";

import useSearch from '../hooks/useSearch';
import SearchBar from '../components/SearchBar';
import { COLORS } from '../utils/constants';
import ItemsList from '../components/ItemsList'
import Pagination from '../components/Pagination';

export default function Movies(props) {

  const [term, setTerm] = useState();
  const [searchMovies, searchResults, errorSearchMessage] = useSearch();

  return (
    <View style={styles.container}>
      <Image
        //TODO: add this path to constance
        source={require('../assets/logo/moviedb-logo-long-white.png')}
        style={styles.longLogoImage}
      />

      <SafeAreaView>
        <SearchBar
          term={term}
          onTermChange={setTerm}
          onTermSubmit={() => searchMovies(term)}
        />

        {term && errorSearchMessage ?
          <Text style={styles.errorMessage}>{errorSearchMessage}</Text>
          :
          null
        }
      </SafeAreaView>

      {term ?
        <ItemsList
          componentIndex={props.componentIndex}
          favoriteList={props.favoriteList}
          results={searchResults}
          setRenderedMovie={props.setRenderedMovie}
          onSelectedMovie={props.onSelectedMovie}
          renderedMovie={props.renderedMovie}
          onPressFavorite={props.favoritesHandler}
          onPressFavorite={props.onPressFavorite}
          posterUrlBase={props.posterUrlBase}
        />
        :
        <>
          {props.errorFetchMessage ?
            <Text style={styles.errorMessage}>{props.errorFetchMessage}</Text>
            :
            <>
              <Pagination
                indexPagination={props.indexPagination}
                setIndexPagination={props.setIndexPagination}
                GoToNextPage={() => props.setIndexPagination((props.indexPagination) + 1)}
                GoToPreviousPage={() => props.setIndexPagination((props.indexPagination) - 1)}
              />

              <ItemsList
                componentIndex={props.componentIndex}
                favoriteList={props.favoriteList}
                results={props.popularResult}
                setRenderedMovie={props.setRenderedMovie}
                onSelectedMovie={props.onSelectedMovie}
                renderedMovie={props.renderedMovie}
                onPressFavorite={props.onPressFavorite}
                posterUrlBase={props.posterUrlBase}
              />
            </>
          }
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
    maxHeight: (windowHeight * .9) - 40,
    paddingTop: 20,
    justifyContent: 'center',
  },
  longLogoImage: {
    flex: 1,
    alignItems: 'center',
    resizeMode: 'contain',
    width: windowWidth * .8,
    maxHeight: 80,
    marginBottom: 40,
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
  searchBoxIcon: {
    zIndex: 9,
    marginBottom: -40,
    top: -87,
    left: "87%",
    color: '#a9a9a9',
    fontSize: 24,
  },
  errorMessage: {
    color: COLORS.remove,
    fontSize: 18,
    // marginTop: 10,
    marginBottom: 10,
  }
});


// export default Movies;