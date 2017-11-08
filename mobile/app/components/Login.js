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
  KeyboardAvoidingView,
  View,
  BackHandler
} from "react-native";
import Modal from "react-native-modal";
import Storage from "../services/storage";
import UserApi from "../services/userApi";
import { API_TOKEN, USER } from "../utils/constants";

import Logo from "./../../assets/logo.png";

export default class Login extends Component {
  // Name the drawerLabel for this page
  static navigationOptions = {
    drawerLabel: "  Logout"
  };

  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
      email: "",
      password: "",
      emailSignUp: "",
      passwordSignUp: "",
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

  // Modal's show and hide methods
  showModal = () => this.setState({ isModalVisible: true });
  hideModal = () => this.setState({ isModalVisible: false });

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
      Alert.alert("Login", "Empty email or password");
    }
  };

  signUpOnPress = () => {
    Keyboard.dismiss();
    if (
      !this.state.first_name ||
      !this.state.last_name ||
      !this.state.emailSignUp ||
      !this.state.passwordSignUp ||
      !this.state.license_plate
    ) {
      Alert.alert("Sign Up", "Please fill in all fields");
      return;
    }

    const user = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      email: this.state.emailSignUp,
      password: this.state.password,
      license_plate: this.state.license_plate
    };
    UserApi.signUp(user).then(this.hideModal());
  };

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
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
          blurOnSubmit={false}
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
          <TouchableOpacity style={styles.c1} onPress={this.showModal}>
            <View>
            <Text style={styles.button}>Sign up</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.c2} onPress={this.loginOnPress}>
            <Text style={styles.button}>Login</Text>
          </TouchableOpacity>
        </View>

        {/* Modal for signup page */}
        <Modal isVisible={this.state.isModalVisible}>
          <TouchableOpacity
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row"
            }}
            activeOpacity={1}
            onPress={this.hideModal}
          >
            <TouchableWithoutFeedback>
              <View style={styles.signUpContainer}>
                <Text
                  style={[styles.ralewayLight, { fontSize: 25, margin: 28 }]}
                >
                  Sign up
                </Text>

                {/* First name input field */}
                <Text
                  style={[
                    styles.ralewayLight,
                    { fontSize: 18, paddingLeft: 28 }
                  ]}
                >
                  First name:
                </Text>
                <TextInput
                  style={styles.signUpInput}
                  multiline={false}
                  autoCapitalize="words"
                  autoCorrect={false}
                  blurOnSubmit={false}
                  returnKeyType="next"
                  underlineColorAndroid={"black"}
                  onSubmitEditing={() => this.signUpLastNameInput.focus()}
                  ref={input => {
                    this.signUpFirstNameInput = input;
                  }}
                  value={this.state.first_name}
                  onChangeText={text => this.setState({ first_name: text })}
                />

                {/* Last name input field */}
                <Text
                  style={[
                    styles.ralewayLight,
                    { fontSize: 18, paddingLeft: 28 }
                  ]}
                >
                  Last name:
                </Text>
                <TextInput
                  style={styles.signUpInput}
                  multiline={false}
                  autoCapitalize="words"
                  autoCorrect={false}
                  blurOnSubmit={false}
                  returnKeyType="next"
                  underlineColorAndroid={"black"}
                  onSubmitEditing={() => this.signUpEmailInput.focus()}
                  ref={input => {
                    this.signUpLastNameInput = input;
                  }}
                  value={this.state.last_name}
                  onChangeText={text => this.setState({ last_name: text })}
                />

                {/* Email input field */}
                <Text
                  style={[
                    styles.ralewayLight,
                    { fontSize: 18, paddingLeft: 28 }
                  ]}
                >
                  Email:
                </Text>
                <TextInput
                  style={styles.signUpInput}
                  keyboardType="email-address"
                  multiline={false}
                  autoCapitalize="none"
                  autoCorrect={false}
                  blurOnSubmit={false}
                  returnKeyType="next"
                  underlineColorAndroid={"black"}
                  onSubmitEditing={() => this.signUpPasswordInput.focus()}
                  ref={input => {
                    this.signUpEmailInput = input;
                  }}
                  value={this.state.emailSignUp}
                  onChangeText={text => this.setState({ emailSignUp: text })}
                />

                {/* Password input field */}
                <Text
                  style={[
                    styles.ralewayLight,
                    { fontSize: 18, paddingLeft: 28 }
                  ]}
                >
                  Password:
                </Text>
                <TextInput
                  style={styles.signUpInput}
                  keyboardType="default"
                  secureTextEntry
                  multiline={false}
                  autoCapitalize="none"
                  autoCorrect={false}
                  blurOnSubmit={false}
                  returnKeyType="next"
                  underlineColorAndroid={"black"}
                  onSubmitEditing={() => this.signUpLicensePlateInput.focus()}
                  ref={input => {
                    this.signUpPasswordInput = input;
                  }}
                  value={this.state.passwordSignUp}
                  onChangeText={text => this.setState({ passwordSignUp: text })}
                />

                {/* License plate input field */}
                <Text
                  style={[
                    styles.ralewayLight,
                    { fontSize: 18, paddingLeft: 28 }
                  ]}
                >
                  License plate:
                </Text>
                <TextInput
                  style={styles.signUpInput}
                  multiline={false}
                  autoCapitalize="characters"
                  autoCorrect={false}
                  returnKeyType="go"
                  underlineColorAndroid={"black"}
                  ref={input => {
                    this.signUpLicensePlateInput = input;
                  }}
                  value={this.state.license_plate}
                  onChangeText={text => this.setState({ license_plate: text })}
                />

                {/* Cancel and Sign Up account buttons */}
                <View style={styles.signUpPageButtonsContainer}>
                  <TouchableOpacity
                    style={{ paddingRight: 20 }}
                    onPress={this.hideModal}
                  >
                    <Text style={styles.buttonForSignUpPage}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={this.signUpOnPress}>
                    <Text style={styles.buttonForSignUpPage}>Sign up</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </TouchableOpacity>
        </Modal>
      </KeyboardAvoidingView>
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
    justifyContent: 'center',
    alignItems: 'center'
  },
  c2: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 5,
    marginLeft: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    borderRadius: 5,
    color: "black",
    // fontFamily: 'Raleway-Light',
    fontSize: 17
  },
  signUpContainer: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 5,
    marginHorizontal: 5
  },
  signUpInput: {
    marginVertical: 5,
    borderBottomWidth: 1,
    color: "black",
    // fontFamily: 'Raleway-Light',
    marginHorizontal: 28,
    textAlign: "center",
    fontSize: 17
  },
  signUpPageButtonsContainer: {
    padding: 28,
    flexDirection: "row",
    justifyContent: "flex-end"
  },
  buttonForSignUpPage: {
    color: "black",
    // fontFamily: 'Raleway-Light',
    fontSize: 17
  }
});
