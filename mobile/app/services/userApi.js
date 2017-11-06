import axios from "axios";
import Storage from "./storage";
import { API_TOKEN, USER, USER_TRANSACTIONS } from "../utils/constants";

export default class UserApi {
  static login = (email, password) => {
    return axios
      .post("http://shuttle.eccc.ca/api/v1/auth/login", {
        email,
        password
      })
      .then(response => {
        Storage.setItem(API_TOKEN, response.data.token);
        return response.data.token;
      })
      .catch(error => {
        let errorMessage = "";
        if (error.response) {
          if (error.response.status === 404) {
            errorMessage = "Incorrect email or password.";
          } else if (
            error.response.status === 422 &&
            error.response.data.email
          ) {
            errorMessage = error.response.data.email[0];
          } else {
            errorMessage = "Login error.";
          }
        } else if (error.request) {
          errorMessage = error.request;
        } else {
          errorMessage = error.message;
        }

        throw errorMessage;
      });
  };

  static isLoggedIn = () => {
    return Storage.getStoredApiToken().then(token => {
      return token !== null;
    });
  };

  static logout = async () => {
    Storage.removeAll();
  };

  static signUp = user => {
    return axios
      .post("http://shuttle.eccc.ca/api/v1/users", user)
      .then(response => {
        return response.data;
      })
      .catch(error => {
        console.log(error);
      });
  };

  static getUser = token => {
    return axios
      .get("http://shuttle.eccc.ca/api/v1/user", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => {
        if (response.data.user) {
          Storage.setItem(USER, JSON.stringify(response.data.user));
          return response.data.user;
        } else {
          throw Error("Get user error.");
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  static getUserTransactions = async userId => {
    const token = await Storage.getStoredApiToken();
    return axios
      .get(`http://shuttle.eccc.ca/api/v1/users/${userId}/transactions`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => {
        Storage.setItem(USER_TRANSACTIONS, JSON.stringify(response.data));
        return response.data;
      })
      .catch(error => {
        console.log(error);
      });
  };

  static getLastUserTransaction = async () => {
    const userTransactions = await Storage.getStoredUserTransactions();
    if (userTransactions.length > 0) {
      const lastUserTransaction = userTransactions.reduce(
        (latest, t) =>
          latest.transaction_date > t.transaction_date ? latest : t
      );
      return lastUserTransaction;
    }

    return {};
  };
}
