import React from "react";
import { StyleSheet, View } from "react-native";

import FooterItems from "./FooterItems";

function FooterBar(props) {
  return (
    <View style={[styles.container, props.style]}>
      <FooterItems
        handleFooterBar={props.handleFooterBar}
        style={styles.footerContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  footerContainer: {
  }
});

export default FooterBar;