import { useEffect, useState } from 'react'
import { MapPin, Bike, CheckCircle2, Clock, ChefHat } from 'lucide-react'

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function Tracker({ orderId }) {
  const [status, setStatus] = useState({ status: 'placed', eta_minutes: 40 })

  useEffect(() => {
    const fetchStatus = async () => {
      const res = await fetch(`${API}/orders/${orderId}/status`)
      const data = await res.json()
      setStatus(data)
    }
    fetchStatus()
    const id = setInterval(fetchStatus, 10000)
    return () => clearInterval(id)
  }, [orderId])

  const steps = [
    { key: 'placed', label: 'Order placed', icon: <Clock size={16} /> },
    { key: 'confirmed', label: 'Confirmed', icon: <CheckCircle2 size={16} /> },
    { key: 'preparing', label: 'Preparing', icon: <ChefHat size={16} /> },
    { key: 'out_for_delivery', label: 'On the way', icon: <Bike size={16} /> },
    { key: 'delivered', label: 'Delivered', icon: <MapPin size={16} /> },
  ]

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 text-white">
      <h2 className="text-2xl font-semibold mb-2">Tracking order</h2>
      <p className="text-slate-300 mb-6">ETA: {status.eta_minutes} min</p>
      <div className="space-y-3">
        {steps.map((s, idx) => {
          const active = steps.findIndex((st)=>st.key===status.status) >= idx
          return (
            <div key={s.key} className={`flex items-center gap-3 p-3 rounded-lg border ${active ? 'bg-white/10 border-white/20' : 'bg-white/5 border-white/10 text-slate-400'}`}>
              <div className="w-8 h-8 grid place-items-center bg-white/10 rounded text-cyan-300">{s.icon}</div>
              <div>{s.label}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
