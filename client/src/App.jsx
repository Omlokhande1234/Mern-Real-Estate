import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './Pages/Home'
import SignOut from './Pages/SignOut'
import About from './Pages/About'
import Signin from './Pages/Signin'
import Profile from './Pages/Profile'
import Header from './Components/Header'


export default function App(){
  return <BrowserRouter>
      <Header/>
      <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/sign-in' element={<Signin/>}/>
          <Route path='/sign-out' element={<SignOut/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/profile' element={<Profile/>}/>
      </Routes>
  
       </BrowserRouter>
}

