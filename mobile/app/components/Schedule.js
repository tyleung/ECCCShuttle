import React, { Component } from "react";
import {
  Image,
  Linking,
  StyleSheet,
  Text,
  View,
  ToolbarAndroid,
  TouchableOpacity
} from "react-native";

import Navicon from "./../../assets/navicon.png";
import Timetable from "./../../assets/timetable.png";

export default class Schedule extends Component {
  // Name the drawerLabel for this page
  static navigationOptions = {
    drawerLabel: "Schedule"
  };

  onSchedulePress = () => {
    Linking.openURL(
      "https://docs.google.com/spreadsheets/d/1iwjPaej1k6bvxmqZ6uVUOJLP8x65YFzafIEy9K2gZrU/edit?usp=drivesdk"
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <ToolbarAndroid
          style={styles.toolbar}
          title="Schedule"
          titleColor="white"
          navIcon={Navicon}
          onIconClicked={() => this.props.navigation.navigate("DrawerOpen")}
        />
        <Image source={Timetable} style={styles.image} />
        <View style={styles.linkContainer}>
          <TouchableOpacity
            style={styles.linkButton}
            onPress={this.onSchedulePress}
          >
            <Text style={styles.text}>View full schedule</Text>
          </TouchableOpacity>
        </View>
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
  image: {
    flex: 0.5,
    justifyContent: "flex-start",
    margin: 10,
    width: null,
    height: null,
    resizeMode: "contain"
  },
  linkContainer: {
    flex: 0.5
  },
  linkButton: {
    paddingVertical: 7,
    paddingHorizontal: 10,
    borderRadius: 23,
    borderWidth: 1,
    alignSelf: "center"
  },
  text: {
    fontSize: 22,
    color: "black",
    textAlign: "center"
  }
});
