const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const express = require('express')
const next = require('next')
const path = require('path')

const config = require('./next.config')

const IS_PROD = process.env.NODE_ENV === 'production'
const PORT = IS_PROD ? 80 : 3000

main()

async function main() {
  const server = await createServer()

  server.listen(PORT)
}

async function createServer() {
  const app = next({
    config,
    dev: !IS_PROD,
    dir: path.resolve(__dirname, './src'),
  })
  
  await app.prepare()

  const server = express()

  server.use(bodyParser.json())
  server.use(bodyParser.urlencoded({ extended: true }))
  server.use(cookieParser())

  server.use((req, res) => app.render(req, res, req._parsedUrl.pathname, req.query))

  return server
}
