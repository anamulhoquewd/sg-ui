import { ICartItem } from "@/interfaces/products";
import { action, createStore, persist, Action } from "easy-peasy";

export interface CartModel {
  data: { [key: string]: ICartItem }; // <-- object map with product ID as key

  addItem: Action<CartModel, ICartItem>;
  removeItem: Action<CartModel, string>; // just productId
  updateQuantity: Action<CartModel, { id: string; quantity: number }>;
  clearData: Action<CartModel>;
}

const cartModel: CartModel = {
  data: {},

  clearData: action((state) => {
    state.data = {};
  }),

  addItem: action((state, product) => {
    const existing = state.data[product._id];

    if (!existing) {
      state.data[product._id] = {
        ...product,
        quantity: product.quantity ?? 1,
      };
    } else if (product.quantity) {
      state.data[product._id].quantity = product.quantity;
    }
  }),

  updateQuantity: action((state, payload) => {
    const { id, quantity } = payload;

    // Quantity must be at least 1
    if (quantity < 1) {
      console.warn(`Quantity must be at least 1. Received: ${quantity}`);
      return;
    }

    if (state.data[id]) {
      state.data[id].quantity = quantity;
    }
  }),

  removeItem: action((state, productId) => {
    delete state.data[productId];
  }),
};

const store = createStore<{ carts: CartModel }>({
  carts: persist(cartModel),
});

export default store;
