import { handlePrivateMessage } from "./actions";

export const events = (socket, io) => {
    socket.on('message', (message) => handlePrivateMessage(message, io));
    socket.on('disconect', () => console.log(`User ${socket.id} has been disconected!`));
};