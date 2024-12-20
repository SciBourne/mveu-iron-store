import { ObjectId, Timestamp } from "mongodb"
import bcrypt from "bcrypt"

import { db } from "."
import { expiresAfter } from "../middlewares/lib"

import {
  EXP_REFRESH,
  generateAccessToken,
  generateSecretKey,
  USR_TOKEN_LEN
} from "../middlewares/auth/lib"

import {
  User,
  UserAccess,
  UserData,
  UserGroup,
  UserRegData
} from "../models"




async function getData(log: string): Promise<UserData | null> {
  const findParams = {
    "data.email": log
  }

  const user = await db.get().collection("users")
                                .findOne<User>(findParams)

  if (user && user.data) {
    return user.data

  } else {
    return null
  }
}




async function auth(log: string, pass: string): Promise<User | null> {
  const findParams = {
    "data.email": log
  }

  const user = await db.get().collection("users")
                                .findOne<User>(findParams)

  if (user) {
    const hash = user.auth.hash

    if (hash && await bcrypt.compare(pass, hash)) {
      return user
    }
  }

  return null
}




async function register(regData: UserRegData): Promise<UserAccess | null> {
  const emailCheck = {"data.email": regData.email}
  const isExists = await db.get().collection("users").findOne<User>(emailCheck)

  if (!isExists) {
    const { password, ...userData } = regData
    const token = generateSecretKey(USR_TOKEN_LEN)

    const newUser: User = {
      group: UserGroup.USERS,
      data: userData,

      auth: {
        token: token,
        expireIn: expiresAfter(EXP_REFRESH, Timestamp),
        hash: await bcrypt.hash(password, 10)
      }
    }

    const result = await db.get().collection("users")
                                    .insertOne(newUser)

    return {
      userID: result.insertedId,
      accessToken: generateAccessToken(result.insertedId, UserGroup.GUESTS),
      refreshToken: token
    }

  } else {
    return null
  }
}




async function updateData(login: string, newData: UserData): Promise<boolean> {
  const findParams = {
    "data.email": login
  }

  const updateParams = {
    $set: {
      data: newData
    }
  }


  const status = await db.get().collection("users")
                                  .updateOne(findParams, updateParams)

  return status.acknowledged
}




async function logout(login: string): Promise<boolean> {
  const findParams = {
    "data.email": login
  }

  const deleteParams = {
    $set: {
      auth: {
        token: ""
      }
    }
  }

  const status = await db.get().collection("users")
                                  .updateOne(findParams, deleteParams)

  return status.acknowledged
}




export { getData, updateData, auth, register, logout }
