import express from 'express';
import HTTP from 'http';
import { Server } from 'socket.io';
import { handleDisconnect, handleJoinToRoom, handlePrivateMessage } from './actions';
import { middlewares } from './middlewares';
import { routes } from './routes';

const server = express();
const http = HTTP.createServer(server);

export const init = () => {
    const io = new Server(http);

    routes(server);
    middlewares(server);
    
    io.on('connection', (socket) => events(socket, io));
};

const events = (socket, io) => {
    socket.on('message', (message) => handlePrivateMessage(message, io));
    socket.on('joinToRoom', (message) => handleJoinToRoom(message, socket));
    socket.on('disconect', () => handleDisconnect(socket.id));
};

export const listen = (port = 5000) => {
    http.listen(port);
}