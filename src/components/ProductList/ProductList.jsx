import React from 'react'
import { useTelegram } from '../../hooks/useTelegram'
import { useEffect } from 'react'

const ProductList = () => {
  const { onToggleButton, tg } = useTelegram();

  useEffect(() => {
    tg.MainButton.setText("➡️ Turpināt");
    tg.MainButton.onClick(() => {
        navigate('/form')
    })
  }, [])

  return (
    <>
      <div>ProductList</div>
      <button onClick={onToggleButton}>Toggle</button>
    </>
  )
}

export default ProductList