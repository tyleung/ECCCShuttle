import React, { Component } from "react";
import { Text, StyleSheet, View, Platform } from "react-native";
import { DrawerItems, DrawerNavigator, StackNavigator } from "react-navigation";
import Storage from "../services/storage";

import Login from "./Login";
import Signup from "./Signup";
import Main from "./Main";
import RideHistory from "./RideHistory";
import About from "./About";
import Settings from "./Settings";
import BarcodeScanner from "./BarcodeScanner";
import EditName from "./EditName";
import EditLicensePlate from "./EditLicensePlate";

const MainPageStackNav = StackNavigator(
  {
    // Stack RouteConfigs
    MainScreen: {
      screen: Main,
      header: { visible: false }
    },
    ScannerScreen: {
      screen: BarcodeScanner,
      header: { visible: false }
    }
  },
  {
    // Stack configs
    initialRouteName: "MainScreen",
    mode: "card",
    headerMode: "none"
  }
);

const SettingsPageStackNav = StackNavigator(
  {
    // Stack RouteConfigs
    SettingsScreen: {
      screen: Settings,
      header: { visible: false }
    },
    EditNameScreen: {
      screen: EditName,
      header: { visible: true }
    },
    EditLicensePlateScreen: {
      screen: EditLicensePlate,
      header: { visible: false }
    }
  },
  {
    // Stack configs
    initialRouteName: "SettingsScreen",
    mode: "card",
    headerMode: "none"
  }
);

class DrawerContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    };
  }

  componentDidMount() {
    Storage.getStoredUser().then(user => this.setState({ user }));
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.profile}>
          <View style={styles.profileName}>
            <Text style={styles.text}>
              Hi, {this.state.user.first_name} {this.state.user.last_name}
            </Text>
          </View>
        </View>
        <DrawerItems {...this.props} />
      </View>
    );
  }
}

export const DrawerNav = DrawerNavigator(
  {
    // Drawer Route Configs
    MainScreen: {
      screen: MainPageStackNav
    },
    RideHistoryScreen: {
      screen: RideHistory
    },
    AboutScreen: {
      screen: About
    },
    SettingsScreen: {
      screen: SettingsPageStackNav
    },
    LoginScreen: {
      screen: Login
    }
  },
  {
    // Drawer configs
    initialRouteName: "MainScreen",
    drawerPosition: "left",
    drawerWidth: 320,
    contentComponent: DrawerContent,

    // Drawer stylings
    contentOptions: {
      activeTintColor: "black",
      style: {},
      labelStyle: {
        fontSize: 22,
        // fontFamily: 'Raleway-Light',
        fontWeight: "normal"
      }
    },
    navigationOptions: {
      drawerLockMode: "locked-open"
    }
  }
);

const LoginStackNav = StackNavigator(
  {
    // Stack RouteConfigs
    LoginScreen: {
      screen: Login,
      header: { visible: false }
    },
    SignupScreen: {
      screen: Signup,
      header: { visible: false }
    },
    MainScreen: {
      screen: DrawerNav
    }
  },
  {
    // Stack configs
    initialRouteName: "LoginScreen",
    mode: "card",
    headerMode: "none"
  }
);

export default LoginStackNav;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  profile: {
    borderBottomWidth: 2,
    marginBottom: 8,
    flexDirection: "row",
    marginTop: Platform.OS === "ios" ? 20 : 0
  },
  profileName: {
    flex: 1,
    justifyContent: "center",
    paddingVertical: 16,
    paddingLeft: 25
  },
  text: {
    // fontFamily: 'Raleway-Medium',
    fontSize: 22
  }
});
