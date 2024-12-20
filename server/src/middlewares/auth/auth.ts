import { Request, Response, NextFunction } from "express"
import * as jwt from "jsonwebtoken"

import {

  verifyAccessToken,
  updateAccess,
  AccessData,
  TokenName,
  CookieOptions,
  createGuest,
  PROTECTED_ROUTES

} from "./lib"
import { UserGroup } from "../../models"




function authUser(req: Request, res: Response, next: NextFunction) {
  const cookieOptions = new CookieOptions

  if ( req.cookies.ACCESS_TOKEN && req.cookies.REFRESH_TOKEN ) {
    const payload = verifyAccessToken(req.cookies.ACCESS_TOKEN)

    if ( !payload ) {
      updateAccess(req.cookies.REFRESH_TOKEN)
        .then(
          (data: AccessData) => {
            res.cookie(TokenName.ACCESS, data.accessToken, cookieOptions)
            res.cookie(TokenName.REFRESH, data.refreshToken, cookieOptions)

            next()
          }
        )
        .catch(
          (err: Error) => {
            console.log(err.message)
          }
        )

    } else {
      if (PROTECTED_ROUTES.includes(req.path)) {
        const decodedToken = jwt.decode(
          req.cookies.ACCESS_TOKEN,
          { json: true }
        )

        if (decodedToken?.group == UserGroup.USERS) {
          console.log("AUTH: USER")
          return next()

        } else {
          console.log("AUTH: GUEST")
          return res.redirect("/login")
        }

      } else {
        return next()
      }
    }
  }

  createGuest().then(
    (data: AccessData) => {
      res.cookie(TokenName.ACCESS, data.accessToken, cookieOptions)
      res.cookie(TokenName.REFRESH, data.refreshToken, cookieOptions)

      res.redirect(req.url)
    }
  )
}




export { authUser }
