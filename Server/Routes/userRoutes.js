import { Router } from "express";
import { test, updateUser } from "../Controllers/userController.js";
import  {verifyToken}  from "../utils/verifyUser.js";
const router=Router()

router.get('/test',test)
router.post('/update/:id',verifyToken,updateUser)

export default router