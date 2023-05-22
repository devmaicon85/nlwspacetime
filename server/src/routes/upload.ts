import { randomUUID } from 'node:crypto'
import { extname, resolve } from 'node:path'
import { FastifyInstance } from 'fastify'
import { createWriteStream, existsSync, mkdirSync } from 'node:fs'
import { pipeline } from 'node:stream'
import { promisify } from 'node:util'

const pump = promisify(pipeline)

export async function uploadRoutes(app: FastifyInstance) {
  app.post('/upload', async (request, reply) => {
    try {
      const upload = await request.file({
        limits: {
          fileSize: 5_242_880, // 5MB
        },
      })

      if (!upload) {
        return reply.status(400).send()
      }
      const mimiTypeRegex = /^(image|video)\/[a-zA-z]+/

      const isValidFileFormat = mimiTypeRegex.test(upload.mimetype)

      if (!isValidFileFormat) {
        return reply.status(400).send()
      }

      const fileId = randomUUID()
      console.log('🚀 ~ file: upload.ts:31 ~ app.post ~ fileId:', fileId)
      const extension = extname(upload.filename)
      console.log('🚀 ~ file: upload.ts:33 ~ app.post ~ extension:', extension)

      const fileName = fileId.concat(extension)
      console.log('🚀 ~ file: upload.ts:36 ~ app.post ~ fileName:', fileName)

      const directoryPath = resolve(__dirname, '../../uploads')

      if (!existsSync(directoryPath)) {
        // O diretório não existe, você pode criar o diretório aqui
        mkdirSync(directoryPath, { recursive: true })
      }

      const writeStream = createWriteStream(resolve(directoryPath, fileName))

      await pump(upload.file, writeStream)

      console.log('🚀 ~ file: upload.ts:44 ~ pump concluido')

      const fullUrl = request.protocol.concat('://').concat(request.hostname)
      console.log('🚀 ~ file: upload.ts:47 ~ app.post ~ fullUrl:', fullUrl)

      const fileUrl = new URL(`/uploads/${fileName}`, fullUrl).toString()

      console.log('🚀 ~ file: upload.ts:51 ~ app.post ~ fileUrl:', fileUrl)

      return { fileUrl }
    } catch (error) {
      console.log('🚀 ~ file: upload.ts:55 ~ app.post ~ error:', error)
    }
  })
}
