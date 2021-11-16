class chatUI{
    constructor(list){
        this.chatList = list;
    }
    render(data){
        // Format date using the dateFNS library
        const time = dateFns.distanceInWordsToNow(
            data.created_at.toDate(),
            {addSuffix: true}
        );
        const html = `
            <li class="list-group-item">
                <span class="username">${data.username}</span>
                <span class="message">${data.message}</span>
                <div class="time">${time}</div>
            </li>
        `;

        this.chatList.innerHTML += html;
    }
    clear(){
        this.chatList.innerHTML = '';
    }
}