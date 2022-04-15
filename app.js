const express = require('express');
const {Server} = require('socket.io');
const ProductsRouter = require('./routes/productsRoute');
const normalizr = require('normalizr');
const schema = require('normalizr');
const moment = require('moment');



// const MockProducts = require('./Mocks/mockProducts')
const ProductsManagerDB = require ('./Manager/ProductsManager.js');
const MessageManagerDB = require('./Manager/ProductsManager');


//Services
const productService = new ProductsManagerDB();
const messageService = new MessageManagerDB();
const app = express();
const PORT = process.env.PORT||8080;
const server = app.listen(PORT,()=>console.log(`Listening on PORT${PORT}`))
const io = new Server(server);

app.use(express.static(__dirname +'/public'))

//Router
app.use("/api/products-test", ProductsRouter);

io.on('connection', async socket=>{
    console.log('client is online');
    let products = await productService.getAll();
    io.emit("productLog", products);
    socket.on('sendProduct', async data=>{
       await productService.add(data);
       console.log(data)
       let products = await productService.getAll();
       io.emit('productsLog', products)
    })
})

let log = [];
const indexLog = [];
const mainLog = {
  id: "999",
  name: "Messenger",
  log: log,
};

io.on('connection',(socket)=>{
    socket.broadcast.emit('newUser')
    socket.emit('log', log);

    socket.on('message', data=>{
        log.push(data);
        io.emit('log',log);
        indexLog.push(data);
        io.emit("chatLog", indexLog);
    });

    socket.on('registered', data=>{
        socket.emit('log',log);
        console.log(data)
        // log.push(data);
        // console.log(JSON.stringify(normalizedData, null, '\t'));
    })
});

/*Normalize*/

// const author = new schema.Entity("author");
// const chatSchema = new schema.Entity("mainChat", {
//   author: author,
//   messages: [author],
// });

// const normalizedData = normalize(mainLog, chatSchema);

