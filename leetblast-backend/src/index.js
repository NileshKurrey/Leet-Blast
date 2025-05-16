import express from 'express';
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParer from 'cookie-parser'
import UserRoutes from  './routes/User.routes.js'
dotenv.config({
    path:'./.env'
})
const app = express();
app.use(cors({
    origin: 'http://localhost:4000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],

}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParer())


//Routes
app.get('/',(req,res)=>{
    res.send('hello')
})
app.use('/api/v1/user', UserRoutes);
const Port = process.env.PORT ;
app.listen(Port, () => {
    console.log(`Server is running on port ${Port}`);
});