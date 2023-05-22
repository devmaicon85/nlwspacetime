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

app.register(fastifyStatic, {
  root: resolve(__dirname, '../uploads'),
  prefix: '/uploads',
})

app.register(cors, {
  origin: ['http://localhost:3000', 'https://spacetime2023.vercel.app'], // todas as url de front end
})

app.register(jwt, {
  secret: 'KMLSKMK9IKEKMLKDMKMF',
})

app.register(uploadRoutes)
app.register(authRoutes)
app.register(memoriesRoutes)

// app.listen({
//   port: process.env.PORT ? parseInt(process.env.PORT) : 3000,
//   listenTextResolver: (address) => {
//     return `🚀 HTTP server running on http://localhost:${address}`
//   },
// })

app
  .listen({ port: process.env.PORT ? parseInt(process.env.PORT) : 3000 })
  .then((address) => console.log(`🚀server listening on ${address}`))
  .catch((err) => {
    console.log('Error starting server:', err)
    process.exit(1)
  })
