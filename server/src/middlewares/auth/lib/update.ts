import { Payload } from "./models"
import { updateRefreshToken } from "../../../services/auth"

import { USR_TOKEN_LEN } from "./config"
import { generateAccessToken, generateSecretKey } from "./generators"
import { AccessData } from "./models"




async function updateAccess(oldRefreshToken: string): Promise<AccessData> {
  const newRefreshToken: string = generateSecretKey(USR_TOKEN_LEN)

  const payload = await updateRefreshToken(
    oldRefreshToken,
    newRefreshToken
  )

  if (payload) {
    return {
      accessToken: generateAccessToken(payload.userID, payload.group),
      refreshToken: newRefreshToken
    }

  } else {
    throw new Error("This user does not exists")
  }
}




export { updateAccess }
