import { Router } from "express";
import { test } from "../Controllers/userController.js";
const router=Router()

router.get('/test',test)

export default router