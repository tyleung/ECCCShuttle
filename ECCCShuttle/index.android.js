/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  StatusBar,
  View
} from 'react-native';

import Logo from './app/components/Logo';
import Login from './app/components/Login';

export default class ECCCShuttle extends Component {
  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor='black'
        />
        <Logo/>
        <Login/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
});

AppRegistry.registerComponent('ECCCShuttle', () => ECCCShuttle);
