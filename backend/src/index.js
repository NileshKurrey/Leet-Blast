import express from 'express';
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParer from 'cookie-parser'
import UserRoutes from  './routes/User.routes.js'
import ProblemRoutes from './routes/Problem.routes.js';
import SubmissionsRoutes from './routes/submissions.routes.js'
import executionRoute from './routes/ExecuteCode.routes.js'
import playlistRoutes from './routes/Playlist.routes.js';
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

app.use("/api/v1/user",UserRoutes)
app.use("/api/v1/problems",ProblemRoutes)
app.use('/api/v1/submissions',SubmissionsRoutes)
app.use('/api/v1/executeCode',executionRoute)
app.use("/api/v1/playlist",playlistRoutes)
const Port = process.env.PORT ;
app.listen(Port, () => {
    console.log(`Server is running on port ${Port}`);
});