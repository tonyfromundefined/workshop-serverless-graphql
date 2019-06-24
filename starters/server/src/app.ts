import { ApolloServer } from 'apollo-server-express'
import cors from 'cors'
import express from 'express'
import { makeSchema } from 'nexus'
import path from 'path'

import * as types from './schema'

const playground = !!Number(process.env.IS_PLAYGROUND_ENABLED || '0')
const tracing = !!Number(process.env.IS_TRACING_ENABLED || '0')

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
  introspection: playground,
  playground,
  tracing,
})

server.applyMiddleware({
  app,
})

export default app
