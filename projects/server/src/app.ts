import { ApolloServer } from 'apollo-server-express'
import cors from 'cors'
import express from 'express'
import {
  makeSchema,
  mutationType,
  queryType,
} from 'nexus'
import path from 'path'

const app = express()

app.use(cors())

const server = new ApolloServer({
  schema: makeSchema({
    types: {
      Query: queryType({
        definition(t) {
          t.string('stage', {
            resolve() {
              return process.env.STAGE as string
            },
          })
        },
      }),
      Mutation: mutationType({
        definition(t) {
          t.string('stage', {
            resolve() {
              return process.env.STAGE as string
            },
          })
        },
      }),
    },
    outputs: {
      schema: path.resolve('./src/generated', 'schema.graphql'),
      typegen: path.resolve('./src/generated', 'typegen.ts'),
    },
  }),
  context: ({ req, res }) => {
    return {
      req,
      res,
    }
  },
})

server.applyMiddleware({ app })

export default app
