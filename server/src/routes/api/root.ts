import { Router } from "express"
import { getServerStatus } from "../../controllers"




const router = Router()

router.route( "/" ).head(getServerStatus)




export { router }
