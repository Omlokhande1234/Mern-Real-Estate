
import  { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { signInStart,signInFailure,signInSuccess } from '../redux/user/userSlice'



export default function Signup() {
  const[formData,setFormData]=useState({})
  //Used to handle that occurs in the front end
  const{loading,error}=useSelector((state)=>state.user)
  const dispatch=useDispatch()
  const navigate=useNavigate()
  
  //Used to handle change on onchange and to set the form data on every change in the input field
  const handleChange=(e)=>{
    setFormData({
      //Here we have initially spreaded the form data in order to stored the previous data 
      //When we entering the new data
      ...formData,
      //Here we have setted the value of our target event to the input given by the user on the 
      //basis of there id for e.g.. In e.target.name we can store the value given by the user
      //in that input field similarly for other inputs 
       [e.target.id]: e.target.value
    })
  }
  //Used to handle the stuffs when the form is submitted
  const handleSubmit=async (e)=>{
    try{
      dispatch(signInStart())
      //e.preventDefault used to avoid reload of our page when we submit the data
      e.preventDefault();
      //Here there is no need to write the complete api of our server that we have created each time
      //We have to just used the value that we have used to set api of server it in our vite config
      //i.e '/api:https//localhost:3000'
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if(data.success===false){
       dispatch(signInFailure(data.message))
       
        return
      }
      dispatch(signInSuccess(data))
     //Here we have directly used the reducer defined in the store
      navigate('/')
      
    }
    catch(error){
     dispatch(signInFailure(error.message))

    }
  }
  return (
    <div className='p-3 max-w-lg mx-auto'>
       <h1 className='text-3xl text-center font-semibold my-7'>Sign in</h1>
       <form className='flex flex-col justify-center gap-4' onSubmit={handleSubmit}>
           <input type="email" placeholder='email' className='boreder p-3 rounded-lg'
           id='email' onChange={handleChange} />
           <input type="password" placeholder='password' className='boreder p-3 rounded-lg'
           id='password' onChange={handleChange} />
           {/* Here we have put up a condition i.e if the loading is true then show loading and 
           disable the sign up button and if the loading in false then show as usual sign up 
           button */}
           <button disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg uppercase
           hover:opacity-95 disabled:opacity-80'>{loading ? 'Loading...' : 'Sign in'}</button>
       </form>
       <div className='flex gap-2 mt-5'>
        <p>Don't have an account?</p>
        <Link to={"/sign-up"}>
          <span className='text-blue-700'>Sign up</span>
        </Link>
       </div>
       {/* These is used to handle the error that comes to our frontend */}
       {error&& <p className='text-red-500 mt-5'>{error}</p>}

    </div>
  )
}
