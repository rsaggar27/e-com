import React from 'react'
import { BiShoppingBag } from "react-icons/bi"
import { AiOutlineClose } from "react-icons/ai"
import  CartItems  from "./CartItems"
import { useSelector } from "react-redux"
import './cart.css'
const Cart = () => {

  const quantity = useSelector((state) => state.cart.totalQuantity)
  const cartItems = useSelector((state) => state.cart.itemsList)

  let total = 0
  const itemsLists = useSelector((state) => state.cart.itemsList)
  itemsLists.forEach((item) => {
    total += item.totalPrice
  })
  return (
    <>
      <div className='container'>
        <div className='flex mt-4'>
          <h1 className='text-center'>Shopping Cart</h1>
        </div>

        {cartItems.map((item) => (
          <CartItems id={item.id} cover={item.cover} name={item.name} price={item.price} quantity={item.quantity} totalPrice={item.totalPrice} />
        ))}

        <div className='checkOut'>
          <button className='span-checkout justify-center'>
            <span >Proceed To Checkout</span>
            <label htmlFor=''>${total}</label>
          </button>
        </div>
      </div>
    </>
  )
}

export default Cart