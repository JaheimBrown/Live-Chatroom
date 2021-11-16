// Adding documents to the chat collection ✔
// Getting all / new chats from chats collection ✔
// Making comples queries ✔
// update username ✔
// update chatroom ✔

class Chatroom {
    constructor(room, username){
        this.room = room;
        this.username = username;
        this.chats = db.collection('chats');
        this.unsub;
    }
    async addChat(message){
        // creating time variable for timestamp
        const now = new Date();
        // create message object
        const chat = {
            message,
            username: this.username,
            room: this.room,
            created_at: firebase.firestore.Timestamp.fromDate(now)
        }
        // Adding new object / chat to the database
        const response = await this.chats.add(chat);
        return response;
    }
    getChats(callback){
        this.unsub = this.chats
        .where('room', '==', this.room) //complex query checking document key
        .orderBy('created_at')
        .onSnapshot(snapshot => {
            snapshot.docChanges().forEach(change => {
                if(change.type === 'added'){
                    // updating the UI
                    callback(change.doc.data());
                }
            })
        })
    }
    updateUsername(name){
        this.username = name;
        localStorage.setItem('username', name);
    }
    updateRoom(room){
        this.room = room;
        console.log('room updated');
        if(this.unsub){
            this.unsub();
        }
    }
}