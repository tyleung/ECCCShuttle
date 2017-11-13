import React, { Component } from "react";
import {
  Alert,
  StyleSheet,
  Image,
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  BackHandler
} from "react-native";
import KeyboardAwareScrollViewCompat from "./KeyboardAwareScrollViewCompat";
import Storage from "../services/storage";
import UserApi from "../services/userApi";
import { API_TOKEN, USER } from "../utils/constants";

import Logo from "./../../assets/logo.png";

export default class Login extends Component {
  static navigationOptions = {
    drawerLabel: "Logout",
    drawerLockMode: "locked-closed",
    gesturesEnabled: false
  };

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      first_name: "",
      last_name: "",
      license_plate: ""
    };
    UserApi.logout();
  }

  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", () => {
      BackHandler.exitApp();
    });
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress");
  }

  loginOnPress = () => {
    Keyboard.dismiss();
    if (this.state.email && this.state.password) {
      UserApi.login(this.state.email, this.state.password)
        .then(async token => {
          await Storage.setItem(API_TOKEN, token);
          const user = await UserApi.getUser(token);
          await Storage.setItem(USER, JSON.stringify(user));
          const transactions = await UserApi.getUserTransactions(user.id);
          await Storage.mergeTransactionsToStorage(user.id, transactions);
          this.props.navigation.navigate("MainScreen");
        })
        .catch(error => {
          Alert.alert("Login", error);
        });
    } else {
      Alert.alert("Login", "Empty email or password.");
    }
  };

  render() {
    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <KeyboardAwareScrollViewCompat contentContainerStyle={styles.container}>
          {/* Logo */}
          <Image source={Logo} style={styles.image} />
          <View style={styles.logoLine} />
          <Text style={styles.title}>
            <Text style={styles.ralewayLightItalic}>Park & Ride</Text>
            <Text style={styles.ralewayLight}>&nbsp;Reward Program</Text>
          </Text>

          {/* Email input field */}
          <TextInput
            style={styles.emailInput}
            placeholder="Email address"
            keyboardType="email-address"
            multiline={false}
            autoCapitalize="none"
            autoCorrect={false}
            underlineColorAndroid={"transparent"}
            returnKeyType="next"
            onSubmitEditing={() => this.passwordInput.focus()}
            value={this.state.email}
            onChangeText={text => this.setState({ email: text })}
          />

          {/* Password input field */}
          <TextInput
            style={styles.PWInput}
            placeholder="Password"
            keyboardType="default"
            secureTextEntry
            multiline={false}
            autoCapitalize="none"
            autoCorrect={false}
            underlineColorAndroid={"transparent"}
            returnKeyType="go"
            onSubmitEditing={this.loginOnPress}
            ref={input => {
              this.passwordInput = input;
            }}
            value={this.state.password}
            onChangeText={text => this.setState({ password: text })}
          />

          {/* Signup and Login buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.c1}
              onPress={() => this.props.navigation.navigate("SignupScreen")}
            >
              <View>
                <Text style={styles.button}>Sign up</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.c2} onPress={this.loginOnPress}>
              <Text style={styles.button}>Login</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollViewCompat>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black"
  },
  image: {
    resizeMode: "contain",
    width: 280
  },
  logoLine: {
    marginTop: 2,
    width: 280,
    height: 0,
    borderBottomWidth: 1.5,
    borderColor: "white"
  },
  title: {
    marginTop: 2,
    color: "white",
    fontSize: 21
  },
  ralewayLightItalic: {
    // fontFamily: 'Raleway-LightItalic'
  },
  ralewayLight: {
    // fontFamily: 'Raleway-Light'
  },
  emailInput: {
    marginTop: 50,
    width: 280,
    height: 39.5,
    backgroundColor: "white",
    color: "black",
    // fontFamily: 'Raleway-Light',
    fontSize: 17,
    textAlign: "center",
    textAlignVertical: "center",
    borderRadius: 5
  },
  PWInput: {
    marginTop: 10,
    width: 280,
    height: 39.5,
    backgroundColor: "white",
    color: "black",
    // fontFamily: 'Raleway-Light',
    fontSize: 17,
    textAlign: "center",
    textAlignVertical: "center",
    borderRadius: 5
  },
  buttonContainer: {
    marginTop: 10,
    flexDirection: "row",
    width: 280,
    height: 39.5
  },
  c1: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 5,
    marginRight: 5,
    justifyContent: "center",
    alignItems: "center"
  },
  c2: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 5,
    marginLeft: 5,
    justifyContent: "center",
    alignItems: "center"
  },
  button: {
    borderRadius: 5,
    color: "black",
    // fontFamily: 'Raleway-Light',
    fontSize: 17
  }
});
