import express from "express"
import { Express } from "express"
import cookieParser from "cookie-parser"
import bodyParser from "body-parser"

import router from "./routes"
import { parseQuery } from "./middlewares";
import { setCORS } from "./middlewares";
import { authUser } from "./middlewares/auth/auth";
import { API_POINT, API_VERSION } from "./config/net"




const app: Express = express();

app.use(setCORS)
app.use(cookieParser())
app.use(bodyParser.json())
app.use(authUser)
app.use(parseQuery)

app.use(API_POINT + API_VERSION, router)




export default app;
