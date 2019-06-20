import { ApolloServer } from 'apollo-server-express'
import cors from 'cors'
import express from 'express'
import {
  makeSchema,
  mutationType,
  queryType,
} from 'nexus'
import path from 'path'
import { Task, TaskMutations, TaskQueries } from './schema/task'

const isProd = process.env.NODE_ENV === 'production'
const isStageDevelopment = !isProd || process.env.STAGE === 'development'

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
          t.string('ping', {
            resolve() {
              return 'pong'
            },
          })
        },
      }),
      Task,
      TaskQueries,
      TaskMutations,
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
  introspection: isStageDevelopment,
  playground: isStageDevelopment,
})

server.applyMiddleware({ app })

export default app
