import React from "react";
import { View, StyleSheet, Platform, StatusBar } from "react-native";
import LoginStackNav from "./app/components/Navigation";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false
    };
  }

  // TODO: handle login page here
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.statusBar} />
        <LoginStackNav />
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
