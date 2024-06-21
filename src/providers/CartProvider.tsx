import { CartItem, PizzaSize, Product } from "@/assets/types";
import { PropsWithChildren, createContext, useContext, useState } from "react";
import { randomUUID } from "expo-crypto";

type CartType = {
  items: CartItem[];
  addItem: (product: Product, size: PizzaSize) => void;
  updateQuantity: (itemId: string, amount: -1 | 1) => void;
  removeItem: (itemId: string) => void;
  total: number;
};

const CartContext = createContext<CartType>({
  items: [],
  addItem: () => {},
  updateQuantity: () => {},
  removeItem: () => {},
  total: 0,
});

const CartProvider = ({ children }: PropsWithChildren) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const updateQuantity = (itemId: string, amount: number) => {
    const cartItem = items.find(item => item.id === itemId);

    

    if (cartItem) {
      // check that the quantity doesn't go to zero or negative number
      if (amount === -1 && cartItem.quantity === 1) {
        return;
      }

      setItems(
        items.map((item) =>
          item.id === itemId
            ? { ...item, quantity: item.quantity + amount }
            : item
        )
      );
    }
  };

  const addItem = (product: Product, size: PizzaSize) => {
    const existingItem = items.find(
      (item) => item.product === product && item.size === size
    );
    if (existingItem) {
      //update quantity
      updateQuantity(existingItem.id, 1);
    } else {
      const newCartItem: CartItem = {
        id: randomUUID(), // auto-generated UUID
        product,
        product_id: product.id,
        size,
        quantity: 1,
      };

      setItems([newCartItem, ...items]);
    }
  };

  const removeItem = (itemId: string) => {
    const removedItem = items.find(item => item.id === itemId);
    if (removedItem) {
      setItems(items.filter(item => item.id !== removedItem.id));
    }
  }

  const total = items.reduce((total, item) => total += item.product.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{ items, addItem, updateQuantity, removeItem, total }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context)
    new Error("useCart hook must be called from within the CartProvider");
  return context;
};
