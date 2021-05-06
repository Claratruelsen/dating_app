/* class Chat{
    constructor(msg){
        this._msg = msg;
    }

//funktioner
    send_msg(){
        return "msg sent"
    }

    receive_msg(){
        return "msg received"
    }

    delete_msg(){

    }
}
*/
const io = require('socket.io')(4000)
const users = {}

io.on('connection', socket => {
    socket.on('new-user', name => {
        users[socket.id] = name
        socket.broadcast.emit('user-connected', name)
    })
    socket.on('send-chat-message', message => {
        socket.broadcast.emit('chat-message', {message: message, name: users[socket.id]}) //sender besked til alle andre end afsenderen
    })
    socket.on('disconnect', () => {
        socket.broadcast.emit('Bruger disconnected', users[socket.id])
        delete users[socket.id] 
        
    })
});
