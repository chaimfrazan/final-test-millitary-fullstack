import { Router } from "express";
import { addRocket, allRocket, getRocket, deleteOne } from '../controllers/rocket.js'
import { verifyAll, verifyToken } from '../middleWere/requireAuth.js'

const router = Router()

router.post('/launchers', verifyToken, verifyAll(['admin','intelligence']), addRocket)
router.get('/launchers', verifyToken, verifyAll(['admin','intelligence','airForce']), allRocket)
router.get('/launchers/:id', verifyToken, verifyAll(['admin','intelligence','airForce']), getRocket)
router.delete('/launchers/:id', verifyToken, verifyAll(['admin','intelligence']), deleteOne)

export default router