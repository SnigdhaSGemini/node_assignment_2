import React from 'react'
import './navbar.css';
import {useNavigate} from "react-router-dom"
const Navbar = () => {
    const navigate = useNavigate()
  return (
    // created routes for user navigation
    <div className='navbar-div'>
    <a href="/users/create" onClick={()=>navigate("/users/create")}>Create</a>
      <a href="/users/view" onClick={()=>navigate("/users/view")}>View</a>
    </div>
  )
}

export default Navbar
