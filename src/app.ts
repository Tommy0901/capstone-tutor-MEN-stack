import express from 'express'
import cors from 'cors'

import { router } from './routes/router'
import { apiErrorHandler } from './middlewares/error-handler'

const app = express()
const port = process.env.PORT ?? 3000

app.use(cors(), express.json())

for (const route of router) {
  app.use(route.getRouter())
}

app.use('/', apiErrorHandler)

app.listen(port, () => { console.info(`Server is running on http://localhost:${port}`) })

export default app
