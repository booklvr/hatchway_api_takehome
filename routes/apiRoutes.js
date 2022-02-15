import { Router } from 'express'

import { hatchwayGetRequest } from '../controllers/apiController.js'

const router = Router()

router.get('/ping', (req, res) => {
  res.status(200).json({
    success: true,
  })
})

router.get('/posts', hatchwayGetRequest)

export default router
