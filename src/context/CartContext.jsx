import { createContext, useContext, useMemo, useState } from 'react'

const CartContext = createContext()

export function CartProvider({ children }) {
  const [items, setItems] = useState([])

  const addToCart = (menuItem) => {
    setItems((prev) => {
      const existing = prev.find((i) => i._id === menuItem._id)
      if (existing) {
        return prev.map((i) => (i._id === menuItem._id ? { ...i, qty: i.qty + 1 } : i))
      }
      return [...prev, { ...menuItem, qty: 1 }]
    })
  }

  const removeFromCart = (id) => setItems((prev) => prev.filter((i) => i._id !== id))
  const updateQty = (id, qty) => setItems((prev) => prev.map((i) => (i._id === id ? { ...i, qty: Math.max(1, qty) } : i)))
  const clearCart = () => setItems([])

  const totals = useMemo(() => {
    const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0)
    const delivery = subtotal < 30 && subtotal > 0 ? 2.99 : 0
    const tax = +(subtotal * 0.08).toFixed(2)
    const total = +(subtotal + delivery + tax).toFixed(2)
    return { subtotal: +subtotal.toFixed(2), delivery, tax, total }
  }, [items])

  const value = {
    items,
    addToCart,
    removeFromCart,
    updateQty,
    clearCart,
    cartCount: items.reduce((n, i) => n + i.qty, 0),
    ...totals,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export const useCart = () => useContext(CartContext)
