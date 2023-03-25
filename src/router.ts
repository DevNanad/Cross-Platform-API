import {Router} from 'express'

const router = Router()

router.get('/test', (req, res) => {
    res.status(200)
    res.json({success: "Nice!"})
})

export default router