import React, { useState,useEffect } from 'react'
import {FaSearch} from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import {  useSelector } from 'react-redux'

export default function Header() {
  const {currentUser}=useSelector((state)=>state.user)
  const navigate=useNavigate()
  const[searchTerm,setsearchTerm]=useState('')
  const handleSubmit=(e)=>{
    e.preventDefault()
    const urlParams = new URLSearchParams(window.location.search)
    urlParams.set('searchTerm',searchTerm)
    const searchQuery=urlParams.toString()
    navigate(`/search/${searchQuery}`)
  }
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setsearchTerm(searchTermFromUrl);
    }
  }, [location.search]);
  return (
    <header className='bg-slate-200 shadow-md'>
     <div className='flex justify-between max-w-6xl mx-auto p-3'>
        <Link to='/'>
        <h1 className='font-bold text-sm sm:text-xl flex flex-wrap items-center'>
            <span className='text-slate-500'>Sahand</span>
            <span className='text-slate-700'>Estate</span>
        </h1>
        </Link>
       
        <form onSubmit={handleSubmit} className='bg-slate-300 p-3 rounded-lg flex items-center'>
            <input type="search" 
             name="search" placeholder="Search..." 
             className='bg-transparent focus:outline-none w-24 sm:w-64'
             value={searchTerm}
             onChange={(e)=>setsearchTerm(e.target.value)}

            />
           <button>
             <FaSearch className='text-slate-600 '/> 
           </button>
        </form>
        <ul className='flex gap-4 items-center'>
            <Link to='/'> <li className='hidden sm:inline text-slate-500 hover:underline cursor-pointer'>Home</li></Link>
            <Link to='/about'>  <li className='hidden sm:inline text-slate-500 hover:underline cursor-pointer'>About</li></Link>
            <Link to='/profile'>
            {currentUser ? (
              <img
                className='rounded-full h-7 w-7 object-cover'
                src={currentUser.avatar}
                alt='profile'
              />
             
            ) : (
              <li className=' text-slate-700 hover:underline'> Sign in</li>
            )}
            </Link>
            
        </ul>
      </div>
    </header>
  )
}
