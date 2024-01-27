import { Router } from "express";
import { createListing, deleteListings, updateListings } from "../Controllers/listingController.js";
import { verifyToken } from "../utils/verifyUser.js";
import { getListing } from "../Controllers/listingController.js";
const router=Router()

router.post('/create',verifyToken,createListing)
router.delete('/delete/:id',verifyToken,deleteListings)
router.post('/update/:id',verifyToken,updateListings)
router.get('/get/:id',getListing)

export default router