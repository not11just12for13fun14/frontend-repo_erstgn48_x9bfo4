import Navbar from '../components/Navbar'
import Admin from '../components/Admin'

export default function AdminPage(){
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      <Navbar />
      <Admin />
    </div>
  )
}
