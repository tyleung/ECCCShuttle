import React from "react";
import {
  Alert,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { BarCodeScanner, Permissions } from "expo";
import moment from "moment";
import TransactionApi from "../services/transactionApi";
import UserApi from "../services/userApi";
import { CRYPTO_KEY, TransactionType } from "../utils/constants";
import CryptoJSAesJson from "../utils/CryptoJSAesJson";

const CryptoJS = require("crypto-js");

export default class BarcodeScanner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasCameraPermission: null
    };
  }

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === "granted" });
  }

  _handleBarCodeRead = ({ data }) => {
    this.props.navigation.goBack();
    try {
      const decrypted = JSON.parse(
        CryptoJS.AES
          .decrypt(data, CRYPTO_KEY, {
            format: CryptoJSAesJson
          })
          .toString(CryptoJS.enc.Utf8)
      );

      const now = moment();
      if (decrypted === now.format("YYYY-MM-DD")) {
        UserApi.getLastUserTransaction()
          .then(async lastUserTransaction => {
            // If there's no previous transaction found, or if the last
            // transaction wasn't today, save a new transaction.
            if (
              !lastUserTransaction.transaction_date ||
              lastUserTransaction.transaction_date <
                now.format("YYYY-MM-DD hh:mm:ss")
            ) {
              await TransactionApi.createTransaction(TransactionType.RIDE);
              Alert.alert(
                "Alert",
                "Success! Thank you for taking the shuttle!"
              );
            } else {
              Alert.alert("Alert", "You've already scanned the code today!");
            }
          })
          .catch(error => {
            Alert.alert("Scanner", error);
          });
      } else {
        Alert.alert("Alert", "The code is expired!");
      }
    } catch (e) {
      Alert.alert("Alert", "The code is invalid!");
    }
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
        <View style={{ flex: 1 }}>
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
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  zeroContainer: {
    height: 0,
    flex: 0
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
