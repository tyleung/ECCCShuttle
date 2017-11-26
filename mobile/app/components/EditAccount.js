import React, { Component } from "react";
import {
  Alert,
  StyleSheet,
  View,
  Text,
  TextInput,
  ToolbarAndroid,
  TouchableOpacity
} from "react-native";
import { NavigationActions } from "react-navigation";
import Storage from "../services/storage";
import UserApi from "../services/userApi";
import { USER } from "../utils/constants";
import KeyboardAwareScrollViewCompat from "./common/KeyboardAwareScrollViewCompat";

import Navicon from "./../../assets/navicon.png";

export default class EditAccount extends Component {
  constructor() {
    super();
    this.state = {
      user: {},
      password: ""
    };
  }

  componentDidMount() {
    Storage.getStoredUser().then(user => {
      this.setState({ user });
    });
  }

  onChangeText = (name, text) => {
    const user = {
      ...this.state.user,
      [name]: text
    };

    this.setState({ user });
  };

  editEmail = () => {
    Alert.alert("Edit Account", "Email can't be edited.");
  };

  save = async () => {
    const user = {
      ...this.state.user,
      password: this.state.password
    };
    const savedUser = await UserApi.saveUser(user);
    await Storage.setItem(USER, JSON.stringify(savedUser));
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: "AccountScreen" })]
    });
    this.props.navigation.dispatch(resetAction);
  };

  render() {
    return (
      <KeyboardAwareScrollViewCompat contentContainerStyle={styles.container}>
        <ToolbarAndroid
          style={styles.toolbar}
          title="Edit Account"
          titleColor="white"
          navIcon={Navicon}
          onIconClicked={() => this.props.navigation.navigate("DrawerOpen")}
        />

        <View style={styles.fields}>
          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>First Name</Text>
            <TextInput
              autoCapitalize="words"
              autoCorrect={false}
              keyboardType="default"
              multiline={false}
              onChangeText={text => this.onChangeText("first_name", text)}
              style={styles.textInput}
              underlineColorAndroid={"transparent"}
              value={this.state.user.first_name}
            />
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>Last Name</Text>
            <TextInput
              autoCapitalize="words"
              autoCorrect={false}
              keyboardType="default"
              multiline={false}
              onChangeText={text => this.onChangeText("last_name", text)}
              style={styles.textInput}
              underlineColorAndroid={"transparent"}
              value={this.state.user.last_name}
            />
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>Email</Text>
            <TouchableOpacity onPress={this.editEmail}>
              <Text style={[styles.fieldText, { color: "#888" }]}>
                {this.state.user.email}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>
              New Password (Leave blank if unchanged)
            </Text>
            <TextInput
              onChangeText={text => this.setState({ password: text })}
              secureTextEntry
              style={styles.textInput}
              underlineColorAndroid={"transparent"}
              value={this.state.password}
            />
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>License Plate</Text>
            <TextInput
              autoCapitalize="words"
              autoCorrect={false}
              keyboardType="default"
              multiline={false}
              onChangeText={text => this.onChangeText("license_plate", text)}
              style={styles.textInput}
              underlineColorAndroid={"transparent"}
              value={this.state.user.license_plate}
            />
          </View>
        </View>

        <View style={styles.buttons}>
          <TouchableOpacity
            style={[styles.button, { marginRight: 5 }]}
            onPress={() => this.props.navigation.goBack()}
          >
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={this.save}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollViewCompat>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "white"
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "white",
    paddingHorizontal: 21,
    paddingVertical: 17
  },
  headerText: {
    fontSize: 25,
    color: "black"
  },
  fields: {
    backgroundColor: "#F5F5F5"
  },
  fieldGroup: {
    backgroundColor: "white",
    paddingHorizontal: 21,
    paddingVertical: 15
  },
  fieldLabel: {
    color: "#888",
    fontSize: 14,
    paddingBottom: 10
  },
  fieldText: {
    color: "black",
    fontSize: 22
  },
  toolbar: {
    backgroundColor: "black",
    height: 56,
    alignSelf: "stretch"
  },
  textInput: {
    backgroundColor: "white",
    color: "black",
    fontSize: 22,
    borderBottomColor: "black",
    borderBottomWidth: 1,
    padding: 5,
    margin: -5
  },
  buttons: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white"
  },
  button: {
    width: 140,
    height: 39.5,
    borderColor: "black",
    borderRadius: 5,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  buttonText: {
    color: "black",
    fontSize: 17
  }
});
