import './App.css'
import { useEffect } from 'react'
import { useTelegram } from './hooks/useTelegram'
import { Routes, Route } from 'react-router-dom'
import ProductList from './components/ProductList/ProductList'
import Form from './components/Form/Form'
import Header from './components/Header/Header'
import ProductInfo from './components/ProductInfo/ProductInfo'
import { CartProvider } from './contexts/CartContext'

function App() {
  const { tg } = useTelegram();

  useEffect(() => {
    if (tg && typeof tg.ready === 'function') {
      tg.ready()
    }
  }, [])

  return (
    <CartProvider>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/form" element={<Form />} />
          <Route path='/info' element={<ProductInfo />} />
        </Routes>
      </div>
    </CartProvider>
  )
}

export default App
