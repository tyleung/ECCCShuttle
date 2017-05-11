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

export default class ECCCShuttle extends Component {
  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor='black'
        />
        <Image source={require('./Assets/logo.png')} style={styles.image} />
        <View style={styles.line} />
          <Text style={styles.title}>
          <Text style={styles.titleFirstHalf}>
            Park & Ride
          </Text>
          <Text style={styles.dummy}>
             -
          </Text>
          <Text style={styles.titleSecondHalf}>
            Reward Program
          </Text>
        </Text>
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
    top: -101,
    resizeMode: 'contain',
    width: 280,
  },
  line: {
    top: -96,
    width: 280,
    height: 1.5,
    backgroundColor: 'white'
  },
  title: {
    top: -92.5,
    color: 'white',
    fontSize: 21,
  },
  titleFirstHalf: {
    fontFamily: 'Raleway-LightItalic',
  },
  titleSecondHalf: {
    fontFamily: 'Raleway-Light',
  },
  dummy: {
    color: 'black',
  }
});

AppRegistry.registerComponent('ECCCShuttle', () => ECCCShuttle);
