import { NextFunction, Request, Response } from "express"
import { CLIENT_HOST, CLIENT_PORT } from "../config/net"




function setCORS(req: Request, res: Response, next: NextFunction) {
  res.header(
    "Access-Control-Allow-Origin",
    `http://${CLIENT_HOST}:${CLIENT_PORT}`
  )

  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  )

  res.header(
    "Access-Control-Allow-Methods",
    "HEAD, GET, POST, PATCH, DELETE, OPTIONS"
  )

  res.header(
    "Access-Control-Allow-Credentials",
    "true"
  )

  if (req.method === "OPTIONS") {
    res.status(204).send()
  } else {
    next()
  }
}




export { setCORS }
