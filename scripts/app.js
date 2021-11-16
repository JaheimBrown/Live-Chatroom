// Dom Queries
const chatList = document.querySelector('.chat-list');
const newChat = document.querySelector('.new-chat');
const newName = document.querySelector('.new-name');
const rooms = document.querySelector('.chat-rooms');
const updmsg = document.querySelector('.update-mssg');
const username = localStorage.username ? localStorage.username : 'anon'; 

// Class Instances
const UI = new chatUI(chatList);
const chatroom = new Chatroom('general', username);

// Events & Initializations 
chatroom.getChats(data => UI.render(data));

newChat.addEventListener('submit', e => {
    e.preventDefault();

    const msg = newChat.message.value.trim();
    // console.log(msg)
    // addChat
    if(msg){
        chatroom.addChat(msg).then(console.log('chat added'));
    }
    newChat.reset();
})

// Updating name
newName.addEventListener('submit', e => {
    e.preventDefault();
    // getting value from input 
    const name = newName.name.value.trim();
    chatroom.updateUsername(name);
    updmsg.innerText = `Your name has been updated to "${name}"`;
    updmsg.classList.add('show');
    // Clear updmsg after 3 seconds
    setTimeout(() => {
        updmsg.classList.remove('show');
    }, 3000);
    // clear field after submission
    newName.reset();
})

// Updating room
rooms.addEventListener('click', e => {
    if(e.target.tagName === 'BUTTON'){
        UI.clear();
        chatroom.updateRoom(e.target.getAttribute('id'));
        chatroom.getChats(chats => UI.render(chats));
    }
})