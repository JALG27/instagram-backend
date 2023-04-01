import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import path from 'path'

import authRoutes from './routes/auth.routes'

//inicializacion
const app = express();

//settings
app.set('port', process.env.PORT || 3000);

//middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE")
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, X-Requested-With, Content-Type, Accept")
})

//routes
app.get('/', (req,res)=> {
    res.send(`La API esta en http://localhost:${app.get('port')}`);
});

//carpeta para publics
app.use('/uploads', express.static(path.resolve('uploads')));


app.use(authRoutes);

export default app;