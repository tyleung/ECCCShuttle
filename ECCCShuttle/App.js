/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React from 'react';
import {Button, Text, Platform, ScrollView, StyleSheet, View, Image} from 'react-native';
import {DrawerNavigator, StackNavigator} from 'react-navigation';
import { DrawerItems } from 'react-navigation';

import Login from './app/components/Login';
import Main from './app/components/Main';
import RideHistory from './app/components/RideHistory';
import About from'./app/components/About';
import Settings from'./app/components/Settings';
import QRScanner from'./app/components/QRScanner';

const StackNav = StackNavigator(
    {
        MainScreen: {
                screen: Main,
                header: { visible:false }
            },
        ScannerScreen: {
            screen: QRScanner,
            header: { visible:false }
        },
    },
    {
        initialRouteName: 'MainScreen',
        mode: 'card',
        headerMode: 'none',
    }
);

export default DrawerNav = DrawerNavigator(
    {
        StackNavScreen: {
            screen: StackNav,
        },
        RideHistoryScreen: {
            screen: RideHistory,
        },
        AboutScreen: {
            screen: About,
        },
        SettingsScreen: {
            screen: Settings
        },
        LoginScreen: {
            screen: Login
        },
    },
    {
        initialRouteName: 'StackNavScreen',
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
                    <View style={{flex:0.4, justifyContent:'center', paddingVertical: 16}}>
                        <Image source={require('./Assets/profileBlack.png')} style={styles.image}/>
                    </View>
                    <View style={{flex:1, justifyContent:'center', paddingVertical: 16}}>
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