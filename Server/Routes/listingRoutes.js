import { Router } from "express";
import { createlisting, deleteListings } from "../Controllers/listingController.js";
import { verifyToken } from "../utils/verifyUser.js";
const router=Router()

router.post('/create',verifyToken,createlisting)
router.delete('/delete/:id',verifyToken,deleteListings)

export default router