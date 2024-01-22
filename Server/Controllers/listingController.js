import Listing from "../Models/ListingModel.js"

export const createlisting=async(req,res,next)=>{
    try{
        const listing=await Listing.create(req.body)
        res.status(201).json({
            success:true,
            message:'created listings successfully',
            listing
        })

    }catch(error){
        next(error)

    }
}