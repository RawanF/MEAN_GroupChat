const express = require("express");
const app = express();
app.use(express.urlencoded({ extended: true }));
const server = app.listen(8000);
const io = require('socket.io')(server);
// var users = []
var messages = []
io.on('connection', function (socket) {
    // socket.on('new_user', function (data) {
    //     users.append(data.name)
    //     socket.emit('getAllMessages', { messages: messages })
    // });
    socket.emit('getAllMessages', { messages: messages })
    socket.on('send_message', function (data) {
        messages.push(data.name+": "+data.msg)
        io.emit('updateNewMessage', { messages: messages });
    })


});
app.get("/", (req, res) => {
    res.render('index');
})
app.use(express.static(__dirname + "/static"));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');