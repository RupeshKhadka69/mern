import express from 'express'
import { authUser, registerUser } from '../userController/userController'
const router = express.Router()
router.post("/",registerUser);
router.post("/auth",authUser)

export default router;