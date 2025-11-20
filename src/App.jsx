import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Menu from './components/Menu'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      <Navbar />
      <Hero />
      <Menu />
      <footer className="mt-12 py-10 text-center text-slate-400">© 2025 NeonEats</footer>
    </div>
  )
}

export default App
