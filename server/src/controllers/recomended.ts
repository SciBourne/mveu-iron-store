import { Request, Response } from "express"
import { catalog } from "../services"
import { VisibilityMask } from "../models"




async function getRecomended(req: Request, res: Response) {
  const fieldsConfig: VisibilityMask = req.query

  res.status(200).json(
    await catalog.getRecomended(fieldsConfig)
  )
}




export { getRecomended }
