import { Router } from "express"

import {
  getCatalog,
  getProducts,
  getRecomended,
  getProduct
} from "../../controllers"




const router = Router()

router.route( "/"                         ).get( getCatalog    )
router.route( "/recomended"               ).get( getRecomended )
router.route( "/:categoryName"            ).get( getProducts   )
router.route( "/:categoryName/:productID" ).get( getProduct    )




export { router }
