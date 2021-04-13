import React from "react";
import { StyleSheet, View, Dimensions, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { COLORS } from '../utils/constants';

const HeaderBar = (props) => {

  return (
    <View style={styles.container}>
      <Text style={styles.bsD1}>BS&quot;D</Text>
<<<<<<< HEAD
      <View style={styles.buttonstack}>
        {/* <TouchableOpacity onPress={() => {
          // TODO: Add an account menu with a user subscriptions options via Facebook, email and password, sms verifications and delete user option
          // props.onSelectMenu()
        }} > */}
          <Icon
            name="menu"
            style={styles.menuIcon}>
          </Icon>
        {/* </TouchableOpacity> */}
=======
      <View style={styles.buttonStack}>
        {/* TODO: Add an account menu with a user subscriptions options via Facebook, email and password, sms verifications and delete user option */}
        <Icon
          name="menu"
          style={styles.menuIcon}>
        </Icon>
>>>>>>> features/firestore-setup

        {props.componentIndex > 0 &&
          <>
            <TouchableOpacity onPress={() => {
              props.onBack()
            }} >
              <Icon
                name="chevron-left"
                style={styles.backIcon}>
              </Icon>
            </TouchableOpacity>
          </>
        }
      </View>
    </View >
  );
}

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
<<<<<<< HEAD
    width: windowWidth,
    height: 62,
  },
  buttonstack: {
=======
  },
  buttonStack: {
>>>>>>> features/firestore-setup
    flexDirection: 'row',
    width: windowWidth,
  },
  bsD1: {
    color: COLORS.lightCard,
    opacity: .75,
    fontSize: 10,
    fontFamily: "roboto-regular",
    alignSelf: "flex-end",
    marginTop: 10,
    marginRight: 18
  },
  menuIcon: {
    zIndex: 900,
<<<<<<< HEAD
    // justifyContent: 'flex-end',
=======
>>>>>>> features/firestore-setup
    color: COLORS.lightCard,
    fontSize: 35,
    width: 24,
    height: 30,
    top: 0,
<<<<<<< HEAD
    left: windowWidth*0.9
=======
    left: windowWidth * 0.9
>>>>>>> features/firestore-setup
  },
  backIcon: {
    zIndex: 900,
    color: COLORS.lightCard,
    fontSize: 35,
    // width: '100%',
    width: 24,
    height: 30,
    top: 0,
    right: 20
  },
});

export default HeaderBar;