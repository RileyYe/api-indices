import { serve } from '@hono/node-server'
import { Hono } from 'hono'

// Routers
import imgOCR from './img/ocr/index.js'

const app = new Hono()

app.route('/image/ocr', imgOCR)

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

const port = 3000
console.log(`Server is running on http://localhost:${port}`)

serve({
  fetch: app.fetch,
  port
})
