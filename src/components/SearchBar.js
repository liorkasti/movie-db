import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const SearchBar = ({ term, onTermChange, onTermSubmit }) => {
  return (
    <View style={styles.row}>

        {/* <Icon name="movie-search-outline" style={styles.searchBoxIcon} /> */}
      <TouchableOpacity onPress={onTermSubmit} style={styles.searchBtn}>
        <Icon name="movie-search-outline" style={styles.searchBoxIconBtn} />
      </TouchableOpacity>

      <TextInput
        style={styles.searchBox}
        placeholder="Enter a movie..."
        autoCapitalize="none"
        autoCorrect={false}
        value={term}
        onChangeText={onTermChange}
        onEndEditing={onTermSubmit}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    // width: '100%',
    // paddingVertical: 20,
    // paddingHorizontal: 10,
    //     justifyContent: 'center',
    // alignItems: 'center',
  },
  searchBox: {
    zIndex: 9,
    justifyContent: 'center',
    fontSize: 20,
    fontWeight: '300',
    padding: 20,
    width: '100%',
    height: 64,
    backgroundColor: '#fff',
    marginBottom: 30,
    borderRadius: 8,

  },
  searchBtn: {
    position: 'absolute',
    left: "87%",
    zIndex: 99,
    width: 60,
    height: 60,
    top: 14,
  },
  searchBoxIcon: {
    zIndex: 99,
    marginBottom: -46,
    left: "87%",
    color: '#a9a9a9',
    fontSize: 30,
  },
  searchBoxIconBtn: {
    zIndex: 99,
    color: '#a9a9a9',
    fontSize: 30,
  },
  iconStyle: {
    fontSize: 35,
    zIndex: 99,
    alignSelf: 'center',
    color: '#a9a9a9',
    marginHorizontal: 15
  }
});

export default SearchBar;