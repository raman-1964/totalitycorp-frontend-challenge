export const cartReducer = (state, action) => {
  switch (action.type) {
    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter((p) => p.id !== action.payload.id),
      };
    case "REMOVE_FROM_CART_ALL":
      return {
        ...state,
        cart: [],
      };
    case "ADD_TO_CART":
      return {
        ...state,
        cart: [...state.cart, { ...action.payload, qty: 1 }],
      };
    case "CHANGE_QTY":
      return {
        ...state,
        cart: state.cart.filter((c) =>
          c.id === action.payload.id ? (c.qty = action.payload.qty) : c.qty
        ),
      };
    default:
      return state;
  }
};

export const pReducer = (state, action) => {
  switch (action.type) {
    case "SORT_BY_PRICE":
      return {
        ...state,
        sort: action.payload,
      };

    case "FILTER_BY_DELIVERY":
      return {
        ...state,
        byFastDelivery: !state.byFastDelivery,
      };

    case "FILTER_BY_RATING":
      return {
        ...state,
        byRating: action.payload,
      };

    case "SEARCH_QUERY":
      return {
        ...state,
        bySearch: action.payload,
      };

    case "CLEAR_FILTER":
      return {
        sort: "",
        byFastDelivery: false,
        byRating: 0,
        bySearch: "",
      };

    default:
      return state;
  }
};
