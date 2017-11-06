import { AsyncStorage } from "react-native";
import { API_TOKEN, USER, USER_TRANSACTIONS } from "../utils/constants";

export default class Storage {
  static getStoredApiToken = async () => {
    try {
      const token = await AsyncStorage.getItem(API_TOKEN);
      if (token !== null) {
        return token;
      } else {
        throw Error("API Token not found in localstorage.");
      }
    } catch (e) {
      return false;
    }
  };

  static getStoredUser = async () => {
    try {
      const user = await AsyncStorage.getItem(USER);
      if (user !== null) {
        return JSON.parse(user);
      } else {
        throw Error("User not found in localstorage.");
      }
    } catch (e) {
      return false;
    }
  };

  static getStoredUserTransactions = async () => {
    try {
      const userTransactions = await AsyncStorage.getItem(USER_TRANSACTIONS);
      if (userTransactions !== null) {
        return JSON.parse(userTransactions);
      } else {
        throw Error("User transactions not found in localstorage.");
      }
    } catch (e) {
      return [];
    }
  };

  static setItem = async (key, value) => {
    AsyncStorage.setItem(key, value);
  };

  static removeAll = async () => {
    await AsyncStorage.removeItem(API_TOKEN);
    await AsyncStorage.removeItem(USER);
    await AsyncStorage.removeItem(USER_TRANSACTIONS);
  };
}
