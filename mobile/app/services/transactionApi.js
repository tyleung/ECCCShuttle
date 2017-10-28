import { AsyncStorage } from "react-native";
import axios from "axios";
import UserApi from "../services/userApi";
import { API_TOKEN, USER_TRANSACTIONS } from "../utils/constants";

export default class TransactionApi {
  static createTransaction = transactionType => {
    return UserApi.getStoredUser().then(user => {
      const transaction = {
        user_id: user.id,
        type_id: transactionType,
        transaction_date: Math.floor((new Date()).getTime() / 1000),
        points: 1
      };
      return TransactionApi.saveTransaction(transaction);
    });
  };

  static saveTransaction = async transaction => {
    const token = await AsyncStorage.getItem(API_TOKEN);
    return axios
      .post("http://shuttle.eccc.ca/api/v1/transactions", transaction, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(async response => {
        const savedTransaction = response.data;
        const userTransactions = await UserApi.getStoredUserTransactions();
        userTransactions.push(savedTransaction);
        await AsyncStorage.setItem(USER_TRANSACTIONS, JSON.stringify(userTransactions));
        return savedTransaction;
      })
      .catch(error => {
        throw error;
      });
  };
}
