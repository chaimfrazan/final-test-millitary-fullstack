import { Router } from "express";
import { addRocket, allRocket, getRocket, deleteOne } from '../controllers/rocket.js'

const router = Router()

router.post('/launchers', addRocket)
router.get('/launchers', allRocket)
router.get('/launchers/:id', getRocket)
router.delete('/launchers/:id', deleteOne)

export default router