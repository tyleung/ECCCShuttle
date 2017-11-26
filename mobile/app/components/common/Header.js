import React from "react";
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const Header = props => {
  return (
    <View
      style={[
        styles.header,
        props.page === "main" ? null : { backgroundColor: "black" }
      ]}
    >
      <TouchableOpacity style={styles.headerIcon} onPress={props.onPress}>
        <MaterialIcons
          name={props.iconName || "menu"}
          size={40}
          color={props.page === "main" ? "black" : "white"}
        />
      </TouchableOpacity>
      <Text style={styles.headerText}>{props.label}</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    paddingVertical: Platform.OS === "ios" ? 23 : 10,
    alignItems: "center"
  },
  headerIcon: {
    marginHorizontal: 10
  },
  headerText: {
    fontSize: 25,
    color: "white"
  }
});
