import express from 'express'
import { authUser, registerUser,getProfile,logoutUser } from '../userController/userController'
import authenticate from '../middleware/authcheck';
const router = express.Router()
router.post("/",registerUser);
router.post("/auth",authUser)
router.post("/logout",logoutUser)
router.get("/profile",authenticate,getProfile)

export default router;