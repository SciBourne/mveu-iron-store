import app from "./app"

import { db } from "./services";

import { DB_HOST, DB_NAME, DB_PORT } from "./config/db";
import { SRV_HOST, SRV_PORT } from "./config/net";




function startMessage() {
  console.log(
    `Express app listening at http://${SRV_HOST}:${SRV_PORT}`
  )
}


async function startServer() {
  await db.connect(DB_HOST, DB_PORT, DB_NAME)
  app.listen(SRV_PORT, startMessage)
}


startServer()
