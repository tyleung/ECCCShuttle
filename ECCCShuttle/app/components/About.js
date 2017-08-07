import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  StatusBar,
  View,
  Text,
  ToolbarAndroid,
} from 'react-native';


export default class QRScanner extends Component {
  static navigationOptions = {
    drawerLabel: '  About',
  };

  render() {
    return (
        <View style={styles.container}>
          <ToolbarAndroid
            style={styles.toolbar}
            title=" About"
            titleColor='white'
            navIcon={require('./../../Assets/navicon.png')}
            onIconClicked={() => this.props.navigation.navigate('DrawerOpen')}
            />
          <StatusBar
            backgroundColor='black'
            />
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#F5F5F5'
  },
  ralewayLight: {
    fontFamily: 'Raleway-Light'
  },
  ralewayLightItalic: {
    fontFamily: 'Raleway-LightItalic'
  },
  toolbar: {
   backgroundColor: 'black',
   height: 56,
   alignSelf: 'stretch',
  }  
});
