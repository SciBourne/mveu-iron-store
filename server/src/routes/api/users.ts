import { Router } from "express"

import {
  login,
  logout,
  register,
  getUserData,
  updateUserData
} from "../../controllers"




const router = Router()

router.route( "/login"   ).post(login)

router.route( "/"        ).post(register)
router.route( "/:login"  ).delete(logout)
router.route( "/:login"  ).get(getUserData)
router.route( "/:login"  ).patch(updateUserData)




export { router }
