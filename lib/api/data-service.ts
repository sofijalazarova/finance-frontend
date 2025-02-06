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
