import { API_POINT, API_VERSION } from "../../../config/net"
import { expiresAfter } from "../../lib"
import { generateSecretKey } from "./generators"




const EXP_ACCESS: string = "15m"
const EXP_REFRESH: string = "7d"
const EXP_COOKIES: string = "7d"


const SRV_SIGN_LEN: number = 512
const USR_TOKEN_LEN: number = 256


const SRV_SIGN: string = process.env.SRV_SIGN || generateSecretKey(SRV_SIGN_LEN)


const HEADER = {
  alg: "HS256",
  typ: "JWT"
}


class CookieOptions {
  httpOnly: boolean = true
  secure: boolean = true
  sameSite: "none" = "none"
  domain: string = ""
  path: string = "/"
  expires: Date

  constructor(expires: string = EXP_COOKIES) {
    this.expires = expiresAfter(expires, Date)
  }
}


const PROTECTED_ROUTES = [
  API_POINT + API_VERSION + "/profile",
  API_POINT + API_VERSION + "/orders",
]





export {
  HEADER,

  EXP_ACCESS,
  EXP_REFRESH,
  EXP_COOKIES,

  SRV_SIGN,

  SRV_SIGN_LEN,
  USR_TOKEN_LEN,

  PROTECTED_ROUTES,

  CookieOptions
}
