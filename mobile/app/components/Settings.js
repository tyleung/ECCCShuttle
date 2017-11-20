import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  ToolbarAndroid,
  TouchableOpacity
} from "react-native";
import Storage from "../services/storage";

import Navicon from "./../../assets/navicon.png";

export default class Settings extends Component {
  // Name the drawerLabel for this page
  static navigationOptions = {
    drawerLabel: "Settings"
  };

  constructor() {
    super();
    this.state = {
      user: {}
    };
  }

  componentDidMount() {
    Storage.getStoredUser().then(user => {
      this.setState({ user });
    });
  }

  editFirstName = () => {};

  editLastName = () => {};

  editEmail = () => {};

  editPassword = () => {};

  editLicensePlate = () => {};

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <ToolbarAndroid
          style={styles.toolbar}
          title=" Settings"
          titleColor="white"
          navIcon={Navicon}
          onIconClicked={() => this.props.navigation.navigate("DrawerOpen")}
        />

        <Text style={styles.header}>Account Settings</Text>

        <View style={styles.fields}>
          <TouchableOpacity
            style={styles.fieldGroup}
            onPress={this.editFirstName}
          >
            <Text style={styles.fieldLabel}>First Name</Text>
            <Text style={styles.fieldText}>{this.state.user.first_name}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.fieldGroup}
            onPress={this.editLastName}
          >
            <Text style={styles.fieldLabel}>Last Name</Text>
            <Text style={styles.fieldText}>{this.state.user.last_name}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.fieldGroup} onPress={this.editEmail}>
            <Text style={styles.fieldLabel}>Email</Text>
            <Text style={styles.fieldText}>{this.state.user.email}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.fieldGroup}
            onPress={this.editPassword}
          >
            <Text style={styles.fieldLabel}>Password</Text>
            <TextInput
              editable={false}
              onPress={() => this.editPassword}
              secureTextEntry
              style={styles.fieldText}
              underlineColorAndroid={"transparent"}
              value="*******"
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.fieldGroup}
            onPress={this.editLicensePlate}
          >
            <Text style={styles.fieldLabel}>License Plate</Text>
            <Text style={styles.fieldText}>
              {this.state.user.license_plate}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  header: {
    backgroundColor: "white",
    fontSize: 22,
    color: "black",
    paddingLeft: 21,
    paddingVertical: 17
  },
  fields: {
    backgroundColor: "#F5F5F5"
  },
  fieldGroup: {
    backgroundColor: "white",
    paddingLeft: 21,
    paddingVertical: 17
  },
  fieldLabel: {
    color: "#888",
    fontSize: 14,
    paddingBottom: 5
  },
  fieldText: {
    color: "black",
    fontSize: 22
  },
  toolbar: {
    backgroundColor: "black",
    height: 56,
    alignSelf: "stretch"
  }
});
