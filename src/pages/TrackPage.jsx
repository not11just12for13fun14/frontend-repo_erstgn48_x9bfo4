import Navbar from '../components/Navbar'
import Tracker from '../components/Tracker'
import { useParams } from 'react-router-dom'

export default function TrackPage(){
  const { id } = useParams()
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      <Navbar />
      <Tracker orderId={id} />
    </div>
  )
}
