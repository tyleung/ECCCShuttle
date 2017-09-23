import React, { Component } from 'react';
import { StyleSheet, StatusBar, View, ToolbarAndroid } from 'react-native';

import Navicon from './../../assets/navicon.png';

export default class About extends Component {
  // Name the drawerLabel for this page
  static navigationOptions = {
    drawerLabel: '  About',
  };

  render() {
    return (
      <View style={styles.container}>
        <ToolbarAndroid
          style={styles.toolbar}
          title=" About"
          titleColor="white"
          navIcon={Navicon}
          onIconClicked={() => this.props.navigation.navigate('DrawerOpen')}
        />
        <StatusBar backgroundColor="black" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  ralewayLight: {
    // fontFamily: 'Raleway-Light'
  },
  ralewayLightItalic: {
    // fontFamily: 'Raleway-LightItalic'
  },
  toolbar: {
    backgroundColor: 'black',
    height: 56,
    alignSelf: 'stretch',
  },
});
