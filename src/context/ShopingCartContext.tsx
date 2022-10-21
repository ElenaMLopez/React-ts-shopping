import { createContext, ReactNode, useContext, useState } from "react";
import ShopingCart from "../components/ShopingCart";

type ShopingCartProviderProps = {
  children: ReactNode
}

type ShopingCartContext = {
  openCart: () => void,
  closeCart: () => void,
  getItemQuantity: (id: number) => number
  increaseCartQuantity: (id: number) => void
  decreaseCartQuantity: (id: number) => void
  removeFromCart: (id: number) => void,
  cartQuantity: number,
  cartItems: CartItem[],
}
type CartItem = {
  id: number
  quantity: number
}
// Custom Hook
const ShopingCartContext = createContext({} as ShopingCartContext)
export function useShopingCart() {
  return useContext(ShopingCartContext)
}

// Cart provider
export function ShoppingCartProvider({ children }: ShopingCartProviderProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [cartItems, setCardItems] = useState<CartItem[]>([])
  const cartQuantity = cartItems.reduce((quantity, item) => item.quantity + quantity, 0)

  // Functions for ShopingCarContext
  const openCart = () => setIsOpen(true)
  const closeCart = () => setIsOpen(false)
  function getItemQuantity(id: number) { 
    return  cartItems.find(item => item.id === id)?.quantity || 0
  }
  function increaseCartQuantity(id: number) {
    setCardItems(currtItems => {
      if(currtItems.find(item => item.id === id) == null) {
        return [...currtItems, {id, quantity: 1}]
      } else {
        return currtItems.map((item): CartItem => {
          if (item.id === id) {
            return {...item, quantity: item.quantity + 1}
        } else {
          return item
        }})
      }
    })
  }
  function decreaseCartQuantity(id: number) {
    setCardItems(currtItems => {
      if(currtItems.find(item => item.id === id)?.quantity === 1) {
        return currtItems.filter(item => item.id !== id)
      } else {
        return currtItems.map((item): CartItem => {
          if (item.id === id) {
            return {...item, quantity: item.quantity - 1}
        } else {
          return item
        }})
      }
    })
  }
  function removeFromCart(id: number) {
    setCardItems(currenItems => {
      return currenItems.filter(item => item.id !== id)
    })
  }

  return(
    <ShopingCartContext.Provider value={{ 
      getItemQuantity, 
      increaseCartQuantity, 
      decreaseCartQuantity, 
      removeFromCart,
      cartItems,
      cartQuantity,
      openCart,
      closeCart
    }}>
      { children }
      <ShopingCart isOpen={isOpen} />
    </ShopingCartContext.Provider>
  )
}