import { Router } from "express"

import {

  getCart,
  getCartItem,
  addToCart,
  remFromCart,
  updateQty

} from "../../controllers"




const router = Router()

router.route( "/"           ).get(getCart)
router.route( "/"           ).post(addToCart)
router.route( "/:productID" ).get(getCartItem)
router.route( "/:productID" ).patch(updateQty)
router.route( "/:productID" ).delete(remFromCart)



export { router }
