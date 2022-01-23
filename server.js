import express from 'express';
import { APP_PORT,DB_URL } from './config/index.js';
 import errorHandler from './src/middlewares/errorHandler.js';
 import routes from './src/routes/index.js'


const app = express();
app.use(express.urlencoded({extended:false}))

app.get('/',(req,res)=>{
    res.send('hello world')
})

app.use(express.json()) 

app.use('/api',routes)

app.use(errorHandler); 

app.listen(APP_PORT,()=>{
    console.log(`listning on port ${APP_PORT}`)   
}) 

 