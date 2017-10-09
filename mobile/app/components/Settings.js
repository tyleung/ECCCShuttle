import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  ToolbarAndroid,
  TouchableOpacity,
  Image
} from "react-native";

import Navicon from "./../../assets/navicon.png";
import ProfileGrey from "./../../assets/profileGrey.png";
import Pencil from "./../../assets/pencil.png";

export default class Settings extends Component {
  // Name the drawerLabel for this page
  static navigationOptions = {
    drawerLabel: "  Settings"
  };

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
        {/* Profile icon */}
        <View style={{ marginVertical: 30, marginLeft: 40 }}>
          <Image source={ProfileGrey} style={styles.profileIcon} />
        </View>

        {/* Show user's email address */}
        <TouchableOpacity
          style={[
            styles.profileContainer,
            { borderTopWidth: 1, borderBottomWidth: 1 }
          ]}
        >
          <View style={{ flex: 1 }}>
            <Text
              style={[
                styles.ralewayLight,
                styles.profileText,
                { paddingRight: 21 }
              ]}
            >
              tongtongcanopus@gmail.com
            </Text>
          </View>
        </TouchableOpacity>

        {/* Show user's name and button that navigates to EditName */}
        <TouchableOpacity
          style={[styles.profileContainer, { borderBottomWidth: 1 }]}
          onPress={() => navigate("EditNameScreen")}
        >
          <View style={{ flex: 1 }}>
            <Text style={[styles.ralewayLight, styles.profileText]}>
              Canopus Tong
            </Text>
          </View>
          <View
            style={{
              alignItems: "flex-end",
              marginHorizontal: 15,
              justifyContent: "center"
            }}
          >
            <Image source={Pencil} style={styles.pencilIcon} />
          </View>
        </TouchableOpacity>

        {/* Show user's license plate and button that navigates to EditLicensePlate */}
        <TouchableOpacity
          style={[styles.profileContainer, { borderBottomWidth: 1 }]}
          onPress={() => navigate("EditLicensePlateScreen")}
        >
          <View style={{ flex: 1 }}>
            <Text style={[styles.ralewayLight, styles.profileText]}>
              AA 1201
            </Text>
          </View>
          <View
            style={{
              alignItems: "flex-end",
              marginHorizontal: 15,
              justifyContent: "center"
            }}
          >
            <Image source={Pencil} style={styles.pencilIcon} />
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5"
  },
  profileContainer: {
    flexDirection: "row",
    backgroundColor: "white",
    borderColor: "#223E4A"
  },
  ralewayLight: {
    // fontFamily: 'Raleway-Light'
  },
  ralewayLightItalic: {
    // fontFamily: 'Raleway-LightItalic'
  },
  toolbar: {
    backgroundColor: "black",
    height: 56,
    alignSelf: "stretch"
  },
  profileText: {
    fontSize: 22,
    color: "black",
    paddingLeft: 21,
    paddingVertical: 17
  },
  pencilIcon: {
    resizeMode: "contain",
    width: 30,
    height: 30
  },
  profileIcon: {
    resizeMode: "contain",
    width: 70,
    height: 70
  },
  modalContainer: {
    backgroundColor: "white",
    borderRadius: 5
  },
  modalTitle: {
    // fontFamily: 'Raleway-Medium',
    fontSize: 22,
    padding: 15,
    paddingTop: 20,
    color: "red"
  },
  modalText: {
    // fontFamily: 'Raleway-Light',
    fontSize: 18,
    paddingHorizontal: 15
  },
  modalButtonsContainer: {
    flexDirection: "row",
    paddingVertical: 15
  },
  modalButtonContainer: {
    justifyContent: "center",
    alignItems: "center"
  },
  modalButtonText: {
    // fontFamily: 'Raleway-Medium',
    fontSize: 18
  }
});
