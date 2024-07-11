import {
  INCREMENT_QUANTITY,
  DECREMENT_QUANTITY,
  ADD_TO_CART,
  UPDATE_QUANTITY,
  REMOVE_FROM_CART,
  CLEAR_CART,
} from "../actions/cartActions";

const initialState = {
  quantities: {},
  items: {},
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART: {
      const { id, title, price, thumbnail } = action.payload;
      const existingItem = state.items[id];
      return {
        ...state,
        items: {
          ...state.items,
          [id]: existingItem
            ? { ...existingItem, quantity: existingItem.quantity + 1 }
            : { id, title, price, thumbnail, quantity: 1 },
        },
      };
    }
    case UPDATE_QUANTITY: {
      const { productId, quantity } = action.payload;
      return {
        ...state,
        items: {
          ...state.items,
          [productId]: {
            ...state.items[productId],
            quantity: Math.max(quantity, 0),
          },
        },
      };
    }
    case REMOVE_FROM_CART: {
      const newItems = { ...state.items };
      delete newItems[action.payload];
      return {
        ...state,
        items: newItems,
      };
    }
    case CLEAR_CART: {
      return {
        ...state,
        items: {},
      };
    }
    case INCREMENT_QUANTITY:
      return {
        ...state,
        quantities: {
          ...state.quantities,
          [action.payload]: (state.quantities[action.payload] || 0) + 1,
        },
      };
    case DECREMENT_QUANTITY:
      return {
        ...state,
        quantities: {
          ...state.quantities,
          [action.payload]: Math.max(
            (state.quantities[action.payload] || 0) - 1,
            0
          ),
        },
      };
    default:
      return state;

    case "ADD_TO_CART":
      return {
        ...state,
        items: {
          ...state.items,
          [action.payload.id]: {
            ...action.payload,
            quantity: state.items[action.payload.id]
              ? state.items[action.payload.id].quantity + 1
              : 1,
          },
        },
      };
    case "REMOVE_ITEM":
      const { [action.payload]: _, ...rest } = state.items;
      return {
        ...state,
        items: rest,
      };
    case "CLEAR_CART":
      return {
        ...state,
        items: {},
      };
    case "UPDATE_QUANTITY":
      return {
        ...state,
        items: {
          ...state.items,
          [action.payload.id]: {
            ...state.items[action.payload.id],
            quantity: action.payload.quantity,
          },
        },
      };
    case "SET_CART":
      return {
        ...state,
        items: action.payload,
      };
  }
};

export default cartReducer;
