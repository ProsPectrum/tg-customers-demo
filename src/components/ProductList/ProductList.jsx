import React, { useEffect, useMemo, useState } from 'react'
import { useTelegram } from '../../hooks/useTelegram'
import { useNavigate } from 'react-router-dom'
import ProductItem from '../ProductItem/ProductItem'
import './ProductList.css'

import { vapeProducts, cartridgeProducts, liquidProducts } from '../../data/products'
import { vapeUsageInstructions, vapeCharacteristics, vapeContents } from '../../data/products'

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
        {currentTab === 'vape' && 
        vapeProducts.map(item => {
          const matched = cart.find(c => c.productId === item.id);
          const pieces = matched ? matched.pieces : 0;
          return (
            <ProductItem 
              key={item.id}
              product={item}
              pieces={pieces}
              usageInstructions={vapeUsageInstructions}
              characteristics={vapeCharacteristics}
              contents={vapeContents}
              onAdd={onAdd}
              onReduce={onReduce}
              className={'item'}
            />
          );
        })}
        {currentTab === 'cartridge' && 
        cartridgeProducts.map(item => {
          const matched = cart.find(c => c.productId === item.id);
          const pieces = matched ? matched.pieces : 0;
          return (
            <ProductItem 
              key={item.id}
              product={item}
              pieces={pieces}
              usageInstructions={vapeUsageInstructions}
              characteristics={vapeCharacteristics}
              contents={vapeContents}
              onAdd={onAdd}
              onReduce={onReduce}
              className={'item'}
            />
          );
        })}
        {currentTab === 'liquid' && 
        liquidProducts.map(item => {
          const matched = cart.find(c => c.productId === item.id);
          const pieces = matched ? matched.pieces : 0;
          return (
            <ProductItem 
              key={item.id}
              product={item}
              pieces={pieces}
              usageInstructions={vapeUsageInstructions}
              characteristics={vapeCharacteristics}
              contents={vapeContents}
              onAdd={onAdd}
              onReduce={onReduce}
              className={'item'}
            />
          );
        })}
      </div>
    </div>
  )
}

export default ProductList;