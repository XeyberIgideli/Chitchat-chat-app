import { getMessages } from "config/_firebase";
import Header from "components/Chat/Header";
import MessageInput from "components/Chat/MessageInput";
import Messages from "components/Chat/Messages";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux"; 
import { getChatListByChatID,setMessageSeen } from "config/_firebase";
import HeaderSkeleton from "components/Chat/Skeletons/HeaderSkeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { io } from "socket.io-client";

export default function Chat() {
  const socket = io("http://localhost:5000");
  const [messages, setMessages] = useState([]);
  const user = useSelector((state) => state.auth.user);
  const { chatId } = useParams();
  const [peerData, setPeerData] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (chatId) {
      getMessages(chatId)
        .then((message) => setMessages(message ? message : []))   
    }
  
  }, [chatId]);  

  useEffect(() => { 
    if(user.uid) { 
      getChatListByChatID(user.uid, chatId)
      .then(chat => setPeerData(chat.length > 0 ? chat[0][chatId] : []))    
      .finally(() => setLoading(false));
    } 
  },[user.uid, chatId])   
  
  useEffect(() => {
    if(messages.length > 0) {
        const lastMessage = messages[messages.length-1]
    if(lastMessage.sentBy !== user.userID && !lastMessage.seenBy) {
        setMessageSeen(chatId,lastMessage.messageId).then(item => console.log(item))
    } 
    }
  }, [messages])
  return (
    <div className="flex-1"> 
          { loading ? ( <HeaderSkeleton/> ): ( <Header peerData={peerData}/>)}
          <Messages messages={messages} />
          <MessageInput setMessages={setMessages} peerData={peerData} />
    </div>
  );
}
