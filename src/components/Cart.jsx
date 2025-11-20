import { useState } from 'react'
import { Trash2, Loader2 } from 'lucide-react'
import { useCart } from '../context/CartContext'

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function Cart() {
  const { items, removeFromCart, updateQty, subtotal, delivery, tax, total, clearCart } = useCart()
  const [placing, setPlacing] = useState(false)
  const [orderId, setOrderId] = useState(null)

  const placeOrder = async () => {
    setPlacing(true)
    try {
      const payload = {
        restaurant_id: items[0]?.restaurant_id,
        user_name: 'Guest',
        user_phone: '000-000-0000',
        user_address: '123 Future St',
        items: items.map(i=> ({ menu_item_id: i._id, title: i.title, qty: i.qty, price: i.price }))
      }
      const res = await fetch(`${API}/orders`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(payload)})
      const data = await res.json()
      setOrderId(data.order_id)
      clearCart()
    } finally {
      setPlacing(false)
    }
  }

  if (orderId) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-white">
          <h2 className="text-2xl font-semibold mb-2">Order placed!</h2>
          <p className="text-slate-300 mb-4">Your order ID is {orderId}. You can track it below.</p>
          <a href={`/track/${orderId}`} className="inline-block px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500">Track Order</a>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 text-white">
      <h2 className="text-2xl font-semibold mb-6">Your Cart</h2>
      {items.length === 0 ? (
        <div className="text-slate-400">Your cart is empty.</div>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-3">
            {items.map(item => (
              <div key={item._id} className="bg-white/5 border border-white/10 rounded-lg p-4 flex items-center gap-4">
                <div className="flex-1">
                  <div className="font-medium">{item.title}</div>
                  <div className="text-slate-400 text-sm">${item.price.toFixed(2)}</div>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={()=>updateQty(item._id, item.qty-1)} className="px-2 rounded bg-white/10">-</button>
                  <span>{item.qty}</span>
                  <button onClick={()=>updateQty(item._id, item.qty+1)} className="px-2 rounded bg-white/10">+</button>
                </div>
                <button onClick={()=>removeFromCart(item._id)} className="text-red-300 hover:text-red-200"><Trash2/></button>
              </div>
            ))}
          </div>
          <div className="bg-white/5 border border-white/10 rounded-lg p-4">
            <div className="flex justify-between mb-2 text-slate-300"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
            <div className="flex justify-between mb-2 text-slate-300"><span>Delivery</span><span>${delivery.toFixed(2)}</span></div>
            <div className="flex justify-between mb-4 text-slate-300"><span>Tax</span><span>${tax.toFixed(2)}</span></div>
            <div className="flex justify-between text-white font-semibold text-lg mb-4"><span>Total</span><span>${total.toFixed(2)}</span></div>
            <button disabled={placing || items.length===0} onClick={placeOrder} className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 disabled:opacity-60">
              {placing && <Loader2 className="animate-spin" size={16}/>} Place Order
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
