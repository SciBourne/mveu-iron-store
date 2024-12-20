import { Request, Response } from "express"
import { catalog } from "../services"




async function getCatalog(_: Request, res: Response) {
  res.status(200).json(
    catalog.categories
  )
}




export default getCatalog
