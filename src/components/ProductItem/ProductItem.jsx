import React from "react";
import './ProductItem.css'
import Button from '../Button/Button'
import { useTelegram } from "../../hooks/useTelegram";

const ProductItem = ({product, className, pieces = 0, onAdd, onReduce}) => {
    const { onToggleButton } = useTelegram();
    const onAddHandler = () => {
        onAdd(product);
        onToggleButton();
    }

    const onReduceHandler = () => {
        onReduce && onReduce(product);
        onToggleButton();
    }

    return (
        <div className={"product "+ className}>
            <div className="img">
                {pieces > 0 && (
                    <div className="badge">{pieces}</div>
                )}
                <img style={{width: 'auto', height: "100%"}} src={product.image} alt="" />
            </div>
            <div className="title">{product.title}</div>
            {/* <div className="description">{product.description}</div> */}
            <div className="price">{product.price}€</div>
            {pieces === 0 ? (
                <button className={'add-btn'} onClick={onAddHandler}>
                    PIEVIENOT
                </button>
            ) : (
                <div className="qty-controls">
                    <button className="qty-btn minus" onClick={onReduceHandler}>-</button>
                    <button className="qty-btn plus" onClick={onAddHandler}>+</button>
                </div>
            )}
        </div>
    )
}

export default ProductItem;