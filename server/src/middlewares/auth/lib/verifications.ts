import * as jwt from "jsonwebtoken"
import { SRV_SIGN } from "./config"




function verifyAccessToken(token: string): jwt.JwtPayload | string | null {
  try {
    return jwt.verify(token, SRV_SIGN)

  } catch {
    return null
  }
}




export { verifyAccessToken }
