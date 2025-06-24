import express from 'express'
import dotenv from 'dotenv'
import gptChatRoute from './api/routes/gptRoute.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'

dotenv.config()
const app = express()
const port = process.env.PORT || 3000

const frontendURL = 'http://localhost:5173'

app.use(cors({
  origin: frontendURL,
   methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']                 
}))
app.use(express.json());
app.use(cookieParser()); 

app.options('/', cors());


app.use(express.json())

app.use('/chat', gptChatRoute)

app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`)
})
