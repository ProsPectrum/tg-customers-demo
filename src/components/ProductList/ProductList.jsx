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
import pod from '../../images/pod.png'
import liquid from '../../images/liquid.png'

const vapeProducts = [
  {id: 'vape-1', title: 'ASPIRE GOTEK X', price: 15, description: 'RED', image: redVape},
  {id: 'vape-2', title: 'ASPIRE GOTEK X', price: 15, description: 'BLUE', image: blueVape},
  {id: 'vape-3', title: 'ASPIRE GOTEK X', price: 15, description: 'PURPLE', image: purpleVape},
  {id: 'vape-4', title: 'ASPIRE GOTEK X', price: 15, description: 'YELLOW', image: yellowVape},
  {id: 'vape-5', title: 'ASPIRE GOTEK X', price: 15, description: 'GREEN', image: greenVape},
  {id: 'vape-6', title: 'ASPIRE GOTEK X', price: 15, description: 'BLACK', image: blackVape}
]

const cartridgeProducts = [
  {id: 'cartridge-1', title: 'DOUBLE APPLE', price: 10, description: 'Kārtridžs', image: pod},
  {id: 'cartridge-2', title: 'ICE GRAPE', price: 10, description: 'Kārtridžs', image: pod},
  {id: 'cartridge-3', title: 'LUSH ICE', price: 10, description: 'Kārtridžs', image: pod},
  {id: 'cartridge-4', title: 'STRAWBERRY CAKE', price: 10, description: 'Kārtridžs', image: pod},
  {id: 'cartridge-5', title: 'BLUE RAZZ', price: 10, description: 'Kārtridžs', image: pod},
  {id: 'cartridge-6', title: 'FOREST BERRIES', price: 10, description: 'Kārtridžs', image: pod}
]

const liquidProducts = [
  {id: 'liquid-1', title: 'DOUBLE APPLE', price: 5, description: 'Šķidrums', image: liquid},
  {id: 'liquid-2', title: 'ICE GRAPE', price: 5, description: 'Šķidrums', image: liquid},
  {id: 'liquid-3', title: 'LUSH ICE', price: 5, description: 'Šķidrums', image: liquid},
  {id: 'liquid-4', title: 'STRAWBERRY CAKE', price: 5, description: 'Šķidrums', image: liquid},
  {id: 'liquid-5', title: 'BLUE RAZZ', price: 5, description: 'Šķidrums', image: liquid},
  {id: 'liquid-6', title: 'FOREST BERRIES', price: 5, description: 'Šķidrums', image: liquid}
]

const getTotalPrice = (cart = []) => {
  return cart.reduce((sum, item) => {
    return sum += item.productPrice * item.pieces
  }, 0);
}

const ProductList = () => {
  const [currentTab, setCurrentTab] = useState('vape');
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

  const onReduce = (product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.productId === product.id);
      if (!existingItem) return prevCart;
      if (existingItem.pieces <= 1) {
        return prevCart.filter(item => item.productId !== product.id);
      }
      return prevCart.map(item =>
        item.productId === product.id
          ? { ...item, pieces: item.pieces - 1 }
          : item
      );
    });
  }

  return (
    <div className='product-container'>
      <div className='tab-container'>
        <button
          className={'tab ' + (currentTab === 'vape' ? 'active' : '')}
          onClick={() => setCurrentTab('vape')}
          >
            Ierīces
        </button>
        <button 
          className={'tab ' + (currentTab === 'cartridge' ? 'active' : '')}
          onClick={() => setCurrentTab('cartridge')}
          >
            Kārtridži
        </button>
        <button 
          className={'tab ' + (currentTab === 'liquid' ? 'active' : '')}
          onClick={() => setCurrentTab('liquid')}
          >
            Šķidrumi
        </button>
      </div>
      <div className='list'>
        {currentTab === 'vape' ? 
        vapeProducts.map(item => {
          const matched = cart.find(c => c.productId === item.id);
          const pieces = matched ? matched.pieces : 0;
          return (
            <ProductItem 
              key={item.id}
              product={item}
              pieces={pieces}
              onAdd={onAdd}
              onReduce={onReduce}
              className={'item'}
            />
          );
        }) : <></>}
        {currentTab === 'cartridge' ? 
        cartridgeProducts.map(item => {
          const matched = cart.find(c => c.productId === item.id);
          const pieces = matched ? matched.pieces : 0;
          return (
            <ProductItem 
              key={item.id}
              product={item}
              pieces={pieces}
              onAdd={onAdd}
              onReduce={onReduce}
              className={'item'}
            />
          );
        }) : <></>}
        {currentTab === 'liquid' ? 
        liquidProducts.map(item => {
          const matched = cart.find(c => c.productId === item.id);
          const pieces = matched ? matched.pieces : 0;
          return (
            <ProductItem 
              key={item.id}
              product={item}
              pieces={pieces}
              onAdd={onAdd}
              onReduce={onReduce}
              className={'item'}
            />
          );
        }) : <></>}
      </div>
    </div>
  )
}

export default ProductList;