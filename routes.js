export const routes = (server) => {
    server.get('/', (req, res) => res.sendFile(__dirname + '/html/index.html'));
};