import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  StatusBar,
  View,
  Text,
  ToolbarAndroid,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';

// https://github.com/react-native-community/react-native-modal
import Modal from 'react-native-modal'


export default class Settings extends Component {

  // Name the drawerLabel for this page
  static navigationOptions = {
    drawerLabel: '  Settings',
  };

  // Modal not visible by default
  state = {
    isModalVisible: false
  }
  
  // Modal's show and hide methods
  _showModal = () => this.setState({ isModalVisible: true })
  _hideModal = () => this.setState({ isModalVisible: false })

  render() {
    var {navigate} = this.props.navigation;
    return (
        <View style={styles.container}>
          <ToolbarAndroid
            style={styles.toolbar}
            title=" Settings"
            titleColor='white'
            navIcon={require('./../../Assets/navicon.png')}
            onIconClicked={() => this.props.navigation.navigate('DrawerOpen')}
            />
          <StatusBar
            backgroundColor='black'
            />
          {/* Profile icon */}
          <View style={{marginVertical: 30, marginLeft: 40}}>
            <Image source={require('./../../Assets/profileGrey.png')} style={styles.profileIcon} />
          </View>

          {/* Show user's email address */}
          <TouchableOpacity style={[styles.profileContainer, {borderTopWidth: 1, borderBottomWidth: 1}]}>
              <View style={{flex: 1}}>
                <Text style={[styles.ralewayLight, styles.profileText, {paddingRight:21}]}>
                    tongtongcanopus@gmail.com
                </Text>
              </View>
          </TouchableOpacity>

          {/* Show user's name and button that navigates to EditName*/}
          <TouchableOpacity style={[styles.profileContainer, {borderBottomWidth: 1}]} onPress={() => navigate("EditNameScreen")}>
              <View style={{flex: 1}}>
                <Text style={[styles.ralewayLight, styles.profileText]}>
                    Canopus Tong
                </Text>
              </View>
              <View style={{alignItems: 'flex-end', marginHorizontal: 15, justifyContent: 'center'}}>
                  <Image source={require('./../../Assets/pencil.png')} style={styles.pencilIcon} />
              </View>
          </TouchableOpacity>

          {/* Show user's license plate and button that navigates to EditLicensePlate */}
          <TouchableOpacity style={[styles.profileContainer, {borderBottomWidth: 1}]} onPress={() => navigate("EditLicensePlateScreen")}>
              <View style={{flex: 1}}>
                <Text style={[styles.ralewayLight, styles.profileText]}>
                    AA 1201
                </Text>
              </View>
              <View style={{alignItems: 'flex-end', marginHorizontal: 15, justifyContent: 'center'}}>
                  <Image source={require('./../../Assets/pencil.png')} style={styles.pencilIcon} />
              </View>
          </TouchableOpacity>

          {/* Remove account button */}
          <View style={{flex: 1, justifyContent: 'flex-end'}}>
            <TouchableOpacity style={[styles.profileContainer, {borderTopWidth: 1, borderBottomWidth: 1, marginBottom: 30}]} onPress={this._showModal}>
                <View style={{flex: 1}}>
                    <Text style={[styles.ralewayLight, {fontSize: 17, color: 'red', paddingLeft: 21, paddingVertical: 13}]}>
                        Remove My Account
                    </Text>
                </View>
                <View style={{alignItems: 'flex-end', marginHorizontal: 15, justifyContent: 'center'}}>
                    <Image source={require('./../../Assets/deleteAccount.png')} style={styles.pencilIcon} />
                </View>
            </TouchableOpacity>
          </View>

        {/* Modal for account removal confirmation */}
        <Modal isVisible={this.state.isModalVisible}>
            <TouchableOpacity style={{flex: 1, justifyContent: 'center'}} activeOpacity={1} onPress={this._hideModal}>
                <TouchableWithoutFeedback>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>Remove Account?</Text>
                        <Text style={styles.modalText}>Removing this account will permanently delete all of its data from the datebase. This includes all ride history, collected points, license plate number, etc. Do you want to continue?</Text>
                        <View style={styles.modalButtonsContainer}>
                            <View style={{flex:1}}>
                                <View style={styles.modalButtonContainer}>

                                    {/* Cancel button */}
                                    <TouchableOpacity onPress={this._hideModal}>
                                        <Text style={styles.modalButtonText}>CANCEL</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={{flex:1}}>
                                <View style={styles.modalButtonContainer}>

                                    {/* Remove button */}
                                    <TouchableOpacity>
                                        <Text style={styles.modalButtonText}>REMOVE</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </TouchableOpacity>
        </Modal>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#F5F5F5'
  },
   profileContainer:{
    flexDirection: 'row',
    backgroundColor: 'white',
    borderColor: '#223E4A',
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
  },
  profileText: {
    fontSize: 22,
    color: 'black', 
    paddingLeft: 21, 
    paddingVertical: 17
  },
  pencilIcon: {
    resizeMode: 'contain',
    width: 30,
    height: 30,
  },
  profileIcon: {
    resizeMode: 'contain',
    width: 70,
    height: 70,
  },
  modalContainer: {
        backgroundColor: 'white',
        borderRadius: 5
  },
  modalTitle: {
        fontFamily: 'Raleway-Medium',
        fontSize: 22,
        padding: 15,
        paddingTop: 20,
        color: 'red'
  },
  modalText: {
        fontFamily: 'Raleway-Light',
        fontSize: 18,
        paddingHorizontal: 15,
  },
  modalButtonsContainer: {
        flexDirection: 'row',
        paddingVertical: 15,
  },
  modalButtonContainer: {
      justifyContent: 'center',
      alignItems: 'center'
  },
  modalButtonText: {
      fontFamily: 'Raleway-Medium',
      fontSize: 18,
  },
});
