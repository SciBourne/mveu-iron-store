import { ObjectId, Timestamp } from "mongodb"

import { createUser } from "../../../services/auth"
import { expiresAfter } from "../../lib"

import { USR_TOKEN_LEN, EXP_REFRESH } from "./config"
import { generateSecretKey, generateAccessToken } from "./generators"
import { AccessData, UserGroup } from "./models"




async function createGuest(): Promise<AccessData> {
  const refreshToken: string = generateSecretKey(USR_TOKEN_LEN)

  const userID: ObjectId = await createUser(
    {
      group: UserGroup.GUESTS,
      auth: {
        token: refreshToken,
        expireIn: expiresAfter(EXP_REFRESH, Timestamp),
      }
    }
  )

  return {
    accessToken: generateAccessToken(userID, UserGroup.GUESTS),
    refreshToken: refreshToken
  }
}




export { createGuest }
