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
            <div className="img" />
            <div className="title">{product.title}</div>
            <div className="description">{product.description}</div>
            <div className="price">{product.price}€</div>
            <Button className={'add-bth'} onClick={onAddHandler}>
                PIEVIENOT
            </Button>
        </div>
    )
}

export default ProductItem;