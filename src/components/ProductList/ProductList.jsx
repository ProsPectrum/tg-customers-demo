import React, { useEffect, useState } from 'react'
import { useTelegram } from '../../hooks/useTelegram'
import { useNavigate } from 'react-router-dom'
import ProductItem from '../ProductItem/ProductItem'
import './ProductList.css'

const products = [
  {id: 1, title: 'ASPIRE GOTEK X', price: 15, description: 'RED'},
  {id: 2, title: 'ASPIRE GOTEK X', price: 15, description: 'BLUE'},
  {id: 3, title: 'ASPIRE GOTEK X', price: 15, description: 'PURPLE'},
  {id: 4, title: 'ASPIRE GOTEK X', price: 15, description: 'YELLOW'},
  {id: 5, title: 'ASPIRE GOTEK X', price: 15, description: 'GREEN'},
  {id: 6, title: 'ASPIRE GOTEK X', price: 15, description: 'BLACK'}
]

const getTotalPrice = (cart = []) => {
  return cart.reduce((sum, item) => {
    return sum += item.price
  }, 0);
}

const ProductList = () => {
  const { cart, setCart } = useState();
  const { tg } = useTelegram();
  const navigate = useNavigate();

  const onAdd = (product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.productId === product.id);
  
      if (existingItem) {
        // обновляем количество
        return prevCart.map(item =>
          item.productId === product.id
            ? { ...item, pieces: item.pieces + 1 }
            : item
        );
      } else {
        // добавляем новый товар
        return [...prevCart, { productId: product.id, pieces: 1 }];
      }
    });

    if (cart.length > 0) {
      tg.MainButton.show();
      tg.MainButton.setText(`Uz grozu ${getTotalPrice(cart)}€`);
    }
    else {
      tg.MainButton.hide();
    }
  }

  useEffect(() => {
    tg.MainButton.setText("Turpināt");
    tg.MainButton.onClick(() => {
        navigate('/form')
    });
  }, [])

  return (
    <>
      <div className='list'>
        {products.map(item => {
          <ProductItem key={item.id} product={item} onAdd={onAdd} className={'item'}/>
        })}
      </div>
    </>
  )
}

export default ProductList