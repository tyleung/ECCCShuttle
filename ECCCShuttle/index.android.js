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

import Login from './app/components/Login';

export default class ECCCShuttle extends Component {
  render() {
    return (
        <Login/>
    );
  }
}

const styles = StyleSheet.create({
});

AppRegistry.registerComponent('ECCCShuttle', () => ECCCShuttle);
