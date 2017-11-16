import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  Platform,
  TouchableNativeFeedback
} from "react-native";
import {
  DrawerItems,
  DrawerNavigator,
  StackNavigator,
  NavigationActions
} from "react-navigation";
import { MaterialIcons } from "@expo/vector-icons";
import Storage from "../services/storage";

import Login from "./Login";
import Signup from "./Signup";
import Main from "./Main";
import RideHistory from "./RideHistory";
import Schedule from "./Schedule";
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
    },
    LoginScreen: {
      screen: Login
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
    },
    LoginScreen: {
      screen: Login
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
      <View style={styles.drawer}>
        <View style={styles.drawerItemsTop}>
          <View style={styles.profile}>
            <Text style={styles.drawerText}>
              Hi, {this.state.user.first_name} {this.state.user.last_name}
            </Text>
          </View>
          <DrawerItems {...this.props} />
        </View>
        <TouchableNativeFeedback
          background={TouchableNativeFeedback.Ripple(
            "rgba(0, 0, 0, .32)",
            false
          )}
          onPress={() => {
            const resetAction = NavigationActions.reset({
              index: 0,
              actions: [
                NavigationActions.navigate({ routeName: "LoginScreen" })
              ],
              key: null
            });
            this.props.navigation.dispatch(resetAction);
          }}
        >
          <View style={styles.footer}>
            <Text style={styles.drawerText}>Logout</Text>
            <MaterialIcons name="exit-to-app" size={22} />
          </View>
        </TouchableNativeFeedback>
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
    ScheduleScreen: {
      screen: Schedule
    },
    SettingsScreen: {
      screen: SettingsPageStackNav
    }
  },
  {
    // Drawer configs
    initialRouteName: "MainScreen",
    drawerPosition: "left",
    drawerWidth: 300,
    contentComponent: DrawerContent,

    // Drawer stylings
    contentOptions: {
      activeTintColor: "black",
      style: {},
      itemStyle: {},
      labelStyle: {
        paddingHorizontal: 10,
        fontSize: 22,
        // fontFamily: 'Raleway-Light',
        fontWeight: "normal"
      }
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
  drawer: {
    flex: 1,
    justifyContent: "space-between"
  },
  drawerItemsTop: {
    flex: 1
  },
  drawerText: {
    fontSize: 22,
    padding: 7
  },
  profile: {
    flexDirection: "row",
    marginTop: Platform.OS === "ios" ? 20 : 0,
    marginBottom: 8,
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 2
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 8
  }
});
