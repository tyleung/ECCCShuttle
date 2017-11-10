/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react";
import { Text, StyleSheet, View, Image } from "react-native";
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

import ProfileBlack from "../../assets/profileBlack.png";

// https://reactnavigation.org/docs/navigators/stack
// A stack navigator that wraps inside of the drawer navigator
// Only for navigation between Main page and QR Scanner
const MainPageStackNav = StackNavigator(
  {
    // Stack RouteConfigs
    MainScreen: {
      screen: Main,
      // Hide header
      header: { visible: false }
    },
    ScannerScreen: {
      screen: BarcodeScanner,
      // Hide header
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

// https://reactnavigation.org/docs/navigators/stack
// A stack navigator that wraps inside of the drawer navigator
// Only for navigation between Settings, EditName and Edit license plate page
const SettingPageStackNav = StackNavigator(
  {
    // Stack RouteConfigs
    SettingsScreen: {
      screen: Settings,
      // Hide header
      header: { visible: false }
    },
    EditNameScreen: {
      screen: EditName,
      // Hide header
      header: { visible: false }
    },
    EditLicensePlateScreen: {
      screen: EditLicensePlate,
      // Hide header
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
          <View
            style={{ flex: 0.4, justifyContent: "center", paddingVertical: 16 }}
          >
            <Image source={ProfileBlack} style={styles.image} />
          </View>
          <View
            style={{ flex: 1, justifyContent: "center", paddingVertical: 16 }}
          >
            <Text style={styles.text}>
              {this.state.user.first_name} {this.state.user.last_name}
            </Text>
          </View>
        </View>
        <DrawerItems {...this.props} />
      </View>
    );
  }
}

// https://reactnavigation.org/docs/navigators/drawer
// A drawer navigation for Main, Ride History, About, Settings and Login page
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
      screen: SettingPageStackNav
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

    // Moew Drawer stylings
    contentComponent: DrawerContent
  }
);

const LoginStackNav = StackNavigator(
  {
    // Stack RouteConfigs
    Login: {
      screen: Login,
      // Hide header
      header: { visible: false }
    },
    Signup: {
      screen: Signup,
      // Hide header
      header: { visible: false }
    },
    MainScreen: {
      screen: DrawerNav
    }
  },
  {
    // Stack configs
    initialRouteName: "Login",
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
    flexDirection: "row"
  },
  text: {
    // fontFamily: 'Raleway-Medium',
    fontSize: 22
  },
  image: {
    resizeMode: "contain",
    width: 45,
    height: 45,
    marginLeft: 25
  }
});
