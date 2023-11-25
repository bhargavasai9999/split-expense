import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

const app = express()

app.use(express.json())
app.use(cors())
dotenv.config()

app.get('/', (req, res) => {
  return res.send('server is up and running...')
})

app.listen(5000, () => {
  console.log('server is running in the port 5000...')
})
