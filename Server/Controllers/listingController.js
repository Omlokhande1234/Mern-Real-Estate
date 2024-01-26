import Listing from "../Models/ListingModel.js"
import { errorhandler } from "../utils/errorUtil.js"

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
export const deleteListings=async(req,res,next)=>{
    const listing=await Listing.findById(req.params.id)
    if(!listing){
        return next(errorhandler(404,'Listing not found'))
    }
    if(req.user.id!==listing.userRef){
        return  next(errorhandler(403,"You can only delete your own listings"))

    }
    try{
       await Listing.findByIdAndDelete(req.params.id)
       res.status(200).json('Listing has been deleted!');

    }
    catch(error){
        next(error)
    }
}