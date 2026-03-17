import express from 'express'
import cors from 'cors'
import { disconnect } from './db/connect-mongo.js'
import rocket from './routes/rocket.router.js'
import users from './routes/users.router.js'


const app = express()
const port = 3000

app.use((req, res, next) => {
    console.log(req.method, req.url)
    next()
})

app.use(express.json())
app.use(cors())


app.use('/api', rocket)
app.use('/api/auth', users)


app.listen(port, () => {
    console.log(`Server is runing on port ${port}...`)
})
process.on("SIGINT", () => disconnect());