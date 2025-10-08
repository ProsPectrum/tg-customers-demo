import React, { useEffect, useMemo, useState } from 'react'
import { useTelegram } from '../../hooks/useTelegram'
import { useNavigate } from 'react-router-dom'
import ProductItem from '../ProductItem/ProductItem'
import './ProductList.css'

import redVape from '../../images/red-vape.png'
import blueVape from '../../images/blue-vape.png'
import purpleVape from '../../images/purple-vape.png'
import yellowVape from '../../images/yellow-vape.png'
import greenVape from '../../images/green-vape.png'
import blackVape from '../../images/black-vape.png'

const products = [
  {id: 1, title: 'ASPIRE GOTEK X', price: 15, description: 'RED', image: redVape},
  {id: 2, title: 'ASPIRE GOTEK X', price: 15, description: 'BLUE', image: blueVape},
  {id: 3, title: 'ASPIRE GOTEK X', price: 15, description: 'PURPLE', image: purpleVape},
  {id: 4, title: 'ASPIRE GOTEK X', price: 15, description: 'YELLOW', image: yellowVape},
  {id: 5, title: 'ASPIRE GOTEK X', price: 15, description: 'GREEN', image: greenVape},
  {id: 6, title: 'ASPIRE GOTEK X', price: 15, description: 'BLACK', image: blackVape}
]

const getTotalPrice = (cart = []) => {
  return cart.reduce((sum, item) => {
    return sum += item.productPrice * item.pieces
  }, 0);
}

const ProductList = () => {
  const [cart, setCart] = useState([]);
  const { tg } = useTelegram();
  const navigate = useNavigate();

  const totalPrice = useMemo(() => getTotalPrice(cart), [cart]);

  useEffect(() => {
    if (!tg) return;
    if (cart.length > 0) {
      tg.MainButton.show();
      tg.MainButton.setText(`Uz grozu ${totalPrice}€`);
      tg.MainButton.onClick(() => {
        navigate('/form', { state: { userCart: cart } })
      });
    } else {
      tg.MainButton.hide();
      tg.MainButton.offClick && tg.MainButton.offClick(() => {});
    }
  }, [cart, totalPrice, tg, navigate]);

  const onAdd = (product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.productId === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.productId === product.id
            ? { ...item, pieces: item.pieces + 1 }
            : item
        );
      }
      return [...prevCart, 
        { productId: product.id,
         productPrice: product.price, 
         productTitle: product.title,
         productDescription: product.description,
         pieces: 1 
        }];
    });
  }

  return (
    <>
      <div className='list'>
        {products.map(item => (
          <ProductItem key={item.id} product={item} onAdd={onAdd} className={'item'} />
        ))}
      </div>
    </>
  )
}

export default ProductList;