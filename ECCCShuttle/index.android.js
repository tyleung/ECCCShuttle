/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import App from './App';
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  StatusBar,
  View
} from 'react-native';

export default class ECCCShuttle extends Component {
  render() {
    return (
        <App/>
    );
  }
}

AppRegistry.registerComponent('ECCCShuttle', () => ECCCShuttle);
