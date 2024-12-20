import axios, { AxiosRequestConfig } from "axios"

import {
  SRV_ENTRY_POINT,
  SRV_HOST,
  SRV_PORT
} from "../config"

import { UserData, UserRegData } from "../models"




const BASE_URL = `http://${SRV_HOST}:${SRV_PORT}${SRV_ENTRY_POINT}`
const USERS_LOCATION = "/users"

const REQ_CONFIG: AxiosRequestConfig = {
  withCredentials: true
}




async function auth(log?: string, pass?: string): Promise<UserData | null> {
  const body = {
    login: log,
    password: pass
  }

  try {
    let response = await axios.post(
      BASE_URL + USERS_LOCATION + "/login",
      body,
      REQ_CONFIG
    )

    switch (response.status) {
      case 201:
        return response.data

      default:
        console.log(response.status, response.data)
        break
    }

  } catch (err) {
    if (axios.isAxiosError(err)) {
      switch (err.response?.status) {
        case 401:
          break

        default:
          console.log(err)
          break
      }
    }
  }

  return null
}




async function register(regData: UserRegData): Promise<boolean> {
  const { passwordRepeat, ...body } = regData

  try {
    let response = await axios.post(
      BASE_URL + USERS_LOCATION,
      body,
      REQ_CONFIG
    )

    switch (response.status) {
      case 201:
        return true

      case 409:
        return false

      default:
        console.log(response.status, response.data)
        return false
    }

  } catch (err) {
    console.log(err)
    return false
  }
}




async function update(newUserData: UserData): Promise<boolean> {
  const login = newUserData.email

  try {
    let response = await axios.patch(
      BASE_URL + USERS_LOCATION + "/" + login,
      newUserData,
      REQ_CONFIG
    )

    switch (response.status) {
      case 204:
        return true

      default:
        console.log(response.status, response.data)
        return false
    }

  } catch (err) {
    console.log(err)
    return false
  }
}




async function logout(login: string) {
  try {
    let response = await axios.delete(
      BASE_URL + USERS_LOCATION + "/" + login,
      REQ_CONFIG
    )

    switch (response.status) {
      case 204:
        break

      default:
        console.log(response.status, response.data)
    }

  } catch (err) {
    console.log(err)
  }
}




export { auth, register, update, logout }
