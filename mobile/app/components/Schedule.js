import React, { Component } from "react";
import { StyleSheet, View, ToolbarAndroid } from "react-native";

import Navicon from "./../../assets/navicon.png";

export default class Schedule extends Component {
  // Name the drawerLabel for this page
  static navigationOptions = {
    drawerLabel: "Schedule"
  };

  render() {
    return (
      <View style={styles.container}>
        <ToolbarAndroid
          style={styles.toolbar}
          title=" Schedule"
          titleColor="white"
          navIcon={Navicon}
          onIconClicked={() => this.props.navigation.navigate("DrawerOpen")}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5"
  },
  toolbar: {
    backgroundColor: "black",
    height: 56,
    alignSelf: "stretch"
  }
});
