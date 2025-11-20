import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import './index.css'
import { CartProvider } from './context/CartContext'
import CartPage from './pages/CartPage'
import TrackPage from './pages/TrackPage'
import AdminPage from './pages/AdminPage'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/track/:id" element={<TrackPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  </React.StrictMode>,
)
