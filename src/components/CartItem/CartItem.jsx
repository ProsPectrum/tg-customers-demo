import React, { useState } from "react";
import './CartItem.css'

const CartItem = ({product, onAdd, onReduce}) => {
    const onReduceHandler = (product) => {
        onReduce(product)
    }

    const onAddHandler = (product) => {
        onAdd(product)
    }

    return (
        <div className="item-container">
            <img src={product.productImage} alt="" className="cart-img"/>
            <div className="content-container">
                <div className="content-top-container">
                    <p className="content-title">{product.productTitle}</p>
                    <p className="content-description">{product.productDescription}</p>
                </div>
                <div className="content-button-container">
                    <button className="qty-btn minus" onClick={onReduceHandler}>-</button>
                    <p style={{fontFamily: 'OpenSans-Bold', fontSize: 17}}>{product.pieces}</p>
                    <button className="qty-btn plus" onClick={onAddHandler}>+</button>
                </div>
                {/* <p className="content-item">{product.pieces} gab.</p> */}
            </div>
            <div className="item-total">
                <p>Kopumā:</p>
                <p>{product.productPrice*product.pieces}€</p>
            </div>
        </div>
    )
}

export default CartItem;