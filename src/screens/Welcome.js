import React, { useEffect } from "react";
import { StyleSheet, View, Image } from "react-native";

export default function Welcome(props) {

  useEffect(() => {
  }, [])


  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/logo/moviedb-logo-white.png')}
        style={styles.logoImage}
      />
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    maxHeight: "98%",
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoImage: {
    flex: 1,
    resizeMode: 'contain',
    width: 300,
    maxHeight: 300,
    marginBottom: 40,
  },

});