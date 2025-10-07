import './App.css'
import { useEffect } from 'react'
import { useTelegram } from './hooks/useTelegram'
import Header from './components/Header/Header'
import { Routes, Route } from 'react-router-dom'
import ProductList from './components/ProductList/ProductList'
import Form from './components/Form/Form'

function App() {
  const { tg } = useTelegram();

  useEffect(() => {
    tg.ready()
  }, [])

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/form" element={<Form />} />
      </Routes>
      {/* <button onClick={onToggleButton}>Toggle</button> */}
    </div>
  )
}

export default App
