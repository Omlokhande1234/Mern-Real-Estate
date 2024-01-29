import { Router } from "express";
import { deleteUser, getUserListings, test, updateUser,getUser } from "../Controllers/userController.js";
import  {verifyToken}  from "../utils/verifyUser.js";
const router=Router()

router.get('/test',test)
router.post('/update/:id',verifyToken,updateUser)
router.delete('/delete/:id',verifyToken,deleteUser)
router.get('/listings/:id',verifyToken,getUserListings)
router.get('/:id',verifyToken,getUser)

export default router