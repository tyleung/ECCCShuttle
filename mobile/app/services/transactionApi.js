import axios from "axios";
import moment from "moment";
import Storage from "../services/storage";
import { USER_TRANSACTIONS } from "../utils/constants";

export default class TransactionApi {
  static createTransaction = transactionType => {
    return Storage.getStoredUser().then(user => {
      const transaction = {
        user_id: user.id,
        type_id: transactionType,
        transaction_date: moment().unix()
        // Points will be added server side
      };
      return TransactionApi.saveTransactionToStorage(transaction);
    });
  };

  static saveTransactionToStorage = async transaction => {
    const userTransactions = await Storage.getStoredUserTransactions();
    userTransactions.push(transaction);
    await Storage.setItem(USER_TRANSACTIONS, JSON.stringify(userTransactions));
    return transaction;
  };

  static saveTransaction = async transaction => {
    const token = await Storage.getStoredApiToken();
    return axios
      .post("http://shuttle.eccc.ca/api/v1/transactions", transaction, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(async response => {
        const savedTransaction = response.data;
        return savedTransaction;
      })
      .catch(error => {
        throw error;
      });
  };
}
