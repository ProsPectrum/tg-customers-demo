import './App.css'
import { useEffect } from 'react'

function App() {
  const { onToggleButton, tg } = useTelegram();

  useEffect(() => {
    tg.ready()
  }, [])

  return (
    <div className="App">
      <button onClick={onToggleButton}>Toggle</button>
    </div>
  )
}

export default App
