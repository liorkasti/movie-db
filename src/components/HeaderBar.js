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
      <View style={styles.headerStack}>
        <Text style={styles.bsD1}>BS&quot;D</Text>
        <View style={styles.buttonstack}>

          {props.componentIndex > 0 ?
            <>
              <TouchableOpacity onPress={() => {
                props.onBack()
              }} >
                <Icon name="chevron-left" style={styles.backIcon} />
              </TouchableOpacity>

              <View style={styles.createButtonRow}>

              </View>
            </>
            :
            //TODO: Add an account menu with a user subscriptions options via Facebook, email and password, sms verifications and delete user option
            <>
              <Icon name="menu" style={styles.backIcon} />
            </>
          }
        </View>
      </View>
    </View >
  );
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    width: windowWidth,
  },
  homeContainer: {
    height: 62,
  },
  headerStack: {
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
  backIcon: {
    zIndex: 900,
    color: COLORS.lightCard,
    fontSize: 35,
    // width: '100%',
    width: 24,
    height: 30,
    top: 0,
    left: 4
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