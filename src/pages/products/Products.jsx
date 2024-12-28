import React from 'react'
import "./product.css"
import ProductCard from './ProductCard'
import axios from 'axios'


const Products = () => {
  const product=[]
  axios.get('https://api.freeapi.app/api/v1/ecommerce/products').then((response)=>{
   console.log(response.data);
  })
  return (
    < div className='container'>
    <h2>Products</h2>
    </ div>
  )
}

export default Products