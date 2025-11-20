import { useEffect, useState } from 'react'

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function Admin() {
  const [data, setData] = useState(null)

  useEffect(() => {
    const load = async () => {
      const res = await fetch(`${API}/admin/overview`)
      const json = await res.json()
      setData(json)
    }
    load()
  }, [])

  if (!data) return <div className="max-w-6xl mx-auto px-4 py-12 text-slate-300">Loading...</div>

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 text-white">
      <h2 className="text-2xl font-semibold mb-6">Admin Dashboard</h2>
      <div className="grid md:grid-cols-3 gap-4 mb-8">
        <StatCard label="Orders" value={data.orders} />
        <StatCard label="Restaurants" value={data.restaurants} />
        <StatCard label="Menu Items" value={data.menu_items} />
      </div>

      <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
        <div className="px-4 py-3 border-b border-white/10 text-slate-300">Latest Orders</div>
        <div className="divide-y divide-white/5">
          {data.latest_orders.map((o)=> (
            <div key={o._id} className="px-4 py-3 flex items-center justify-between text-sm">
              <div>ID: <span className="text-slate-300 font-mono">{o._id}</span></div>
              <div className="text-slate-300">{o.items?.length || 0} items</div>
              <div className="font-semibold">${o.total?.toFixed?.(2) || o.total}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function StatCard({ label, value }) {
  return (
    <div className="rounded-xl bg-white/5 border border-white/10 p-4">
      <div className="text-slate-300 text-sm">{label}</div>
      <div className="text-2xl font-semibold">{value}</div>
    </div>
  )
}
