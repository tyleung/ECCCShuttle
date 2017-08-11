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
import EditName from './app/components/EditName';
import EditLicensePlate from './app/components/EditLicensePlate';


// https://reactnavigation.org/docs/navigators/stack
// A stack navigator that wraps inside of the drawer navigator
// Only for navigation between Main page and QR Scanner
const MainPageStackNav = StackNavigator(
    {
        // Stack RouteConfigs 
        MainScreen: {
            screen: Main,
            // Hide header
            header: { visible:false } 
            },
        ScannerScreen: {
            screen: QRScanner,
            // Hide header
            header: { visible:false }
        },
    },
    {
        // Stack configs
        initialRouteName: 'MainScreen',
        mode: 'card',
        headerMode: 'none',
    }
);

// https://reactnavigation.org/docs/navigators/stack
// A stack navigator that wraps inside of the drawer navigator
// Only for navigation between Settings, EditName and Edit license plate page
const SettingPageStackNav = StackNavigator(
    {
        // Stack RouteConfigs 
        SettingsScreen: {
            screen: Settings,
            // Hide header
            header: { visible:false } 
            },
        EditNameScreen: {
            screen: EditName,
            // Hide header
            header: { visible:false }
        },
        EditLicensePlateScreen: {
            screen: EditLicensePlate,
            // Hide header
            header: { visible:false }
        },
    },
    {
        // Stack configs
        initialRouteName: 'SettingsScreen',
        mode: 'card',
        headerMode: 'none',
    }
);


// https://reactnavigation.org/docs/navigators/drawer
// A drawer navigation for Main, Ride History, About, Settings and Login page
export default DrawerNav = DrawerNavigator(
    {
        // Drawer Route Configs 
        StackNavScreen: {
            screen: MainPageStackNav,
        },
        RideHistoryScreen: {
            screen: RideHistory,
        },
        AboutScreen: {
            screen: About,
        },
        SettingsScreen: {
            screen: SettingPageStackNav
        },
        LoginScreen: {
            screen: Login
        },
    },
    {
        // Drawer configs
        initialRouteName: 'StackNavScreen',
        drawerPosition: 'left',
        drawerWidth: 320,

        // Drawer stylings
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
        
        // Moew Drawer stylings
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