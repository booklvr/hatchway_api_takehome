import express from 'express'

import apiRouter from './routes/apiRoutes.js'

const app = express()

app.use(express.json())

app.use('/api', apiRouter)

const PORT = 3000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
