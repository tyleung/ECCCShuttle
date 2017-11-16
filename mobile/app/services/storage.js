import { AsyncStorage } from "react-native";
import UserApi from "./userApi";
import TransactionApi from "./transactionApi";
import { API_TOKEN, USER, USER_TRANSACTIONS } from "../utils/constants";

export default class Storage {
  static setItem = async (key, value) => {
    return AsyncStorage.setItem(key, value);
  };

  static removeItem = async key => {
    return AsyncStorage.removeItem(key);
  };

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
      const user = await Storage.getStoredUser();
      const transactions = await Storage.getStoredTransactions();
      // Possible stored transactions from multiple users,
      // so we need to filter out the current user.
      const userTransactions = transactions.filter(t => t.user_id === user.id);
      if (userTransactions !== null) {
        return userTransactions;
      } else {
        throw Error("User transactions not found in localstorage.");
      }
    } catch (e) {
      return [];
    }
  };

  static getStoredTransactions = async () => {
    try {
      const transactions = await AsyncStorage.getItem(USER_TRANSACTIONS);
      if (transactions !== null) {
        return JSON.parse(transactions);
      } else {
        throw Error("Transactions not found in localstorage.");
      }
    } catch (e) {
      return [];
    }
  };

  static mergeTransactionsToStorage = async userId => {
    const serverUserTransactions = await UserApi.getUserTransactions(userId);
    const storedTransactions = await Storage.getStoredTransactions();
    const storedUserTransactions = await Storage.getStoredUserTransactions();
    const transactionsWithoutUser = storedTransactions.filter(
      t => t.user_id !== userId
    );
    if (storedUserTransactions.length <= serverUserTransactions.length) {
      // serverUserTransactions is the most up-to-date.
      const mergedTransactions = transactionsWithoutUser.concat(
        serverUserTransactions
      );
      return Storage.setItem(
        USER_TRANSACTIONS,
        JSON.stringify(mergedTransactions)
      );
    } else {
      // storedUserTransactions contains unsynced items.
      const unsyncedTransactions = [];
      await Promise.all(
        storedUserTransactions.map(async storedTransaction => {
          if (!storedTransaction.id) {
            const savedTransaction = await TransactionApi.saveTransaction(
              storedTransaction
            );
            unsyncedTransactions.push(savedTransaction);
          }
        })
      );

      const savedUserTransactions = storedUserTransactions.filter(t => t.id);
      const mergedTransactions = transactionsWithoutUser
        .concat(savedUserTransactions)
        .concat(unsyncedTransactions);

      // User has been updated with points, so we need to update it
      const token = await Storage.getStoredApiToken();
      const user = await UserApi.getUser(token);
      await Storage.setItem(USER, JSON.stringify(user));
      return Storage.setItem(
        USER_TRANSACTIONS,
        JSON.stringify(mergedTransactions)
      );
    }
  };

  static removeAll = async () => {
    await AsyncStorage.removeItem(API_TOKEN);
    await AsyncStorage.removeItem(USER);
    await AsyncStorage.removeItem(USER_TRANSACTIONS);
  };
}
