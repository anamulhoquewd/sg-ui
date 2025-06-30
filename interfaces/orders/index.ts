export interface IOrder {
  _id: string;
  customer: {
    name: string;
    phone: string;
    _id: string;
    address: string;
  };
  status: string;
  paymentStatus: string;
  amount: number;
  address: string;
  createdAt: string;
  items: IOrderItem[];
}

export interface IOrderItem {
  product: string;
  name: string;
  price: number;
  total: number;
  quantity: number;
}
