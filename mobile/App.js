import React from "react";
import { View, StyleSheet, Platform, StatusBar } from "react-native";
import LoginStackNav, { DrawerNav } from "./app/components/Navigation";
import UserApi from "./app/services/userApi";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false
    };
  }

  componentWillMount() {
    UserApi.isLoggedIn().then(res => this.setState({ isLoggedIn: res }));
  }

  render() {
    let mainpage;
    if (this.state.isLoggedIn) {
      mainpage = <DrawerNav />;
    } else {
      mainpage = <LoginStackNav />;
    }

    return (
      <View style={styles.container}>
        <View style={styles.statusBar} />
        {mainpage}
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
