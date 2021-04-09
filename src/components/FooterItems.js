import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS} from '../utils/constants';

function FooterItems(props) {
  return (
    <View style={[styles.container, props.style]}>
      <TouchableOpacity onPress={() => { props.handleFooterBar('movies'); }} style={styles.btnWrapper}>
        <Icon name='movie' style={styles.icon} />
        <Text style={styles.btnText}>Movies</Text>
      </TouchableOpacity>
      <View style={styles.btnBuffer}></View>
      <TouchableOpacity onPress={() => { props.handleFooterBar('favorites'); }} style={styles.btnWrapper} >
        <Icon name='star' style={styles.icon} />
        <Text style={styles.btnText}>Favorites</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.lightCard,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 3,
    shadowOffset: {
      height: -2,
      width: 0
    },
    shadowColor: '#111',
    shadowOpacity: 0.2,
    shadowRadius: 1.2
  },
  btnBuffer: {
    borderColor: COLORS.darkBkg,
    borderWidth: .7,
    paddingTop: 8,
    width: .7,
    height: '80%'
  },
  btnWrapper: {
    width: '50%',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingTop: 8,
    paddingBottom: 6,
    minWidth: 80,
    maxWidth: 168,
    paddingHorizontal: 12
  },
  icon: {
    backgroundColor: 'transparent',
    color: '#fff',
    fontSize: 24,
    opacity: 0.8
  },
  btnText: {
    color: '#fff',
    opacity: 0.8,
    textAlign: 'center'
  }
});

export default FooterItems;
