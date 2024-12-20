import { NextFunction, Request, Response } from "express"
import { ParsedQs } from "qs"




function parseQuery(req: Request, _: Response, next: NextFunction) {
  const parsedQuery: ParsedQs = {}

  Object.keys(req.query).forEach((key: string) => {
    if ( req.query[key] ) {
      let intValue: number = Number(req.query[key])

      if (isNaN(intValue)) {
        parsedQuery[key] = req.query[key] as string
      } else {
        parsedQuery[key] = intValue as any
      }

    }
  })

  req.query = parsedQuery
  next()
}




export { parseQuery }
