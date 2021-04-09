import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Image, ScrollView, Dimensions } from "react-native";
import { COLORS } from '../utils/constants';

export default function Movie(props) {
  const [posterHight, setPosterHight] = useState();

  useEffect(() => {
  }, [])

  let posterPath = ''

  if (props.renderedMovie.poster) {
    posterPath = props.renderedMovie.poster
  } else {
    posterPath = props.renderedMovie.poster_path
  }

  Image.getSize(props.posterUrlBase + posterPath, (width, height) => {
    console.log(`The image dimensions are ${width}x${height}`);
    setPosterHight(height + 200);
    console.log('The image height: ', posterHight);
  }, (error) => {
    console.error(`Couldn't get the image size: ${error.message}`);
  });


  return (
    <View style={styles.container}>
      <ScrollView style={styles.results}>
        <View style={styles.result}>
          <Text style={styles.movieTitle}>
            {props.renderedMovie.title}
          </Text>
          <Image
            source={{ uri: props.posterUrlBase + posterPath }}
            style={styles.imagePoster, { height: posterHight }}
            resizeMode='cover'
          />
          <Text style={styles.ratingTitle}>Rating:</Text>
          <Text style={styles.rating}>{props.renderedMovie.rating || props.renderedMovie.vote_average} </Text>
          <Text style={styles.texTitle}>Summary:</Text>
          <Text style={styles.summaryText}>{props.renderedMovie.summary || props.renderedMovie.overview} </Text>
        </View >

      </ScrollView>
    </View >
  );
}

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: windowWidth * .8,
    paddingTop: 20,
  },
  movieTitle: {
    color: '#fff',
    marginBottom: 30,
    paddingHorizontal: 20,
    fontSize: 32,
    fontWeight: '700',
    textAlign: 'center',
  },
  ratingTitle: {
    textAlign: "justify",
    color: COLORS.movieLight,
    fontWeight: '700',
    fontSize: 22,
    marginTop: 20,
    marginBottom: 20,
  },
  rating: {
    textAlign: "justify",
    color: COLORS.movieLight,
    fontWeight: '700',
    fontSize: 32,
    marginBottom: 20,
    color: '#fff',
  },
  texTitle: {
    textAlign: "justify",
    fontWeight: '700',
    color: COLORS.movieLight,
    fontSize: 22,
    marginBottom: 10,
  },
  summaryText: {
    textAlign: "justify",
    fontWeight: '300',
    color: '#fff',
    fontSize: 14,
    marginBottom: 100,
  },
  imagePoster: {
    resizeMode: 'contain',
    width: '100%',
    // height: 360,    
  },
  results: {
    zIndex: 1,
  },
  result: {
    zIndex: 1,
    width: '100%',
    fontSize: 20,
  },
});