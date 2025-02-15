import React from 'react'
import Logo from '../../assets/images/Horizontal_Logo.png'
import { AiOutlineSearch } from "react-icons/ai"
import  Card  from './Card'
import  User  from './User'
import  {Link} from "react-router-dom"
import "./header.css"


const Header = () => {

    window.addEventListener("scroll", function () {
        const header = this.document.querySelector(".header")
        header.classList.toggle("active", this.window.scrollY > 100)
      })
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" })
    
  return ( 
    <>
      <header className='header'>
        <div className='scontainer flex'>
          <div className='logo'>
            <Link to='/'>
              <img className='logo-img' src={Logo} alt='Logo'/>
            </Link>
          </div>
          <div className='search flex'>
            <AiOutlineSearch className='searchIcon' />
            <input type='text' placeholder='Search...' />
          </div>
          <div className='account flexCenter'>
            <Card />
            <User />
          </div>
        </div>
      </header>
    </>
  )
}

export default Header