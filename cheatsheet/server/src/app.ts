import { ApolloServer } from 'apollo-server-express'
import cors from 'cors'
import express from 'express'
import { makePrismaSchema } from 'nexus-prisma'
import path from 'path'
import datamodelInfo from './generated/nexus-prisma'
import { prisma } from './generated/prisma'

import * as types from './resolvers'

const playground = !!Number(process.env.IS_PLAYGROUND_ENABLED || '0')
const tracing = !!Number(process.env.IS_TRACING_ENABLED || '0')

const app = express()

app.use(cors())

app.get('/', (_req, res) => {
  return res.json('ok')
})

const server = new ApolloServer({
  schema: makePrismaSchema({
    types,
    prisma: {
      client: prisma,
      datamodelInfo,
    },
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
