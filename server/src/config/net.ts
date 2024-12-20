import dotenv from "dotenv"




dotenv.config()

const SRV_HOST = process.env.SRV_HOST || "127.0.0.1"
const SRV_PORT = process.env.SRV_PORT || "3000"

const CLIENT_HOST = "127.0.0.1"
const CLIENT_PORT = "5173"

const API_POINT = "/api"
const API_VERSION = "/v1"




export {
  SRV_HOST,
  SRV_PORT,

  CLIENT_HOST,
  CLIENT_PORT,

  API_POINT,
  API_VERSION
}
