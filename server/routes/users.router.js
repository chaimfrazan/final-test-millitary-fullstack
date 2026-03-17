import { Router } from "express";
import { createUser, updateUser, deleteUser, login, getUser } from '../controllers/user.js'
import { verifyAll, verifyToken } from '../middleWere/requireAuth.js'

const router = Router()

router.post('/register/create', verifyToken, verifyAll(['admin']), createUser)
router.put('/register/update', verifyToken, verifyAll(['admin']), updateUser)
router.delete('/register/delete/:id', verifyToken, verifyAll(['admin']), deleteUser)
router.post('/login', verifyToken, verifyAll(['admin', 'intelligence', 'airForce']), login)
router.get('/getUser', verifyToken, verifyAll(['admin', 'intelligence', 'airForce']), getUser)

export default router