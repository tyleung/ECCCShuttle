import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ToolbarAndroid,
  ListView
} from "react-native";

import Navicon from "./../../assets/navicon.png";

// ListView stuff, some kind of comparing object
const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

export default class RideHistory extends Component {
  // Name the drawerLabel for this page
  static navigationOptions = {
    drawerLabel: "  Ride History"
  };

  // A constructor for the ListView
  constructor() {
    super();
    this.state = {
      // Data source for the ListView
      dataSource: ds.cloneWithRows([
        {
          date: "May 7, 2017",
          point: "50"
        },
        {
          date: "Apr 23, 2017",
          point: "50"
        }
      ])
    };
  }

  // A method for rending the styling of each row in the ListView
  renderRow = rowData => (
    <View>
      <TouchableOpacity style={styles.historyContainer}>
        <View style={{ flex: 1 }}>
          <Text style={[styles.ralewayLight, styles.historyText]}>
            {rowData.date}
          </Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={[styles.ralewayLight, styles.historyText]}>
            {rowData.point} pts
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );

  render() {
    return (
      <View style={styles.container}>
        <ToolbarAndroid
          style={styles.toolbar}
          title=" Ride History"
          titleColor="white"
          navIcon={Navicon}
          onIconClicked={() => this.props.navigation.navigate("DrawerOpen")}
        />
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
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
  historyContainer: {
    flexDirection: "row",
    backgroundColor: "white",
    borderColor: "#223E4A",
    borderBottomWidth: 1
  },
  historyText: {
    textAlign: "center",
    fontSize: 22,
    color: "black",
    paddingVertical: 17
  },
  ralewayLight: {
    // fontFamily: 'Raleway-Light'
  },
  toolbar: {
    backgroundColor: "black",
    height: 56,
    alignSelf: "stretch"
  }
});
