import React, { useEffect } from "react";
import { StyleSheet, View, Image, TouchableOpacity, Button } from "react-native";
import analytics from '@react-native-firebase/analytics';

export default function Welcome(props) {

  useEffect(() => {
  }, [])


  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/logo/moviedb-logo-white.png')}
        style={styles.logoImage}
      />
      <Button
        title="Add tracking"
        style={styles.analytics}
        onPress={async () =>
          await analytics().logEvent('genericevent', {
            // id: 3745092,
            item: 'it worked'
            
          })}
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