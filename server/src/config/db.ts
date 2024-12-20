import dotenv from "dotenv"




dotenv.config()

const DB_NAME: string = process.env.DB_NAME || "iron_store"
const DB_HOST: string = process.env.DB_HOST || "127.0.0.1"
const DB_PORT: string = process.env.DB_PORT || "27017"




export { DB_NAME, DB_HOST, DB_PORT }
