import React from 'react'

function CreateListing() {
  return (
    <main className='p-3 max-w-4xl mx-auto' >
       <h1 className='text-3xl text-black-500 font-semibold text-center my-7 '>Create a listing</h1>
       <form className='flex flex-col sm:flex-row gap-6'>
           <div className='flex flex-col gap-3 flex-1'>
            <input type="text" id='Name' placeholder='Name' className='border p-3 rounded-lg' 
             maxLength='62' minLength='10' required />
            <input type="text" id='Description' placeholder='Description' className='border p-3 rounded-lg'
             required />
            <input type="text" id='Address' placeholder='Address' className='border p-3 rounded-lg'
            required/>
            <div className='flex gap-6 flex-wrap'>
              <div className='flex gap-2 '>
                  <div className='flex gap-2'> 
                     <input type="checkbox" id='sell' className='w-5' />
                     <span>Sell</span>
                  </div>
                  <div className='flex gap-2'>
                     <input type="checkbox" id='Rent' className='w-5' />
                     <span>Rent</span>
                  </div>
                  <div className='flex gap-2'>
                    <input type="checkbox" id='Parking-spot' className='w-5' />
                    <span>Parking spot</span>
                  </div>
                  <div className='flex gap-2'>
                     <input type="checkbox" id='furnished' className='w-5' />
                     <span>Furnished</span>
                  </div>
                  <div className='flex gap-2'>
                    <input type="checkbox" id='others' className='w-5' />
                    <span>Others</span>
                  </div>
            
              </div>
            </div>
            <div className='flex flex-wrap gap-6'>
                  <div className='flex items-center gap-2'>
                    <input type="number" id='bedrooms' min='1' max='10' required 
                    className='p-3 border border-gray-300 rounded-lg' />
                    <p>Beds</p>
                  </div>
                  <div className='flex items-center gap-2'>
                    <input type="number" id='bathrooms' min='1' max='10' required 
                    className='p-3 border border-gray-300 rounded-lg' />
                    <p>Baths</p>
                  </div>
                 <div className='flex items-center gap-2'>
                    <input type="number" id='Regular-Price' required 
                    className='p-3 border border-gray-300 rounded-lg' />
                    <div>
                       <p>Regular price</p>
                       <span className='text-xs'>($ / month)</span>
                    </div>
                 </div>
                 <div className='flex items-center gap-2'>
                    <input type="number" id='Discounted-Price' required 
                    className='p-3 border border-gray-300 rounded-lg' />
                    <div>
                       <p>Discounted price</p>
                       <span className='text-xs'>($ / month)</span>
                    </div>
                  </div>
            </div>
           </div>
           <div className='flex flex-col flex-1 gap-4'>
          <p className='font-semibold'>Images:
          <span className='font-normal text-gray-600 ml-2'>The first image will be the cover(max 6)</span>
          </p>
           <div className='flex gap-4'>
               <input className='p-3 border border-gray-700 rounded w-full' type="file" id='images' accept='image/*' multiple />
               <button className='p-3 text-green-700 border border-green-700 
               rounded uppercase hover:shadow-lg disabled:opacity-85'>Upload</button>
           </div>
            <button className='p-3 bg-slate-700 text-white rounded-lg 
             uppercase hover:opacity-95 disabled:opacity-80'>Create Listing</button>
           </div>
        </form> 
          
                 
              
                    

              

           
       
     

       
    </main>
   
  )
}

export default CreateListing