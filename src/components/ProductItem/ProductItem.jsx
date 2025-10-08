import React from "react";
import './ProductItem.css'
import Button from '../Button/Button'
import { useTelegram } from "../../hooks/useTelegram";

const ProductItem = ({product, className, onAdd}) => {
    const { onToggleButton } = useTelegram();
    const onAddHandler = () => {
        onAdd(product);
        onToggleButton();
    }

    return (
        <div className={"product "+ className}>
            <div className="img">
                <img style={{width: 'auto', height: "100%"}} src={product.image} alt="" />
            </div>
            <div className="title">{product.title}</div>
            {/* <div className="description">{product.description}</div> */}
            <div className="price">{product.price}€</div>
            <button className={'add-bth'} onClick={onAddHandler}>
                PIEVIENOT
            </button>
        </div>
    )
}

export default ProductItem;