import express from 'express';

const PingRouter = express.Router();

PingRouter.get('/ping', (req, res) => res.status(200).json('Pong'));

export default PingRouter