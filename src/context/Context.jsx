import React, { createContext, useContext, useReducer } from "react";
import faker from "faker";
import { cartReducer, pReducer } from "./Reducer";

const Cart = createContext();
// faker.seed(99);
const Context = ({ children }) => {
  const products = [...Array(30)].map(() => ({
    id: faker.datatype.uuid(),
    name: faker.commerce.productName(),
    price: faker.commerce.price(),
    image: faker.random.image(),
    inStock: faker.random.arrayElement([1, 2, 3, 4, 5]),
    fastDelivery: faker.datatype.boolean(),
    rating: faker.random.arrayElement([1, 2, 3, 4, 5]),
  }));

  const [state, dispatch] = useReducer(cartReducer, {
    products: products,
    cart: [],
  });

  const [pState, pDispatch] = useReducer(pReducer, {
    sort: "",
    byFastDelivery: false,
    byRating: 0,
    bySearch: "",
  });

  return (
    <Cart.Provider value={{ state, dispatch, pState, pDispatch }}>
      {children}
    </Cart.Provider>
  );
};
export default Context;

export const CartState = () => {
  return useContext(Cart);
};
