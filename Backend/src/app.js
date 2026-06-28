import express from "express"
import cookieParser from "cookie-parser"
import morgan from "morgan"
import authRouter from "./routes/auth.routes.js"

const app = express();

app.use(morgan("dev"))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser)

app.get("/",(_req,res)=>{
    res.statusCode(200).json({message: "Server is running"})
})

export default app;