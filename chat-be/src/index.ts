import { WebSocketServer,WebSocket } from "ws";

const wss = new WebSocketServer({ port: 8080 });
let userCount = 0;
interface User{
    socket:WebSocket;
    room:string;
}

let allSockets:User[]=[];

wss.on("connection", (socket) => {
    
 

  socket.on("message", (text) => {
    //@ts-ignore
    const parseMessage = JSON.parse(text);
      if (parseMessage.type =="join"){
        allSockets.push({
          socket,
          room:parseMessage.payload.roomId 
        })
    }
    let currentUserRoom = null;
        if(parseMessage.type== "chat"){
          for(let i=0;i< allSockets.length;i++){
            if(allSockets[i].socket==socket)
                currentUserRoom=allSockets[i].room
          }

        }
        
        for(let i=0;i< allSockets.length;i++){
            
           if(allSockets[i].room==currentUserRoom)
              allSockets[i].socket.send(parseMessage.payload.message)
        }
        
  });

});
