import React from 'react'
import './Form.css'
import { useState } from 'react';
import { useTelegram } from '../../hooks/useTelegram';
import '../Button/Button.css';

const Form = () => {
  const [deliveryTime, setDeliveryTime] = useState('1');
  const [paymentType, setPaymentType] = useState('1');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [additionalInformation, setAdditionalInformation] = useState('');

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
        <h3>Ievadiet savus datus</h3>
        <select className="select" value={deliveryTime} onChange={onChangeDeliveryTime}>
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
        <button className="button">Sūtīt</button>
    </div>
  )
}

export default Form