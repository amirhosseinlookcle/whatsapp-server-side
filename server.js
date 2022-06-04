const io = require('socket.io')(5000, {
    cors:{
        origin: ['http://localhost:3000']
    }
});
io.on('connection', socket => {
    const id = socket.handshake.query.id;
    socket.join(id)
    console.log(id)
    console.log('first')

    socket.on('send-message', ({recipients, text}) => {
        console.log('first')
        recipients.forEach(recipient => {
                const newRecipients = recipients.filter(r => r !== recipient)
                newRecipients.push(id);
                socket.broadcast.to(recipient).emit('receive-message', {
                    recipients: newRecipients, sender: id, text
                })
            });

    })
})