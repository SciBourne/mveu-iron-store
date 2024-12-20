import { Router } from "express"

import {
  getOrderHistory,
  createOrder,
  cancelOrder
} from "../../controllers"




const router = Router()

router.route( "/"         ).get(getOrderHistory)
router.route( "/"         ).post(createOrder)
router.route( "/:orderID" ).patch(cancelOrder)



export { router }
