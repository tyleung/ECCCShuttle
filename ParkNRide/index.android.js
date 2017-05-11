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
  Image,
  Text,
  View
} from 'react-native';

export default class ParkNRide extends Component {
  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor='black'
        />
        <Image source={require('./Assets/logo.png')} style={styles.image} />
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
  image: {
    top: -100,
    resizeMode: 'contain',
    width: 280,
  },
});

AppRegistry.registerComponent('ParkNRide', () => ParkNRide);
