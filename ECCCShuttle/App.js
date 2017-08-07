/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React from 'react';
import {Button, Text, Platform, ScrollView, StyleSheet, View, Image} from 'react-native';
import {DrawerNavigator} from 'react-navigation';
import { DrawerItems } from 'react-navigation';

import Login from './app/components/Login';
import QRScanner from './app/components/QRScanner';
import RideHistory from './app/components/RideHistory';

const DrawerExample = DrawerNavigator(
    {
        QRScannerScreen: {
            path:'/',
            screen: QRScanner,
        },
        RideHistoryScreen: {
            path:'/sent',
            screen: RideHistory
        },
    },
    {
        initialRouteName: 'QRScannerScreen',
        drawerPosition: 'left',
        drawerWidth: 320,
        contentOptions: {
            activeTintColor: 'black',
            style: {

            },
            labelStyle: {
                fontSize: 22,
                fontFamily: 'Raleway-Light',
                fontWeight: 'normal'
            },
        },
        contentComponent: props => 
            <View style={styles.container}>
                <View style={styles.profile}>
                    <View style={{flex:0.4, justifyContent:'center'}}>
                        <Image source={require('./Assets/profile.png')} style={styles.image}/>
                    </View>
                    <View style={{flex:1, justifyContent:'center'}}>
                        <Text style={styles.text}>Canopus Tong</Text>
                    </View>
                </View>
                <DrawerItems {...props} />
            </View>
    }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profile: {
    flex:0.12,
    borderBottomWidth: 2,
    marginBottom: 8,
    flexDirection: 'row',
  },
  text: {
    fontFamily: 'Raleway-Medium',
    fontSize:22
  },
  image: {
    resizeMode: 'contain',
    width: 45,
    height: 45,
    marginLeft: 25
  }
});

export default DrawerExample;