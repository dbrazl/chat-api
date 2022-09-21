const express = require('express');
const HTTP = require('http');
const IO = require('socket.io');
import { events } from 'events';

const server = express();

export const init = () => {
    const http = HTTP.createServer(server);
    const io = IO(http);

    io.on('connection', (socket) => events(socket, io));
};

export const listen = (port = 5000) => {
    server.listen(port);
}