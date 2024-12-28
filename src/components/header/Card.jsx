import React from 'react'
import { BiShoppingBag } from "react-icons/bi"
import { useNavigate } from 'react-router-dom'
const Card = () => {
    // const quantity = useSelector((state) => state.cart.totalQuantity)
    const navigate = useNavigate()
  return (
  
    <div className='card'>
        <BiShoppingBag className='cardIcon' onClick={() => navigate('/cart')}/>
        <span className='flexCenter'>0</span>
    </div>
  )
}

export default Card