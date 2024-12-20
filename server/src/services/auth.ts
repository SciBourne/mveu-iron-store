import { ObjectId, ReturnDocument, Timestamp } from "mongodb"

import { db } from "../services"
import { User } from "../models"

import { Payload } from "../middlewares/auth/lib/models"
import { expiresAfter } from "../middlewares/lib"
import { EXP_REFRESH } from "../middlewares/auth/lib"




async function createUser(userData: User): Promise<ObjectId> {
  const result = await db.get().collection("users").insertOne(userData)
  return result.insertedId
}




async function updateRefreshToken(

  oldToken: string,
  newToken: string

): Promise<Payload | null> {

  const findFilter = {
    refreshToken: oldToken
  }

  const updateFilter = {
    $set: {
      auth: {
        token: newToken,
        expireIn: expiresAfter(EXP_REFRESH, Timestamp)
      }
    }
  }

  const updateOptions = {
    returnDocument: ReturnDocument.AFTER
  }

  const user = await db.get().collection("users")
                                .findOneAndUpdate(
                                  findFilter,
                                  updateFilter,
                                  updateOptions
                                )

  if (user) {
    console.log(user._id, user.group, user.refreshToken)

    return {
      userID: user._id,
      group: user.group
    }

  } else {
    return null
  }
}




export { createUser, updateRefreshToken }
