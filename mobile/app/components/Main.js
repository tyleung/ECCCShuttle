import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  BackHandler,
  Alert
} from "react-native";
import Storage from "../services/storage";
import Helpers from "../utils/helpers";

import Header from "./common/Header";
import QRIcon from "./../../assets/qricon.png";
import Refresh from "./../../assets/refresh.png";

export default class Main extends Component {
  static navigationOptions = {
    drawerLabel: "QR Scanner"
  };

  constructor() {
    super();
    this.state = {
      user: {},
      isSynced: false,
      isLoading: false
    };
  }

  async componentDidMount() {
    this.setState({ isLoading: true });
    BackHandler.addEventListener("hardwareBackPress", () => {
      BackHandler.exitApp();
    });

    const user = await Storage.getStoredUser();
    const isSynced = await Helpers.isSynced();
    this.setState({ user, isSynced, isLoading: false });
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress");
  }

  refresh = () => {
    this.setState({ isLoading: true });
    Helpers.isNetworkConnected().then(async isConnected => {
      if (!isConnected) {
        Alert.alert(
          "No Internet",
          "Please connect to the internet to refresh."
        );
        return;
      }

      const isSynced = await Helpers.isSynced();
      if (!isSynced) {
        await Storage.mergeTransactionsToStorage(this.state.user.id);
        Storage.getStoredUser().then(user => {
          this.setState({ user });
        });
      }

      this.setState({ isLoading: false, isSynced: true });
      Alert.alert("Refresh", "Refresh complete.");
    });
  };

  renderSyncMessage = () => {
    if (!this.state.isLoading) {
      if (this.state.isSynced) {
        return <Text style={styles.textSynced}>Up to date!</Text>;
      } else {
        return (
          <Text style={styles.textUnsynced}>Unsynced. Refresh to update.</Text>
        );
      }
    }

    return <Text style={styles.textSynced}>&nbsp;</Text>;
  };

  render() {
    return (
      <View style={styles.container}>
        <Header
          label=""
          page="main"
          onPress={() => this.props.navigation.navigate("DrawerOpen")}
        />

        {/* A button that navigates to QRScanner */}
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => this.props.navigation.navigate("ScannerScreen")}
        >
          <View style={{ flex: 1 }}>
            <Text style={styles.QRButtonText}>Scan QR Code</Text>
          </View>
          <View
            style={{
              flex: 1,
              alignItems: "flex-end",
              marginRight: 15,
              justifyContent: "center"
            }}
          >
            <Image source={QRIcon} style={styles.image} />
          </View>
        </TouchableOpacity>

        {/* Points */}
        <Text style={styles.pointText}>
          You have {this.state.user.current_points}{" "}
          {this.state.user.current_points === 1 ? "point" : "points"}!
        </Text>

        {/* Update timer */}
        {this.renderSyncMessage()}

        {/* Refresh button */}
        <TouchableOpacity
          style={styles.refresh}
          onPress={this.refresh}
          disabled={this.state.isLoading}
        >
          <View
            style={{
              flex: 0.25,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Image source={Refresh} style={styles.refreshImage} />
          </View>
          <View style={{ flex: 0.65 }}>
            <Text style={styles.refreshButtonText}>Refresh</Text>
          </View>
          <View style={{ flex: 0.25 }} />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5"
  },
  buttonContainer: {
    marginTop: 200,
    flexDirection: "row",
    backgroundColor: "white",
    borderColor: "#223E4A",
    borderTopWidth: 1,
    borderBottomWidth: 1
  },
  QRButtonText: {
    fontSize: 22,
    color: "black",
    paddingLeft: 21,
    paddingVertical: 17
  },
  image: {
    resizeMode: "contain",
    width: 30,
    height: 30
  },
  pointText: {
    marginTop: 46,
    fontSize: 22,
    color: "black",
    textAlign: "center"
  },
  textSynced: {
    marginTop: 8,
    fontSize: 15,
    color: "green",
    textAlign: "center"
  },
  textUnsynced: {
    marginTop: 8,
    fontSize: 15,
    color: "red",
    textAlign: "center"
  },
  refresh: {
    flexDirection: "row",
    marginTop: 15,
    marginHorizontal: 105,
    borderRadius: 23,
    borderWidth: 1,
    paddingVertical: 7
  },
  refreshButtonText: {
    textAlign: "center",
    fontSize: 22,
    color: "black"
  },
  refreshImage: {
    resizeMode: "contain",
    width: 30,
    height: 30
  }
});
