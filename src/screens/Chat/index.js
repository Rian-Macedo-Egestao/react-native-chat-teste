import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import io, { Socket } from "socket.io-client/dist/socket.io";



export function Chat(){
    const [socketRef, setSocketRef] = useState(null);
    const [ chatMessage, setChatMessage] = useState('');
    const [ chatMessages, setMessages ] = useState([]);

    
    useEffect(()=>{
      if(socketRef) return
      try {
        setSocketRef(io("http://192.168.1.84:3001", 
        {
          transports: ['websocket'],
          withCredentials:true,
          transportOptions: {
            polling: {
              extraHeaders: {
                'my-custom-header': 'abcd'
              }
            }
          }
        }))

        console.log("socket", socketRef);
      } catch (error) {
        console.log("ERRO AO CONECTAR:",error)
      }
      
    },[])
    
    useEffect(()=>{
      if (!socketRef) return
      
      console.log(socketRef.connected);
      socketRef.on("message", msg => {
        setMessages(value=>[...value, msg.Conteudo])
      });

      socketRef.on('connect', msg => {
        socketRef.emit('app connect', "usuario connctado")
      }
      );

      socketRef.on("connect_error", (error) => {
        console.log(error)
      })

    },[socketRef])
    
    useEffect(()=>{
      console.log("chat stack:", chatMessages);
    },[chatMessages])

    function submitChatMessage() {
        socketRef.emit('message', chatMessage);
        setChatMessage('');
      }

    const chatMessagesText = chatMessages.map((chatMessage,index) => (
        <Text key={'asd'+index} style={{borderWidth: 2, top: 500}}>{chatMessage}</Text>
      ));

   return (
    <View style={styles.container}>
        {chatMessagesText}
        <TextInput
        style={{height: 40, borderWidth: 2, top:600}}
        autoCorrect={false}
        value={chatMessage}
        onSubmitEditing={() => submitChatMessage()}
        onChangeText={setChatMessage}
        />
    </View>
   )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,

      backgroundColor: '#F5FCFF',
    },
  });
