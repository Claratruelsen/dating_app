
const socket = io('http://localhost:4000')
const messageContainer = document.getElementById('message-container')
const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')

//giver sender og modtager navne
const name = prompt('What is your name?')
appendMessage('You joined')
socket.emit('new-user', name)

socket.on('chat-message', data => {
    appendMessage(`${data.name}: ${data.message}`)
})

// Besked om at bruger er tilsluttet
socket.on('user-connected', name => {
    appendMessage(`${name} tilsluttet`)
})

// Besked om at bruger er disconnected 
socket.on('user-disconnected', name => {
    appendMessage(`${name} disconnected`)
})


//sørger for at siden ikke refrsher når man sender en besked
messageForm.addEventListener('submit', e => {
    e.preventDefault()
    const message = messageInput.value
    appendMessage(`You: ${message}`)
    socket.emit('send-chat-message', message)
    messageInput.value = ''
})

function appendMessage(message) {
    const messageElement = document.createElement('div')
    messageElement.innerText = message
    messageContainer.append(messageElement)
}

