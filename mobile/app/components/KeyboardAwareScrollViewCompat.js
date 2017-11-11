import React from "react";
import { Platform, KeyboardAvoidingView, ScrollView } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const KeyboardAwareScrollViewCompat = props => {
  if (Platform.OS === "ios") {
    return (
      <KeyboardAwareScrollView {...props}>
        {props.children}
      </KeyboardAwareScrollView>
    );
  }

  return (
    <KeyboardAvoidingView style={props.contentContainerStyle} behavior="padding">
      <ScrollView contentContainerStyle={props.contentContainerStyle}>
        {props.children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default KeyboardAwareScrollViewCompat;
