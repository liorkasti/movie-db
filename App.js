import React, { useEffect } from 'react';
import { StyleSheet, View, StatusBar, YellowBox } from 'react-native';
import { NativeRouter, Route, Switch } from "react-router-native";
import Orientation from 'react-native-orientation-locker';

import {COLORS} from './src/utils/constants';
import NativeIndex from "./src/router";

export default function App() {

  useEffect(() => {
    
    setTimeout(() => {
      Orientation.lockToPortrait();
    });

    return onOpenIndex();
  }, []);

  const onOpenIndex = () => {
    console.disableYellowBox = true;
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.movieDark} animated={true} hidden={false}></StatusBar>
      <NativeRouter>
        <Switch>
          <Route exact path="/" component={NativeIndex} />
        </Switch>
      </NativeRouter>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: COLORS.movieDark
  },
});