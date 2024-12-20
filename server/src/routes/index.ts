import { Router } from 'express'

import { router as RootRouter } from './api/root'
import { router as CatalogRouter } from './api/catalog'
import { router as CartRouter } from './api/cart'
import { router as OrdersRouter} from './api/orders'
import { router as UsersRouter } from './api/users'




const router = Router()


router.use("/",        RootRouter)
router.use("/catalog", CatalogRouter)
router.use("/cart",    CartRouter)
router.use("/orders",  OrdersRouter)
router.use("/users",   UsersRouter)




export default router
