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
    console.error("Error fetching categories", error);
    return [];
  }
};

export const getTransactions = async () => {
  try {
    const response = await httpClient.get("/api/transaction");
    return response.data;
  } catch (error) {
    console.error("Error fetching transactions", error);
    return [];
  }
};

export const addCategory = async (data: CategoryModel) => {
  try {
    const response = await httpClient.post("/api/category/add", data);
    return response.data;
  } catch (error) {
    console.error("Error adding category", error);
    return [];
  }
};

export const addAccount = async (data: AccountModel) => {
  try {
    const response = await httpClient.post("/api/account/add", data);
    return response.data;
  } catch (error) {
    console.error("Error adding account", error);
    return [];
  }
};

export const addTransaction = async (data: TransactionModel) => {
  try {
    const response = await httpClient.post("/api/transaction/add", data);
    return response.data;
  } catch (error) {
    console.error("Error adding transaction", error);
    return null;
  }
};

export const fetchBudget = async () => {
  try {
    const response = await httpClient.get("/api/budget/current-month-budget");
    return response.data;
  } catch (error) {
    console.error("Error fetching budget", error);
    return null;
  }
};

export const updateBudget = async ({ amount }: { amount: number }) => {
  try {
    await httpClient.post("/api/budget/update", { amount });
    return { success: true };
  } catch (error) {
    console.error("Error updating budget", error);
    return { success: false, error };
  }
};

export const getCategoryBudgets = async () => {
  try {
    const response = await httpClient.get("/api/budget/all");
    return response.data;
  } catch (error) {
    console.error("Error fetching category budgets", error);
    return [];
  }
};

interface allocateItems {
  budgetId: number;
  categoryId: number;
  amount: string;
}

export const allocateToCategory = async ({
  budgetId,
  categoryId,
  amount,
}: allocateItems) => {
  try {
    await httpClient.post("/api/budget/allocate", {
      budgetId,
      categoryId,
      amount,
    });
  } catch (error) {
    console.error("Error allocating budget", error);
  }
};

export const deleteTransaction = async (id: number) => {
  try {
    await httpClient.delete(`/api/transaction/delete/${id}`);
  } catch (error) {
    console.error("Error deleting transaction", error);
  }
};

export const deleteSaving = async (id: number) => {
  try {
    await httpClient.delete(`/api/savings/delete/${id}`);
  } catch (error) {
    console.error("Error deleting saving goal", error);
  }
};

export const getSavingGoals = async () => {
  try {
    const response = await httpClient.get("api/savings");
    return response.data;
  } catch (error) {
    console.error("Error fetching saving goals");
  }
};

export const updateSavingGoal = async (id: number, amount: number) => {
  try {
    await httpClient.put(`/api/savings/${id}/save`, null, {
      params: { amount },
    });
  } catch (error) {
    console.error("Error updating saving", error);
  }
};

export const addSavingGoal = async (data: CreateSavingModel) => {
  try {
    await httpClient.post("/api/savings", data);
  } catch (error) {
    console.error("Error adding new saving goal", error);
  }
};
