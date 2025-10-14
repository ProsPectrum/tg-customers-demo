import React from "react";
import FAQ from '../faq/FAQ'
import { useLocation, useNavigate } from 'react-router-dom'
import './ProductInfo.css'

const ProductInfo = () => {
    const navigate = useNavigate();
    const { state } = useLocation();
    const image = state?.image;
    const usageInstructions = state?.usageInstructions || [];
    const characteristics = state?.characteristics || [];
    const contents = state?.contents || [];

    return (
        <div className="info-container">
            <button className="back-btn" onClick={() => navigate(-1)}>⟵ Atpakaļ</button>
            <div className="image-container">
                <img src={image} alt="" />
            </div>
            <div className="usage-process">
                <h3 className="heading">Kā tas darbojās?</h3>
                <ol className="usage-process-list">
                    {usageInstructions.map(item => (
                        <li className="list-item" key={item.id}>
                            {item.text}
                        </li>
                    ))}
                </ol>
            </div>
            <div className="characteristics">
                <h3 className="heading">Tehniskie parametri</h3>
                <ul className="characteristics-list">
                    {characteristics.map(item => (
                        <li className="list-item" key={item.id}>
                            {item.text}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="contents">
                <h3 className="heading">Kas ir iekļauts?</h3>
                <ul className="contents-list">
                    {contents.map(item => (
                        <li className="list-item" key={item.id}>
                            {item.text}
                        </li>
                    ))}
                </ul>
            </div>
            <FAQ />
        </div>
    )
}

export default ProductInfo;