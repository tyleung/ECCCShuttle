import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Image,
  Text,
  View
} from 'react-native';

export default class Logo extends Component {
  render() {
    return (
      <View>
        <Image source={require('./../../assets/logo.png')} style={styles.image} />
        <View style={styles.line} />
          <Text style={styles.title}>
          <Text style={styles.titleFirstHalf}>
            Park & Ride
          </Text>
          <Text style={styles.titleSecondHalf}>
            &nbsp;Reward Program
          </Text>
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
  }
});