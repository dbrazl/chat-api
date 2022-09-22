
export const handlePrivateMessage = (message, io) => {
    const { room } = message;
    io.in(room).emit('message', message);
};

export const handleJoinToRoom = (message, socket) => {
    const { room } = message;
    socket.join(room);
};

export const handleDisconnect = (id) => {
    console.log(`User ${id} has been disconected!`);
};