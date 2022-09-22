window.onload = () => {
    let messages = [];
    const USER_ID = '123456789'

    const socket = io('http://localhost:5000/');

    const sidebarItems = document.querySelectorAll('.sidebar-item');
    sidebarItems.forEach(item => item.addEventListener('click', () => {
        // remove all itens selecteds
        sidebarItems.forEach(div => div.classList.remove('selected'))

        // change code on chat
        const chatUserId = document.querySelector('.chat-user-id');
        const itemId = item.querySelector('.user-id');
        chatUserId.innerHTML = itemId.innerHTML;

        // change username on chat
        const chatUsername = document.querySelector('.chat-username');
        const itemUsername = item.querySelector('.username');
        chatUsername.innerHTML = itemUsername.innerHTML;

        // add selection on side bar
        if (itemId.innerHTML === chatUserId.innerHTML) {
            item.classList.add('selected');
        }

        // Add messages
        const chatContent = document.querySelector('.chat-content');
        chatContent.innerHTML = messages.map(json => {
            if (json.room === roomID) {
                if (json.own) {
                    return `<p class="my-message">${json.message}</p>`;
                }
    
                return `<p class="message">${json.message}</p>`;
            }

            return null;
        }).filter(item => item).join('');
    }));

    // Conect in all rooms on chat
    sidebarItems.forEach(item => {
        const itemId = item.querySelector('.user-id');
        const roomID = `${itemId.innerHTML}-${USER_ID}`;
        const joinToRoom = {
            room: roomID,
        };
        socket.emit('joinToRoom', joinToRoom);
    });

    const form = document.querySelector('.chat');
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const chatUserId = document.querySelector('.chat-user-id');
        const chatInput = document.querySelector('.chat-input');
        const message = {
            room: `${chatUserId.innerHTML}-${USER_ID}`,
            own: true,
            message: chatInput.value,
        };
        socket.emit('message', message);
    });

    socket.on('message', (message) => {
        messages.push(message);
        
        const chatUserId = document.querySelector('.chat-user-id');
        const chatContent = document.querySelector('.chat-content');
        const roomID = `${chatUserId.innerHTML}-${USER_ID}`;

        if (roomID === message.room) {
            if (message.own) {
                chatContent.insertAdjacentHTML('beforeend', `<p class="my-message">${message.message}</p>`)
            } else {
                chatContent.insertAdjacentHTML('beforeend', `<p class="message">${message.message}</p>`)
            }
        }
    });
};