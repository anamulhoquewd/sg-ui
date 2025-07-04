export interface IAdmin {
  _id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  role: "super_admin" | "admin";
  avatar?: string;
}

export interface ICustomer {
  _id: string;
  name: string;
  phone: string;
  address: string;
}
