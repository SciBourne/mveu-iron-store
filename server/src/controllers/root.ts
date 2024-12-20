import { Request, Response } from "express"




function getServerStatus(_: Request, res: Response) {
  return res.sendStatus(200)
}




export default getServerStatus
