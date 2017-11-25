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

export default class EditAccount extends Component {
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

  save = () => {
    this.props.navigation.goBack();
  }

  render() {
    return (
      <View style={styles.container}>
        <ToolbarAndroid
          style={styles.toolbar}
          title="Edit Account"
          titleColor="white"
          navIcon={Navicon}
          onIconClicked={() => this.props.navigation.navigate("DrawerOpen")}
        />

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

        <View style={styles.buttons}>
          <TouchableOpacity
            style={[styles.button, { marginRight: 5 }]}
            onPress={() => this.props.navigation.goBack()}
          >
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={this.save}
          >
            <Text style={styles.buttonText}>Save</Text>
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
