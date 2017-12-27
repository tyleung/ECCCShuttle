import React from "react";
import {
  Alert,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { NavigationActions } from "react-navigation";
import { BarCodeScanner, Permissions } from "expo";
import moment from "moment";
import Spinner from "./common/Spinner";
import Storage from "../services/storage";
import TransactionApi from "../services/transactionApi";
import UserApi from "../services/userApi";
import { CRYPTO_KEY, TransactionType } from "../utils/constants";
import CryptoJSAesJson from "../utils/CryptoJSAesJson";
import Helpers from "../utils/helpers";

const CryptoJS = require("crypto-js");

export default class BarcodeScanner extends React.Component {
  static navigationOptions = {
    drawerLabel: "QR Scanner"
  };

  constructor(props) {
    super(props);
    this.state = {
      hasCameraPermission: null,
      isProcessing: false
    };
  }

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === "granted" });
  }

  _handleBarCodeRead = ({ data }) => {
    this.setState({ isProcessing: true }, () => {
      const resetAction = NavigationActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: "MainScreen" })]
      });

      try {
        const decrypted = JSON.parse(
          CryptoJS.AES.decrypt(data, CRYPTO_KEY, {
            format: CryptoJSAesJson
          }).toString(CryptoJS.enc.Utf8)
        );

        const now = moment();
        const nowYYYYMMDD = now.format("YYYY-MM-DD");
        if (decrypted === nowYYYYMMDD) {
          UserApi.getLastUserTransaction()
            .then(async lastUserTransaction => {
              // If there's no previous transaction found, or if the last
              // transaction wasn't today, save a new transaction.
              if (
                !lastUserTransaction.transaction_date ||
                moment(lastUserTransaction.transaction_date).format(
                  "YYYY-MM-DD"
                ) < nowYYYYMMDD
              ) {
                await TransactionApi.createTransaction(TransactionType.RIDE);

                // Save transaction to server if there's internet.
                Helpers.isNetworkConnected().then(async isConnected => {
                  if (isConnected) {
                    const user = await Storage.getStoredUser();
                    await Storage.mergeTransactionsToStorage(user.id);
                  }

                  this.props.navigation.dispatch(resetAction);
                  this.setState({ isProcessing: false });
                  Alert.alert(
                    "Alert",
                    "Success! Thank you for taking the shuttle!"
                  );
                });
              } else {
                Alert.alert("Alert", "You've already scanned the code today!");
              }
            })
            .catch(error => {
              Alert.alert("Scanner", error);
            });
        } else if (decrypted < nowYYYYMMDD) {
          Alert.alert("Alert", "The code is expired!");
          this.props.navigation.dispatch(resetAction);
          this.setState({ isProcessing: false });
        } else {
          Alert.alert("Alert", "The code is invalid!");
          this.props.navigation.dispatch(resetAction);
          this.setState({ isProcessing: false });
        }
      } catch (e) {
        Alert.alert("Alert", "The code is invalid!");
      }
    });
  };

  render() {
    const { hasCameraPermission } = this.state;

    if (hasCameraPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      const { navigate } = this.props.navigation;
      return (
        <View style={styles.container}>
          {!this.state.isProcessing ? (
            <BarCodeScanner
              onBarCodeRead={this._handleBarCodeRead}
              barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
              style={StyleSheet.absoluteFill}
            >
              <View style={styles.customRectangleContainer}>
                <View style={styles.customOutsideMarker}>
                  <Text style={styles.customTitleText}>Scan QR Code</Text>
                </View>
                <View style={{ height: 250, flexDirection: "row" }}>
                  <View style={styles.customOutsideMarker} />
                  <View style={styles.customRectangle} />
                  <View style={styles.customOutsideMarker} />
                </View>
                <View
                  style={[
                    styles.customOutsideMarker,
                    { justifyContent: "flex-end", alignItems: "center" }
                  ]}
                >
                  <TouchableOpacity
                    style={{ marginBottom: 50 }}
                    onPress={() => navigate("MainScreen")}
                  >
                    <Text style={styles.customBottomText}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </BarCodeScanner>
          ) : (
            <Spinner />
          )}
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  customRectangleContainer: {
    flex: 0,
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
    flexDirection: "column"
  },
  customRectangle: {
    height: 250,
    width: 250,
    borderWidth: 1,
    borderColor: "white",
    backgroundColor: "transparent"
  },
  customOutsideMarker: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)"
  },
  customTitleText: {
    color: "white",
    fontSize: 22,
    textAlign: "center",
    marginTop: 40
  },
  customBottomText: {
    color: "white",
    fontSize: 22
  }
});
