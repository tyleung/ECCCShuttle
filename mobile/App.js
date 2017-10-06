import React from "react";
import { View, StyleSheet, Platform, StatusBar } from "react-native";
import LoginStackNav, { DrawerNav } from "./app/components/Navigation";
import UserApi from "./app/services/userApi";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      mainpage: null
    };
  }

  componentDidMount() {
    UserApi.isLoggedIn().then(res => {
      if (res) {
        this.setState({ isLoggedIn: res, mainpage: <DrawerNav /> });
      } else {
        this.setState({ isLoggedIn: res, mainpage: <LoginStackNav /> });
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.statusBar} />
        {this.state.mainpage}
      </View>
    );
  }
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5"
  },
  statusBar: {
    backgroundColor: "black",
    height: Platform.OS === "ios" ? 0 : StatusBar.currentHeight
  }
});
