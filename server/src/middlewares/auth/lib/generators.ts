import { ObjectId } from "mongodb"
import * as jwt from "jsonwebtoken"
import generator from "generate-password-ts"

import { Payload, UserGroup } from "./models"
import { HEADER, EXP_ACCESS, SRV_SIGN } from "./config"




function generateSecretKey(length: number): string {
  return generator.generate(
    {
      length: length,
      symbols: true,
      numbers: true,
      strict: true
    }
  )
}




function generateAccessToken(userID: ObjectId, group: UserGroup): string {
  const payload: Payload = {
    userID: userID,
    group: group
  }

  const options = {
    header: HEADER,
    expiresIn: EXP_ACCESS
  }

  return jwt.sign(payload, SRV_SIGN, options)
}




export { generateAccessToken, generateSecretKey }
