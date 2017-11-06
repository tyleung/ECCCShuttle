import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ToolbarAndroid,
  FlatList
} from "react-native";
import UserApi from "../services/userApi";

import Navicon from "./../../assets/navicon.png";

export default class RideHistory extends Component {
  // Name the drawerLabel for this page
  static navigationOptions = {
    drawerLabel: "  Ride History"
  };

  constructor() {
    super();
    this.state = {
      user: {},
      transactions: []
    };
  }

  componentDidMount() {
    UserApi.getStoredUser().then(user => {
      UserApi.getStoredUserTransactions().then(transactions => {
        this.setState({ user, transactions });
      });
    });
  }

  renderItem = ({ item }) => (
    <View>
      <TouchableOpacity style={styles.historyContainer}>
        <View style={{ flex: 1 }}>
          <Text style={[styles.ralewayLight, styles.historyText]}>
            {item.transaction_date}
          </Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={[styles.ralewayLight, styles.historyText]}>
            {item.points} {item.points > 1 ? "pts" : "pt"}
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
        <FlatList
          data={this.state.transactions}
          keyExtractor={item => item.id}
          renderItem={this.renderItem}
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
