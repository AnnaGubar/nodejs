const ws = new require("ws");

const wsServer = new ws.Server({port: 5000});

const clients = [];

wsServer.on("connection", (newClient)=> {
    console.log("Новое подключение с фронтенда")

    // принимает сообщение с фронта
    newClient.on("message",(msg)=>console.log(msg.toString()))
    
    setTimeout(()=> {
        newClient.send("Добро пожаловать на наш сервер!")
    }, 3000)
    
    clients.push(newClient);
    clients.forEach(client => {
        if(client !== newClient){
            client.send("К нам присоединился новый пользователь")
        }
    })
})


