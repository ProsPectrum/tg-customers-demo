import React, { useEffect, useMemo, useState } from 'react'
import { useTelegram } from '../../hooks/useTelegram'
import { useNavigate } from 'react-router-dom'
import ProductItem from '../ProductItem/ProductItem'
import './ProductList.css'
import { useCart } from '../../contexts/CartContext'

import { vapeProducts, cartridgeProducts, liquidProducts } from '../../data/products'
import { vapeUsageInstructions, vapeCharacteristics, vapeContents } from '../../data/products'
import { cartridgeUsageInstructions, cartirdgeCharacteristics, cartridgeContents } from '../../data/products'
import { liquidContents } from '../../data/products'

const getTotalPrice = (cart = []) => {
  return cart.reduce((sum, item) => {
    return sum += item.productPrice * item.pieces
  }, 0);
}

const ProductList = () => {
  const [currentTab, setCurrentTab] = useState('vape');
  const { cart, addToCart, reduceFromCart, getTotalPrice } = useCart();
  const { tg } = useTelegram();
  const navigate = useNavigate();

  const totalPrice = useMemo(() => getTotalPrice(cart), [cart, getTotalPrice]);

  useEffect(() => {
    if (!tg) return;
    if (cart.length > 0) {
      tg.MainButton.show();
      tg.MainButton.setText(`Uz grozu ${totalPrice}€`);
      tg.MainButton.onClick(() => {
        navigate('/form', { state: { userCart: cart } })
        tg.MainButton.hide()
      });
    } else {
      tg.MainButton.hide();
      tg.MainButton.offClick && tg.MainButton.offClick(() => {});
    }
  }, [cart, totalPrice, tg, navigate]);

  const onAdd = (product) => {
    addToCart(product);
  }

  const onReduce = (product) => {
    reduceFromCart(product);
  }

  return (
    <div className='product-container'>
      <div className='tab-container'>
        <button
          className={'tab ' + (currentTab === 'vape' ? 'active' : '')}
          onClick={() => setCurrentTab('vape')}
          >
            E-cigaretes
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
              usageInstructions={cartridgeUsageInstructions}
              characteristics={cartirdgeCharacteristics}
              contents={cartridgeContents}
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
              contents={liquidContents}
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