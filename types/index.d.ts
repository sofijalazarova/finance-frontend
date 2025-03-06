declare type SignUpParams = {
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
};

declare interface signInProps {
  email: string;
  password: string;
}

declare interface HttpErrorResponse {
  message: string;
  status: number;
  errors?: Map<string, string>;
  generalErrors?: string[];
}

declare interface CategoryModel {
  id?: number;
  name: string;
  emoji: string;
}

declare interface BudgetModel {
  amount: string;
}

declare interface TransactionModel {
  id?: number;
  account_id: number;
  category_id: number;
  name: string;
  description?: string;
  type: "EXPENSE" | "INCOME";
  amount: string;
  transactionDate?: Date;
  account?: AccountModel;
  category?: CategoryModel;
}

declare interface AccountModel {
  id?: number;
  name: string;
  type: "SAVINGS" | "CASH" | "CREDIT_CARD" | "OTHER";
  balance: string;
}

declare interface CreateAccountParams {
  name: string;
  type: "SAVINGS" | "CASH" | "CREDIT_CARD" | "OTHER";
  balance: number;
}

declare interface CreateSavingModel {
  name: string;
  targetAmount: string;
  savedAmount: string;
  targetDate: string;
}

declare interface assignItems {
  budgetId: number;
  categoryId: number;
  amount: string;
}
