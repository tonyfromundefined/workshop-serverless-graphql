import { APIGatewayProxyEvent, Context } from 'aws-lambda'
import awsServerlessExpress from 'aws-serverless-express'
import app from './app'

const BINARY_MIME_TYPES = [
  'application/javascript',
  'application/json',
  'application/octet-stream',
  'application/xml',
  'text/css',
  'text/html',
  'text/javascript',
  'text/plain',
  'text/text',
  'text/xml',
]

const server = awsServerlessExpress.createServer(app, undefined, BINARY_MIME_TYPES)

export function handler(event: APIGatewayProxyEvent, context: Context) {
  return awsServerlessExpress.proxy(server, event, context)
}
