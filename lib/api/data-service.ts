import httpClient from "./httpClient";

export const getAccounts = async () => {
  try {
    const response = await httpClient.get("/api/account/byUser");
    return response.data;
  } catch (error) {
    console.error("Error fetching accounts", error);
    return [];
  }
};

export const getCategories = async () => {
  try {
    const response = await httpClient.get("/api/category/byUser");
    return response.data;
  } catch (error) {
    console.error("Error fetching accounts", error);
    return [];
  }
};

export const getTransactions = async () => {
  try {
    const response = await httpClient.get("/api/transaction");
    return response.data;
  } catch (error) {
    console.error("Error fetching transactions");
    return [];
  }
};

export const addCategory = async (data: CategoryModel) => {
  try {
    const response = await httpClient.post("/api/category/add", data);
    return response.data;
  } catch (error) {
    console.error("Error fetching accounts", error);
    return [];
  }
};

export const addAccount = async (data: AccountModel) => {
  try {
    const response = await httpClient.post("/api/account/add", data);
    return response.data;
  } catch (error) {
    console.error("Error fetching accounts", error);
    return [];
  }
};

export const addTransaction = async (data: TransactionModel) => {
  try {
    const response = await httpClient.post("/api/transaction/add", data);
    return response.data;
  } catch (error) {
    console.error("Error fetching accounts", error);
    return [];
  }
};

export const fetchBudget = async () => {
  const response = await httpClient.get("/api/budget/current-month-budget");

  return response.data;
};

export const updateBudget = async ({ amount }: { amount: number }) => {
  await httpClient.post("/api/budget/update", { amount });
};
