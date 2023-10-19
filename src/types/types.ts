export interface Dictionary<T = any> {
  [key: string]: T;
}

export interface ITransaction {
  product: string;
  price: string;
  quantity: string;
  date: string;
  status: string;
}

export interface IUser {
  email: string;
  company: string;
  address: string;
}

export interface IReportData {
  transactions: ITransaction[];
  user: IUser;
}
