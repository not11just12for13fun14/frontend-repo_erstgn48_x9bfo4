import { useEffect, useState } from 'react'
import { Star, Plus, Leaf } from 'lucide-react'
import { useCart } from '../context/CartContext'

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function Menu() {
  const [restaurant, setRestaurant] = useState(null)
  const [items, setItems] = useState([])
  const { addToCart } = useCart()

  useEffect(() => {
    const load = async () => {
      // ensure seed
      await fetch(`${API}/seed`, { method: 'POST' }).catch(()=>{})
      const restaurants = await (await fetch(`${API}/restaurants`)).json()
      if (restaurants.length) {
        setRestaurant(restaurants[0])
        const menu = await (await fetch(`${API}/restaurants/${restaurants[0]._id}/menu`)).json()
        setItems(menu)
      }
    }
    load()
  }, [])

  if (!restaurant) return (
    <section id="menu" className="py-12">
      <div className="max-w-6xl mx-auto px-4 text-slate-300">Loading menu...</div>
    </section>
  )

  return (
    <section id="menu" className="py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="text-2xl font-semibold text-white">{restaurant.name}</h2>
            <p className="text-slate-400 text-sm">{restaurant.description}</p>
          </div>
          <div className="flex items-center gap-2 text-yellow-400"><Star size={16}/> {restaurant.rating}</div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((item)=> (
            <div key={item._id} className="rounded-xl bg-white/5 border border-white/10 p-4 hover:bg-white/10 transition">
              <div className="aspect-video rounded-lg bg-slate-800/50 mb-3 overflow-hidden">
                {item.image && <img src={item.image+"?auto=format&fit=crop&w=800&q=60"} className="w-full h-full object-cover" />}
              </div>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-white font-medium">{item.title}</h3>
                  <p className="text-slate-400 text-sm line-clamp-2">{item.description}</p>
                  <div className="mt-2 flex items-center gap-2 text-xs text-slate-400">
                    {item.is_veg && <span className="inline-flex items-center gap-1"><Leaf size={12}/> Veg</span>}
                    {item.is_popular && <span className="text-pink-300">Popular</span>}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-white font-semibold">${item.price.toFixed(2)}</div>
                  <button onClick={()=>addToCart(item)} className="mt-2 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-sm">
                    <Plus size={16}/> Add
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
