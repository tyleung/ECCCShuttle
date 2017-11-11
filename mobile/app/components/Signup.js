import React, { Component } from "react";
import {
  Alert,
  StyleSheet,
  Image,
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import KeyboardAwareScrollViewCompat from "./KeyboardAwareScrollViewCompat";
// import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import UserApi from "../services/userApi";

import Logo from "./../../assets/logo.png";

export default class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      first_name: "",
      last_name: "",
      license_plate: ""
    };
  }

  signUpOnPress = () => {
    Keyboard.dismiss();
    if (
      !this.state.first_name ||
      !this.state.last_name ||
      !this.state.email ||
      !this.state.password ||
      !this.state.license_plate
    ) {
      Alert.alert("Sign Up", "Please fill in all fields");
      return;
    }

    const user = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      email: this.state.email,
      password: this.state.password,
      license_plate: this.state.license_plate
    };
    UserApi.signUp(user)
      .then(() => {
        Alert.alert(
          "Success!",
          "Thank you for being a shuttle member. You may now login."
        );
        this.props.navigation.goBack();
      })
      .catch(error => {
        Alert.alert("Sign up", error);
      });
  };

  render() {
    return (
      <KeyboardAwareScrollViewCompat
        contentContainerStyle={styles.container}
      >
        {/* Logo */}
        <Image source={Logo} style={styles.image} />
        <View style={styles.logoLine} />
        <Text style={styles.title}>
          <Text style={styles.ralewayLightItalic}>Park & Ride</Text>
          <Text style={styles.ralewayLight}>&nbsp;Reward Program</Text>
        </Text>
        <View style={styles.form}>
          {/* First name input field */}
          <View>
            <Text style={[styles.ralewayLight, styles.label]}>First Name</Text>
            <TextInput
              autoCapitalize="words"
              autoCorrect={false}
              keyboardType="default"
              multiline={false}
              onChangeText={text => this.setState({ first_name: text })}
              onSubmitEditing={() => this.lastNameInput.focus()}
              ref={input => {
                this.firstNameInput = input;
              }}
              returnKeyType="next"
              style={styles.textInput}
              underlineColorAndroid={"transparent"}
              value={this.state.first_name}
            />
          </View>

          {/* Last name input field */}
          <View>
            <Text style={[styles.ralewayLight, styles.label]}>Last Name</Text>
            <TextInput
              autoCapitalize="words"
              autoCorrect={false}
              keyboardType="default"
              multiline={false}
              onChangeText={text => this.setState({ last_name: text })}
              onSubmitEditing={() => this.emailInput.focus()}
              ref={input => {
                this.lastNameInput = input;
              }}
              returnKeyType="next"
              style={styles.textInput}
              underlineColorAndroid={"transparent"}
              value={this.state.last_name}
            />
          </View>

          {/* Email input field */}
          <View>
            <Text style={[styles.ralewayLight, styles.label]}>Email</Text>
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              onChangeText={text => this.setState({ email: text })}
              onSubmitEditing={() => this.passwordInput.focus()}
              multiline={false}
              ref={input => {
                this.emailInput = input;
              }}
              returnKeyType="next"
              style={styles.textInput}
              underlineColorAndroid={"transparent"}
              value={this.state.email}
            />
          </View>

          {/* Password input field */}
          <View>
            <Text style={[styles.ralewayLight, styles.label]}>Password</Text>
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="default"
              multiline={false}
              onChangeText={text => this.setState({ password: text })}
              onSubmitEditing={() => this.licensePlateInput.focus()}
              ref={input => {
                this.passwordInput = input;
              }}
              returnKeyType="next"
              secureTextEntry
              style={styles.textInput}
              underlineColorAndroid={"transparent"}
              value={this.state.password}
            />
          </View>

          {/* License plate input field */}
          <View>
            <Text style={[styles.ralewayLight, styles.label]}>
              License Plate
            </Text>
            <TextInput
              autoCapitalize="characters"
              autoCorrect={false}
              multiline={false}
              onChangeText={text => this.setState({ license_plate: text })}
              ref={input => {
                this.licensePlateInput = input;
              }}
              returnKeyType="go"
              style={styles.textInput}
              underlineColorAndroid={"transparent"}
              value={this.state.license_plate}
            />
          </View>

          {/* Signup and Login buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.c1}
              onPress={() => this.props.navigation.goBack()}
            >
              <Text style={styles.button}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.c2} onPress={this.signUpOnPress}>
              <Text style={styles.button}>Sign up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollViewCompat>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
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
  form: {
    marginTop: 25
  },
  label: {
    marginTop: 10,
    color: "white",
    fontSize: 15
  },
  textInput: {
    marginTop: 5,
    padding: 5,
    width: 280,
    height: 39.5,
    backgroundColor: "white",
    color: "black",
    // fontFamily: 'Raleway-Light',
    fontSize: 17,
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
