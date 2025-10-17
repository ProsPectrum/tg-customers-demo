import React, { createContext, useContext, useState } from 'react'

const CartContext = createContext()

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([])

  const addToCart = (product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.productId === product.id)
      if (existingItem) {
        return prevCart.map(item =>
          item.productId === product.id
            ? { ...item, pieces: item.pieces + 1 }
            : item
        )
      }
      return [...prevCart, 
        { 
          productId: product.id,
          productPrice: product.price, 
          productTitle: product.title,
          productDescription: product.description,
          pieces: 1 
        }]
    })
  }

  const reduceFromCart = (product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.productId === product.id)
      if (!existingItem) return prevCart
      if (existingItem.pieces <= 1) {
        return prevCart.filter(item => item.productId !== product.id)
      }
      return prevCart.map(item =>
        item.productId === product.id
          ? { ...item, pieces: item.pieces - 1 }
          : item
      )
    })
  }

  const getTotalPrice = (cartItems = cart) => {
    return cartItems.reduce((sum, item) => {
      return sum += item.productPrice * item.pieces
    }, 0)
  }

  const value = {
    cart,
    setCart,
    addToCart,
    reduceFromCart,
    getTotalPrice
  }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}
