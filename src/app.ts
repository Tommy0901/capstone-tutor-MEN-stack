import express, { type Request, type Response } from 'express'
import cors from 'cors'

const app = express()
const port = process.env.PORT ?? 3000

app.use(cors(), express.json())

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})

app.listen(port, () => { console.info(`Server is running on http://localhost:${port}`) })

export default app
