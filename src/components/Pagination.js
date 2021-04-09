import React, { useState, useEffect } from "react";
import { View, Alert, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import Icon from "react-native-vector-icons/Feather";
import { COLORS } from '../utils/constants';

export default function Pagination(props) {

  return (
    <View style={styles.results}>
      <TouchableOpacity onPress={props.GoToPreviousPage}>
        <Icon name='chevrons-left' style={styles.icon} />
      </TouchableOpacity>

      <Text style={styles.pagesIndication}>
        {(props.indexPagination * 20 - 19) + '-' + (props.indexPagination * 20)}
      </Text>

      <TouchableOpacity onPress={props.GoToNextPage}>
        <Icon name='chevrons-right' style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  results: {
    flexDirection: 'row',
    width: "100%",
    justifyContent: 'space-between',
    paddingBottom: 20,
    height: 30,
    alignItems: 'center'
  },
  pagesIndication: {
    width: 'auto',
    height: 20,
    textAlign: 'center',
    borderColor: COLORS.lightCard,
    borderBottomWidth: .7,
    fontSize: 12,
    fontWeight: '300',
    color: '#fff'
  },
  icon: {
    backgroundColor: 'transparent',
    color: '#fff',
    fontSize: 20,
    opacity: 0.8
  },

});