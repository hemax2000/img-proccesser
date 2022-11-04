import express from 'express';
import image from './api/image'
const routes = express.Router()

routes.get('/', (req , res) => { 
    res.send(
        "hello world"
    )
})

routes.use('/image?', image)

export default routes