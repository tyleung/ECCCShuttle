import Storage from "../services/storage";

export default class Helpers {
  static isSynced = async () => {
    const storedUserTransactions = await Storage.getStoredUserTransactions();
    const hasUnsyncedItems = storedUserTransactions.some(t => !t.id);
    return !hasUnsyncedItems;
  };
}
