import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ToolbarAndroid,
  FlatList
} from "react-native";
import moment from "moment";
import Storage from "../services/storage";

import Navicon from "./../../assets/navicon.png";

export default class RideHistory extends Component {
  // Name the drawerLabel for this page
  static navigationOptions = {
    drawerLabel: "Ride History"
  };

  constructor() {
    super();
    this.state = {
      user: {},
      transactions: []
    };
  }

  componentDidMount() {
    Storage.getStoredUser().then(user => {
      Storage.getStoredUserTransactions().then(transactions => {
        this.setState({ user, transactions });
      });
    });
  }

  renderItem = ({ item }) => (
    <View>
      <TouchableOpacity style={styles.historyContainer}>
        <View style={{ flex: 1 }}>
          <Text style={item.id ? styles.historyText : styles.unsyncedText}>
            {item.id
              ? moment(item.transaction_date).format("MMM Do YYYY, h:mm:ss a")
              : moment
                  .unix(item.transaction_date)
                  .format("MMM Do YYYY, h:mm:ss a")}
          </Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={item.id ? styles.historyText : styles.unsyncedText}>
            {item.id
              ? `${item.points} ${item.points === 1 ? "pt" : "pts"}`
              : "—"}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );

  renderEmptyItem = () => (
    <View>
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No Ride History!</Text>
      </View>
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
        {this.state.transactions.length > 0 ? (
          <FlatList
            data={this.state.transactions}
            keyExtractor={item => item.id + item.transaction_date}
            renderItem={this.renderItem}
          />
        ) : (
          <FlatList data={[{ key: 0 }]} renderItem={this.renderEmptyItem} />
        )}
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
  unsyncedText: {
    fontStyle: "italic",
    textAlign: "center",
    fontSize: 22,
    color: "dimgray",
    paddingVertical: 17
  },
  emptyContainer: {
    flex: 1
  },
  emptyText: {
    fontStyle: "italic",
    textAlign: "center",
    fontSize: 17,
    color: "dimgray",
    paddingVertical: 17
  },
  toolbar: {
    backgroundColor: "black",
    height: 56,
    alignSelf: "stretch"
  }
});
