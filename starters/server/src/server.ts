import dotenv from 'dotenv'
import app from './app'

const isProd = process.env.NODE_ENV === 'production'
const port = isProd ? 80 : 3000

dotenv.config({
  path: './.env.' + (isProd ? 'production' : 'development'),
})

app.listen(port)
