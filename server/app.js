import express from 'express'
import cors from 'cors'
import { disconnect } from './db/connect-mongo.js'
import rocket from './routes/rocket.router.js'


const app = express()
const port = 3001


app.use(express.json())
app.use(cors())

app.use('/api', rocket)





app.listen(port, () => {
    console.log(`Server is runing on port ${port}...`)
})
process.on("SIGINT", () => disconnect());