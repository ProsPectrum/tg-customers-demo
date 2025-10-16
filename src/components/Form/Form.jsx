import React, { useEffect, useMemo } from 'react'
import './Form.css'
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useTelegram } from '../../hooks/useTelegram';
import '../Button/Button.css';
import CartItem from '../CartItem/CartItem';

const Form = () => {
  const { tg, onClose } = useTelegram();

  const location = useLocation();
  const [userCart, setUserCart] = useState(location.state?.userCart);

  const [deliveryTime, setDeliveryTime] = useState('1');
  const [paymentType, setPaymentType] = useState('1');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [additionalInformation, setAdditionalInformation] = useState('');

  useEffect(() => {
    tg.MainButton.setText("Sūtīt");
    tg.MainButton.onClick(() => {
        onClose();
    });
  }, [])

  const onChangeDeliveryTime = (e) => {
    setDeliveryTime(e.target.value);
  }

  const onChangePaymentType = (e) => {
    setPaymentType(e.target.value);
  }

  const onChangeDeliveryAddress = (e) => {
    setDeliveryAddress(e.target.value);
  }

  const onChangeAdditionalInformation = (e) => {
    setAdditionalInformation(e.target.value);
  }

  const onAdd = (product) => {
    setUserCart(prevCart => {
        return prevCart.map(item =>
          item.productId === product.productId
            ? { ...item, pieces: item.pieces + 1 }
            : item
        );
    });
  }

  const onReduce = (product) => {
    setUserCart(prevCart => {
        return prevCart.map(item =>
          item.productId === product.productId
            ? { ...item, pieces: item.pieces - 1 }
            : item
        );
    });
  }
  
  const getTotalPrice = (cart = []) => {
    return cart.reduce((sum, item) => {
      return sum += item.productPrice * item.pieces
    }, 0);
  }

  const totalPrice = useMemo(() => getTotalPrice(userCart), [userCart]);

  return (
    <div className="form">
        <h3>Tavs iepirkumu grozs:</h3>
        <div>
          {userCart.length === 0 ? (
            <div>Tavs grozs ir tukšs</div>
          ) : (
            userCart.map(item => (
              <CartItem 
                key={item.productId}
                product={item}
                onAdd={onAdd}
                onReduce={onReduce} />
            ))
          )}
        </div>
        <div className='total-container'>
            <div className='total-cart'>
              <p>Preču kopējā summa:</p>
              <p>{totalPrice}€</p>
            </div>
            <div className='total-shipping'>
              <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '5px', fontFamily: 'OpenSans-Light'}}>   
                <svg style={{marginTop: '1px'}} fill="#ffff" height="24px" width="24px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 333.745 333.745" xml:space="preserve">
                  <g>
                    <g>
                      <g>
                        <path d="M331.545,177.583l-60.663-60.651c-1.406-1.406-3.313-2.196-5.303-2.196c-38.868,0-45.781-0.001-47.646-0.001V83.006     c0-4.142-3.357-7.5-7.5-7.5H7.5c-4.142,0-7.5,3.358-7.5,7.5v142.635c0,4.142,3.358,7.5,7.5,7.5h22.16     c3.4,14.37,16.328,25.098,31.722,25.098c15.394,0,28.321-10.728,31.722-25.098c93.226,0,131.567-0.006,131.94-0.006     c3.398,14.373,16.327,25.104,31.723,25.104s28.324-10.731,31.722-25.104h37.756c4.142,0,7.5-3.358,7.5-7.5v-42.746     C333.745,181.005,333.018,179.054,331.545,177.583z M78.985,225.641c0,0,0,0.001,0,0.002     c-0.004,9.703-7.899,17.596-17.603,17.596c-9.707,0-17.603-7.897-17.603-17.604c0-9.707,7.897-17.604,17.603-17.604     c9.492,0,17.6,7.75,17.603,17.596C78.985,225.632,78.985,225.636,78.985,225.641z M202.931,218.141H93.116     c-3.425-14.508-16.486-25.109-31.734-25.109c-15.238,0-28.303,10.588-31.733,25.109H15V90.506h187.932     C202.932,97.564,202.931,210.939,202.931,218.141z M262.472,129.735l45.663,45.654h-19.833l-45.653-45.654H262.472z      M256.766,243.239c-9.707,0-17.604-7.897-17.604-17.604c0-9.707,7.896-17.604,17.604-17.604c9.706,0,17.603,7.897,17.603,17.604     C274.369,235.342,266.472,243.239,256.766,243.239z M318.746,218.135h-0.001H288.5c-3.416-14.461-16.456-25.104-31.733-25.104     c-15.454,0-28.362,10.819-31.733,25.104h-7.101v-88.4h3.502l58.458,58.457c1.407,1.407,3.315,2.197,5.304,2.197h33.549V218.135z"/>
                      </g>
                    </g>
                  </g>
                </svg>
              Piegāde:</div>
              <p>Bezmaksas</p>
            </div>
            <div className='total-order'>
              <p>Kopējā summa apmaksai:</p>
              <p>{totalPrice}€</p>
            </div>
        </div>
        <h3>Ievadiet piegādes datus</h3>
        <select className="select" value={paymentType} onChange={onChangePaymentType}>
            <option value="1" disabled>Maksājuma veids</option>
            <option value="2">Maksājums skaidrā tikšanās brīdī</option>
            <option value="3">Apmaksa ar karti tikšanās brīdī</option>
            <option value="4">Apmaksa ar kriptovalūtu tikšanās brīdī</option>
        </select>
        <input type="text" placeholder="Adrese" className="input" value={deliveryAddress} onChange={onChangeDeliveryAddress} />
        <select className="select" value={deliveryTime} onChange={onChangeDeliveryTime}>
            <option value="1" disabled>Piegādes laiks</option>
            <option value="2">09:00-12:00</option>
            <option value="3">12:00-14:00</option>
            <option value="4">14:00-16:00</option>
            <option value="5">17:00-20:00</option>
        </select>
        <input type="text" placeholder="Papildu informācija/lūgumi" className="input" value={additionalInformation} onChange={onChangeAdditionalInformation} />
    </div>
  )
}

export default Form