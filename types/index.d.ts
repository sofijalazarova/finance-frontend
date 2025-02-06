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
  errors?: Map<string,string>;
  generalErrors?: string[];
}

declare interface CategoryModel {
  name: string,
  emoji: string
}