import { ApolloServer } from 'apollo-server-express'
import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import {
  makeSchema,
} from 'nexus'
import path from 'path'

if (process.env.NODE_ENV !== 'production') {
  dotenv.config({
    path: './.env.development',
  })
}

import * as types from './schema'

const isPlaygroundEnabled = !!Number(process.env.IS_PLAYGROUND_ENABLED || '0')

const app = express()

app.use(cors())

app.get('/', (_req, res) => {
  return res.json('ok')
})

const server = new ApolloServer({
  schema: makeSchema({
    types,
    outputs: {
      schema: path.resolve('./src/generated', 'schema.graphql'),
      typegen: path.resolve('./src/generated', 'nexus.ts'),
    },
  }),
  introspection: isPlaygroundEnabled,
  playground: isPlaygroundEnabled,
})

server.applyMiddleware({
  app,
})

export default app
