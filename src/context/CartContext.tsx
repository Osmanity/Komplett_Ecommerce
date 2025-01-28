import { createContext, useContext, useReducer, ReactNode } from "react";

export type CartItem = {
  _id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

type CartState = {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
};

type CartAction =
  | { type: "ADD_ITEM"; item: CartItem }
  | { type: "REMOVE_ITEM"; id: string }
  | { type: "DECREASE_QUANTITY"; id: string }
  | { type: "CLEAR_CART" };

const calculateTotalItems = (items: CartItem[]): number => {
  return items.reduce((total, item) => total + item.quantity, 0);
};

const calculateTotalPrice = (items: CartItem[]): number => {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
};

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const existingItem = state.items.find(
        (item) => item._id === action.item._id
      );

      if (existingItem) {
        const updatedItems = state.items.map((item) =>
          item._id === action.item._id
            ? { ...item, quantity: item.quantity + action.item.quantity }
            : item
        );
        return updateCartTotals(updatedItems);
      }

      return updateCartTotals([...state.items, action.item]);
    }

    case "REMOVE_ITEM": {
      const updatedItems = state.items.filter((item) => item._id !== action.id);
      return updateCartTotals(updatedItems);
    }

    case "DECREASE_QUANTITY": {
      const updatedItems = state.items
        .map((item) => {
          if (item._id !== action.id) return item;
          return { ...item, quantity: item.quantity - 1 };
        })
        .filter((item) => item.quantity > 0);

      return updateCartTotals(updatedItems);
    }

    case "CLEAR_CART":
      return { items: [], totalItems: 0, totalPrice: 0 };

    default:
      return state;
  }
}

function updateCartTotals(items: CartItem[]): CartState {
  return {
    items,
    totalItems: calculateTotalItems(items),
    totalPrice: calculateTotalPrice(items),
  };
}

interface CartContextType {
  state: CartState;
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (id: string) => void;
  decreaseQuantity: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    totalItems: 0,
    totalPrice: 0,
  });

  const addItem = (item: Omit<CartItem, "quantity">) => {
    dispatch({ type: "ADD_ITEM", item: { ...item, quantity: 1 } });
  };

  const removeItem = (id: string) => {
    dispatch({ type: "REMOVE_ITEM", id });
  };

  const decreaseQuantity = (id: string) => {
    dispatch({ type: "DECREASE_QUANTITY", id });
  };

  const updateQuantity = (id: string, quantity: number) => {
    const item = state.items.find((item) => item._id === id);
    if (item) {
      dispatch({ type: "ADD_ITEM", item: { ...item, quantity } });
    }
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  return (
    <CartContext.Provider
      value={{
        state,
        addItem,
        removeItem,
        decreaseQuantity,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
