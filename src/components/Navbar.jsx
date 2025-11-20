import { Link } from 'react-router-dom'
import { ShoppingCart, Utensils, Search, ChefHat } from 'lucide-react'
import { useCart } from '../context/CartContext'

export default function Navbar() {
  const { cartCount } = useCart()
  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-slate-900/50 bg-slate-900/40 border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-white">
          <div className="w-8 h-8 grid place-items-center rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 shadow-lg shadow-blue-500/30">
            <Utensils size={18} />
          </div>
          <span className="font-semibold tracking-tight">NeonEats</span>
        </Link>
        <div className="hidden md:flex items-center gap-2 text-slate-300 bg-white/5 border border-white/10 rounded-lg px-3 py-1.5">
          <Search size={16} />
          <input placeholder="Search dishes or restaurants" className="bg-transparent outline-none placeholder:text-slate-400 text-sm w-64" />
        </div>
        <nav className="flex items-center gap-4">
          <Link to="/admin" className="text-slate-300 hover:text-white text-sm flex items-center gap-2">
            <ChefHat size={18} /> Admin
          </Link>
          <Link to="/cart" className="relative inline-flex items-center gap-2 text-white bg-gradient-to-r from-blue-600 to-cyan-500 px-3 py-1.5 rounded-lg shadow-lg shadow-blue-500/30">
            <ShoppingCart size={18} />
            <span className="text-sm font-medium">Cart</span>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 text-[10px] bg-pink-500 text-white rounded-full w-5 h-5 grid place-items-center">{cartCount}</span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  )
}
