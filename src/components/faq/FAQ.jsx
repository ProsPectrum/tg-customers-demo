import React, { useState } from 'react'
import './FAQ.css'

const items = [
    { q: 'Kā veikt pasūtījumu?', a: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
    { q: 'Kā darbojas piegāde?', a: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
    { q: 'Vai preces var atgriezt?', a: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
    { q: 'Kā notiek apmaksa?', a: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' }
]

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(null)

    const toggle = (idx) => {
        setOpenIndex(prev => prev === idx ? null : idx)
    }

    return (
        <div className="faq">
            <h3 className="faq-title">FAQ</h3>
            <div className="faq-list">
                {items.map((item, idx) => (
                    <div key={idx} className={'faq-item' + (openIndex === idx ? ' open' : '')}>
                        <button className="faq-question" onClick={() => toggle(idx)}>
                            <span>{item.q}</span>
                            <span className={'faq-icon' + (openIndex === idx ? ' rotate' : '')}>+</span>
                        </button>
                        {openIndex === idx && (
                            <div className="faq-answer">
                                {item.a}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default FAQ

