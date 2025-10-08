import React, { useEffect } from 'react'
import './Form.css'
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useTelegram } from '../../hooks/useTelegram';
import '../Button/Button.css';

const Form = () => {
  const { tg, onClose } = useTelegram();

  const location = useLocation();
  const userCart = location.state?.userCart || [];

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

  return (
    <div className="form">
        <h3>Tavs iepirkumu grozs:</h3>
        <div>
          {userCart.length === 0 ? (
            <div>Tavs grozs ir tukšs</div>
          ) : (
            userCart.map(item => (
              <div key={item.productId}>
                {item.productTitle} | {item.productDescription} — {item.pieces} gab. × {item.productPrice}€
              </div>
            ))
          )}
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