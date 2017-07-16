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
import Main from './app/components/Main';

export default class ECCCShuttle extends Component {
  render() {
    return (
        <Main/>
    );
  }
}

const styles = StyleSheet.create({
  container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'blue'
    }
});

AppRegistry.registerComponent('ECCCShuttle', () => ECCCShuttle);
