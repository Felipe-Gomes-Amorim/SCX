import express from 'express';
import {router} from './routes';
import 'dotenv/config';
import './shared/middlewares/services/translationsYup';
import cors from 'cors';

const server = express();

server.use(cors({
    origin: 'http://localhost:5173'
}));

server.use(express.json());

server.use(router);

export { server };  