import { Router } from "express";
import { deleteUser, test, updateUser } from "../Controllers/userController.js";
import  {verifyToken}  from "../utils/verifyUser.js";
const router=Router()

router.get('/test',test)
router.post('/update/:id',verifyToken,updateUser)
router.delete('/delete/:id',verifyToken,deleteUser)

export default router