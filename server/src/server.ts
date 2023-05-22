import 'dotenv/config'

import fastify from 'fastify'
import cors from '@fastify/cors'
import jwt from '@fastify/jwt'
import { memoriesRoutes } from './routes/memories'
import { authRoutes } from './routes/auth'
import fastifyMultipart from '@fastify/multipart'
import { uploadRoutes } from './routes/upload'
import fastifyStatic from '@fastify/static'
import { resolve } from 'node:path'

const app = fastify()

app.register(fastifyMultipart)

const directoryPath = resolve(__dirname, '../uploads')
console.log('🚀 ~ file: server.ts:18 ~ directoryPath:', directoryPath)

app.register(fastifyStatic, {
  root: directoryPath,
  prefix: '/uploads',
})

app.register(cors, {
  origin: true, // todas as url de front end
})

app.register(jwt, {
  secret: 'KMLSKMK9IKEKMLKDMKMF',
})

app.register(uploadRoutes)
app.register(authRoutes)
app.register(memoriesRoutes)

app
  .listen({
    port: process.env.PORT ? parseInt(process.env.PORT) : 3333,
    host: '0.0.0.0',
  })
  .then((address) => console.log(`🚀server listening on ${address}`))
  .catch((err) => {
    console.log('Error starting server:', err)
    process.exit(1)
  })
