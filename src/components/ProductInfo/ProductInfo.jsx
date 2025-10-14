import React from "react";
import FAQ from '../faq/FAQ'
import { useLocation, useNavigate } from 'react-router-dom'
import './ProductInfo.css'

const ProductInfo = () => {
    const navigate = useNavigate();
    const { state } = useLocation();
    const image = state?.image;
    const usageInstructions = state?.usageInstructions;
    const characteristics = state?.characteristics;
    const contents = state?.contents;
    const title = state?.title;
    const description = state?.description;

    return (
        <div className="info-container">
            <h2 className="product-title">{title}</h2>
            <h3 className="product-description">{description}</h3>
            <div className="image-container">
                <img src={image} alt="" />
            </div>
            <button className="back-btn" onClick={() => navigate(-1)}>⟵ Atpakaļ</button>
            {usageInstructions && 
            <div className="usage-process">
                <h3 className="heading">Kā tas darbojās?</h3>
                <ol className="usage-process-list">
                    {usageInstructions.map(item => (
                        <li className="list-item" key={item.id}>
                            {item.text}
                        </li>
                    ))}
                </ol>
            </div>}
            {characteristics && <div className="characteristics">
                <h3 className="heading">Tehniskie parametri</h3>
                <ul className="characteristics-list">
                    {description === 'Kārtridžs' && <li className="list-item">Garša: {title}</li>}
                    {characteristics.map(item => (
                        <li className="list-item" key={item.id}>
                            {item.text}
                        </li>
                    ))}
                </ul>
            </div>}
            {contents && <div className="contents">
                <h3 className="heading">Kas ir iekļauts?</h3>
                <ul className="contents-list">
                    {description === 'Šķidrums' && <li className="list-item">Garša: {title}</li>}
                    {contents.map(item => (
                        <li className="list-item" key={item.id}>
                            {item.text}
                        </li>
                    ))}
                </ul>
            </div>}
            <FAQ />
        </div>
    )
}

export default ProductInfo;