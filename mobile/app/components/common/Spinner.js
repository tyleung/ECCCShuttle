import React from "react";
import { ActivityIndicator, StyleSheet } from "react-native";

const Spinner = () => {
  return (
    <ActivityIndicator style={styles.spinner} animating={true} size="large" />
  );
};

export default Spinner;

const styles = StyleSheet.create({
  spinner: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 8
  }
});
