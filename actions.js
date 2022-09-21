export const handlePrivateMessage = (message, io) => {
    const json = JSON.parse(message);
    const { id, message } = json;
    io.to(id).emit(message);
};