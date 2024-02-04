import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ListingItem from '../Components/ListingItem';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import SwiperCore from 'swiper';
//import ArrowRightIcon from 
import 'swiper/css/bundle';

export default function Home() {
  const[offerListing,setOfferListing]=useState([])
  const[saleListing,setSaleListing]=useState([])
  const[rentListing,setRentListing]=useState([])
  console.log(saleListing)
  useEffect(()=>{
    const fetchOfferListings=async()=>{
      try{
        const res=await fetch('/api/listing/get?offer=true&limit=4')
        const data=await res.json()
        setOfferListing(data)
        fetchRentListings()
        
      }catch(error){
        console.log(error)

      }
    }
    const fetchRentListings=async()=>{
      try{
        const res=await fetch('/api/listing/get?type=rent&limit=4')
        const data=await res.json()
        setRentListing(data)
        fetchSaleListings()
      }catch(error){
        console.log(error)
      }
    }
    const fetchSaleListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=sale&limit=4');
        const data = await res.json();
        setSaleListing(data);
      } catch (error) {
        log(error);
      }
    };
  fetchOfferListings()
},[])
  return (
    <div>
      {/* Top section*/}
      <div className="flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto">
        <h1 className='text-slate-700 font-bold text-3xl lg:text-6xl  '>
          Find your next <span className='text-slate-500 '>Perfect</span>
          <br /> place with ease
        </h1>
        <div className="text-grey-400 text-xs sm:text-sm">
          Mern estate is the best place to find to live
          <br /> we have wide range of properties for you to choose from
        </div>
        <Link to='/search' className='text-xs sm:text-sm text-blue-800 font-bold 
        hover:underline'>Lets get started</Link>
      </div>

       {/* swiper */}
       <Swiper navigation>
        {offerListing &&
          offerListing.length > 0 &&
          offerListing.map((listing) => (
            <SwiperSlide>
              <div
                style={{
                  background: `url(${listing.imageUrls[0]}) center no-repeat`,
                  backgroundSize: 'cover',
                }}
                className='h-[500px]'
                key={listing._id}
              ></div>
            </SwiperSlide>
          ))}
        </Swiper>

      {/* Offer rent and sale listings */}
      <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10'>
        {offerListing&&offerListing.length>0&&(
          <div>
            <div className="my-10 ">
              <h2 className='text-2xl font-semibold text-slate-600'>Recent Offers</h2>
              <Link className='text-sm text-blue-800 hover:underline' to={'/search?offer=true'}>
                Show more offers
              </Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {offerListing.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}

        {rentListing&&rentListing.length>0&&(
          <div >
            <div className='my-10'>
               <h2 className='text-2xl  font-semibold text-slate-600'>Recent places for rent</h2>
               <Link className='text-sm text-blue-800 hover:underline' to={'/search?type=rent'}>
                    Browse all rental properties
                </Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {rentListing.map((listing)=>(
                <ListingItem listing={listing} key={listing._id}/>
              ))}
            </div>
           
          </div>
        )}
      </div>
    
      {saleListing && saleListing.length > 0 && (
          <div className="flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto">
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>Recent places for sale</h2>
              <Link className='text-sm text-blue-800 hover:underline' to={'/search?type=sale'}>Show more places for sale</Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {saleListing.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
    </div>
  )
}
