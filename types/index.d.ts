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
