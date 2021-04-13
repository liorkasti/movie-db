import React from "react";
import { StyleSheet, View, Image, TouchableOpacity, Button } from "react-native";

export default function Welcome(props) {

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
  analytics: {
    flex: 1,
    width: 200,
    maxHeight: 40,
    marginBottom: 200,
  }
});