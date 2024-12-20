import { Request, Response } from "express"

import { CategoryName, VisibilityMask } from "../models"
import { catalog } from "../services"




async function getProduct(req: Request, res: Response) {
  const id: string = req.params.productID

  const category: CategoryName = CategoryName[
    req.params.categoryName as keyof typeof CategoryName
  ]

  res.status(200).json(
    await catalog.getProduct(category, id)
  )
}




async function getProducts(req: Request, res: Response) {
  const fieldsConfig: VisibilityMask = req.query

  const category: CategoryName = CategoryName[
    req.params.categoryName as keyof typeof CategoryName
  ]

  res.status(200).json(
    await catalog.getProducts(category, fieldsConfig)
  )
}




export { getProduct, getProducts }
