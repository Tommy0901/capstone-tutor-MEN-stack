import express, { type Request, type Response } from 'express'
import cors from 'cors'

import { router } from './routes/router'

const app = express()
const port = process.env.PORT ?? 3000

app.use(cors(), express.json())

for (const route of router) {
  app.use(route.getRouter())
}

app.listen(port, () => { console.info(`Server is running on http://localhost:${port}`) })

export default app
