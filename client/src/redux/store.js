//We use the store in order to use the data given by the user in all the files and some functions
//to be defined here and be used in all other files

import { configureStore } from '@reduxjs/toolkit'
import userReducer from './user/userSlice.js'

export const store = configureStore({
  reducer: {
    user:userReducer,
 },
  middleware:(getDefaultMiddleware)=>
  getDefaultMiddleware({
    serializableCheck:false
  })
 
  
})