import React, { Component } from "react";
import { StyleSheet, Text, View, ToolbarAndroid } from "react-native";

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
        <Text style={styles.textSchedule}>9:15 am – 10:00 am</Text>
        <Text style={styles.textSchedule}>10:45 am – 11:30 am</Text>
        <Text style={styles.textSchedule}>12:30 pm – 1:15 pm</Text>
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
  },
  textSchedule: {
    fontSize: 22,
    padding: 10,
    color: "black",
    textAlign: "center"
  },
});
