import React, { useState, useEffect } from "react";
import { StyleSheet, View, Dimensions, Text, TouchableOpacity, Image, } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { COLORS } from '../utils/constants';

const HeaderBar = (props) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {

    if (open) props.setShowMenu(false)
  }, [props.componentIndex]);

  return (
    <View style={styles.container}>
      <Text style={styles.bsD1}>BS&quot;D</Text>
      <View style={styles.buttonstack}>
        <TouchableOpacity onPress={() => {
          // TODO: Add an account menu with a user subscriptions options via Facebook, email and password, sms verifications and delete user option
          // props.onSelectMenu()
        }} >
          <Icon
            name="menu"
            style={styles.menuIcon}>
          </Icon>
        </TouchableOpacity>

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
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    width: windowWidth,
    height: 62,
  },
  buttonstack: {
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
  icon: {
    color: COLORS.movieGreen,
    fontSize: 28,
  },
  menuIcon: {
    zIndex: 900,
    // justifyContent: 'flex-end',
    color: COLORS.lightCard,
    fontSize: 35,
    width: 24,
    height: 30,
    top: 0,
    left: windowWidth*0.9
  },
  backIcon: {
    zIndex: 900,
    color: COLORS.lightCard,
    fontSize: 35,
    width: "100%",
    height: 30,
    top: 0,
    right: 20
  },
  header: {
    position: "absolute",
    width: '100%',
    color: "#4287f5",
    color: COLORS.movieGreen,
    fontSize: 20,
    fontFamily: "roboto-regular",
    textAlign: "center",
  }
});

export default HeaderBar;