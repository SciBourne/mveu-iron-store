import { Request, Response } from "express"
import * as jwt from "jsonwebtoken"

import { UserAccess, UserGroup } from "../models"
import { users } from "../services"
import { CookieOptions, generateAccessToken, TokenName } from "../middlewares/auth/lib"




async function login(req: Request, res: Response) {
  const decodedToken = jwt.decode(
    req.cookies.ACCESS_TOKEN,
    { json: true }
  )

  if (decodedToken) {
    switch (decodedToken.group) {
      case UserGroup.GUESTS:
        const log = req.body.login
        const pass = req.body.password

        if (log?.length > 0 && pass?.length > 0) {
          const userData = await users.auth(log, pass)

          if (userData?._id) {
            const accessToken = generateAccessToken(userData._id, UserGroup.USERS)

            res.cookie(TokenName.ACCESS, accessToken, new CookieOptions)
            res.cookie(TokenName.REFRESH, userData.auth.token, new CookieOptions)

            res.status(201).json(userData.data)
            break
          }
        }

        res.status(401).send()
        break

      case UserGroup.USERS:
        res.status(201).json(await users.getData(req.body.login))
        break

      default:
        res.status(401).send()
        break
    }
  }
}




async function logout(req: Request, res: Response) {
  const decodedToken = jwt.decode(
    req.cookies.ACCESS_TOKEN,
    { json: true }
  )

  if (decodedToken) {
    switch (decodedToken.group) {
      case UserGroup.USERS:
        const status = await users.logout(req.params.login)

        if (status) {
          res.status(204).send()

        } else {
          res.status(404).send()
        }

        break

      default:
        res.status(401).send()
        break
    }
  }
}




async function register(req: Request, res: Response) {
  const decodedToken = jwt.decode(
    req.cookies.ACCESS_TOKEN,
    { json: true }
  )

  if (decodedToken) {
    const result: UserAccess | null = await users.register(req.body)

    if (result) {
      res.cookie(TokenName.ACCESS, result.accessToken, new CookieOptions)
      res.cookie(TokenName.REFRESH, result.refreshToken, new CookieOptions)

      res.status(201).send()

    } else {
      res.status(409).send()
    }
  }
}




async function getUserData(req: Request, res: Response) {
  const decodedToken = jwt.decode(
    req.cookies.ACCESS_TOKEN,
    { json: true }
  )

  if (decodedToken) {
    switch (decodedToken.group) {
      case UserGroup.USERS:
        res.status(201).json(await users.getData(req.params.login))
        break

      default:
        res.status(401).send()
        break
    }
  }
}




async function updateUserData(req: Request, res: Response) {
  const decodedToken = jwt.decode(
    req.cookies.ACCESS_TOKEN,
    { json: true }
  )

  if (decodedToken) {
    switch (decodedToken.group) {
      case UserGroup.USERS:
        const status = await users.updateData(req.params.login, req.body)

        if (status) {
          res.status(204).send()

        } else {
          res.status(409).send()
        }

        break

      default:
        res.status(401).send()
        break
    }
  }
}




export {
  login,
  logout,
  register,
  getUserData,
  updateUserData
}
