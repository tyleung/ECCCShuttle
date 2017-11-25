import axios from "axios";
import Storage from "./storage";
import { API_TOKEN, USER } from "../utils/constants";

export default class UserApi {
  static login = (email, password) => {
    return axios
      .post("http://shuttle.eccc.ca/api/v1/auth/login", {
        email,
        password
      })
      .then(response => {
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
      return token !== false;
    });
  };

  static logout = async () => {
    await Storage.removeItem(API_TOKEN);
    await Storage.removeItem(USER);
  };

  static signUp = user => {
    return axios
      .post("http://shuttle.eccc.ca/api/v1/users", user)
      .then(response => {
        return response.data;
      })
      .catch(error => {
        let errorMessage = "";
        if (error.response) {
          if (error.response.status === 500) {
            errorMessage = error.response.data[0];
          } else {
            errorMessage = "Sign up error.";
          }
        } else if (error.request) {
          errorMessage = error.request;
        } else {
          errorMessage = error.message;
        }

        throw errorMessage;
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
        return response.data;
      })
      .catch(error => {
        console.log(error);
      });
  };

  static saveUser = async user => {
    console.log(user);
    const token = await Storage.getStoredApiToken();
    return axios
      .post(`http://shuttle.eccc.ca/api/v1/users/${user.id}`, user, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => {
        console.log(response);
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
