import { Router } from "express";
import { createUser, updateUser, deleteUser, login, getUser ,getAllUsers} from '../controllers/user.js'
import { verifyAll, verifyToken } from '../middleWere/requireAuth.js'

const router = Router()

router.post('/register/create', createUser)
router.put('/register/update', verifyToken, verifyAll(['admin']), updateUser)
router.delete('/register/delete/:id', verifyToken, verifyAll(['admin']), deleteUser)
router.post('/login', login)
router.get('/getUser/:id', verifyToken, verifyAll(['admin', 'intelligence', 'airForce']), getUser)
router.get('/allUsers',verifyToken, verifyAll(['admin']), getAllUsers)

export default router