import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section className="pt-28 pb-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(500px_200px_at_20%_-10%,rgba(59,130,246,0.3),transparent),radial-gradient(600px_240px_at_80%_-10%,rgba(34,211,238,0.25),transparent)]"/>
      <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-10 items-center relative">
        <div>
          <motion.h1 initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.1}} className="text-5xl md:text-6xl font-bold text-white tracking-tight">
            Futuristic food, delivered fast
          </motion.h1>
          <motion.p initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.2}} className="mt-4 text-lg text-slate-300">
            Explore a curated menu from top-rated spots around you. Track your order in real-time with a sleek neon interface.
          </motion.p>
          <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.3}} className="mt-6 flex gap-3">
            <a href="#menu" className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-medium shadow-lg shadow-blue-500/30">Browse Menu</a>
            <a href="/admin" className="px-5 py-2.5 rounded-lg bg-white/10 border border-white/10 text-white hover:bg-white/15">Admin</a>
          </motion.div>
        </div>
        <motion.div initial={{opacity:0,scale:0.95}} animate={{opacity:1,scale:1}} transition={{delay:0.2}} className="relative">
          <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10 p-6">
            <div className="grid grid-cols-3 gap-3">
              {[...Array(6)].map((_,i)=> (
                <div key={i} className="rounded-xl h-28 bg-white/5 border border-white/10"/>
              ))}
            </div>
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-blue-500/0 via-blue-500/10 to-cyan-400/0 blur-2xl"/>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
