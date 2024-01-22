import { Router } from "express";
import { createlisting } from "../Controllers/listingController.js";
import { verifyToken } from "../utils/verifyUser.js";
const router=Router()

router.post('/create',verifyToken,createlisting)

export default router