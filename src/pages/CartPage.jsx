import Navbar from '../components/Navbar'
import Cart from '../components/Cart'

export default function CartPage(){
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      <Navbar />
      <Cart />
    </div>
  )
}
