import cors from 'cors';
import express from 'express';

export const middlewares = (server) => {
    server.use(cors());
    server.use(express.static('html'))
};