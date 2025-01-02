import { useEffect, useRef, useState } from "react"


function App() {
  const [message,setmessage]=useState(["hello  "])
  const [message2,setmessage2]=useState(["hi there "])
  const wsRef = useRef();
  useEffect(()=>{
    const ws = new WebSocket("ws://localhost:8080");
        ws.onmessage=(event)=>{
            setmessage(m=>[...m,event.data])
        }
        wsRef.current=ws;
        ws.onopen=()=>{
          ws.send(JSON.stringify({
            type:"join",
            payload:{
              roomId:"123"
            }
          }))
        }
  },[])
  return (
    <div style={{backgroundColor:"white", width:"100vw", height:"100vh", display:"flex", alignItems:"center", justifyContent:"center"}}>
         <div style={{backgroundColor:"black", width:600,height:600, borderRadius:10}}>
               
               {/* for all messages */}
               <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between",height:550}}>
                   <div style={{ width:300,height:540, paddingTop:10,paddingLeft:10}}>
                     {message.map(message=> <div style={{color:"black", backgroundColor:"white",width:"auto",height:"auto", padding:10,borderRadius:15, marginRight:10, marginBottom:15 }}> {message}</div>)}
                   </div>
                   <div style={{ width:300,height:540, paddingTop:10,paddingLeft:10}}>
                     {message2.map(message=> <div style={{color:"white", backgroundColor:"green",width:"auto",height:"auto", padding:10,borderRadius:15, marginRight:10, marginBottom:15 }}> {message}</div>)}
                   </div>
               </div>
               
               {/* for input  message  */}
               <div style={{display:"flex",alignItems:"center",justifyContent:"end"}}>

               <input id="message" type="text" style={{width:515, height:35,paddingLeft:20,fontSize:14,fontFamily:"fantasy" ,borderRadius:10,border:"1px solid green ",marginLeft:10}} placeholder='Message ' />
               <button style={{  backgroundColor:"green" ,height:40,width:80,borderRadius:10, marginLeft:10,marginRight:10}} onClick={()=>{
                //@ts-ignore
                const text = document.getElementById("message").value;
                
                
                wsRef.current.send(JSON.stringify({
                  type:"chat",
                  payload:{
                    message:text
                  }
                }))
                //@ts-ignore
                document.getElementById("message").value="";
               }}>Send</button>
                    
               </div>
         </div>
    </div>
  )
}

export default App
