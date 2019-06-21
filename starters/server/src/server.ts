import app from './app'

const isProd = process.env.NODE_ENV === 'production'
const port = isProd ? 80 : 3000

app.listen(port)
