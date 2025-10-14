import React from 'react'
import './Header.css'
import Button from '../Button/Button'
import { useTelegram } from '../../hooks/useTelegram'

import Logo from '../../logo/ape-logo.png'

const Header = () => {

  return (
    <div className={"header"}>
        <img src={Logo} alt="" style={{width: '140px', height: "auto"}} />
    </div>
  )
}

export default Header