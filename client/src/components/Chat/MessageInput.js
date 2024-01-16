import { GrEmoji } from "react-icons/gr";
import { FaRegImage } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { useState,useRef, useEffect } from "react"; 
import TextareaAutosize from 'react-textarea-autosize';
import classNames from "classnames";
import { useSelector } from "react-redux";
import { setInputHeight } from "utils";
import { sendMessage } from "config/_firebase";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import {v4 as uuidv4} from 'uuid';

export default function MessageInput({setMessages, peerData}) {

  const [message, setMessage] = useState(''); 
  const socket = io("http://localhost:5000");
  const inputRef = useRef()
  const height = useSelector(state => state.inputHeight.height) 
  const user = useSelector(state => state.auth.user)   

  const {chatId} = useParams()
  
  useEffect(() => {
      const heightStyle = +inputRef.current.style.height.replace('px','')
      setInputHeight(heightStyle)
  }, [message])

 
  useEffect(() => {
      socket.on("message", (message) => {
        if(message.recipient.userID === user.userID || message.sentBy === user.userID) {
          setMessages(messages => [
            ...messages, 
            message
          ])
        }
    })

      return () => {
        socket.off("message");
      };

  }, [])

  async function handleMessage (e) {
    e.preventDefault()  
    const messageId = uuidv4()
    const date = new Date()
    await sendMessage(chatId, user.uid, message)
 
    socket.emit("message", {
      messageId,
      sentBy: user.uid,
      message,
      recipient: peerData,
      seenBy: false, 
      sentTime: date.toLocaleDateString() + "," + date.getHours() + ":" +  date.getMinutes()
    });
    // socket.emit("messageSeen", messageId);
    setMessage('')
  }

  return (
    <footer className="min-h-[84px] max-h-[110px] flex items-center px-6 ">  
      <form onSubmit={handleMessage} className={classNames({
        "min-h-[44px] rounded-full border border-gray-400 gap-x-2 flex items-center w-full pl-[11px] pr-[8px]":true,
        "max-h-[110px] rounded-2xl": height > 80
      })}>
        
        <button type="button" className="w-[40px] h-[42px] flex items-center">
          <GrEmoji size={24} />
        </button>
        <TextareaAutosize 
          type="text" 
          value={message}
          ref={inputRef}
          onHeightChange={rowHeight => rowHeight}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Message..."
          className="max-h-[105px] resize-none overflow-y-auto text-sm w-full outline-none focus:placeholder-gray-300 placeholder-gray-500"
        />
        {!message && (
          <>
            <button type="button" className="w-[40px] h-[42px] flex items-center">
              <FaRegImage size={24} />
            </button>
            <button type="button" className="w-[40px] h-[42px] flex items-center">
              <FaRegHeart size={24} />
            </button>
          </>
        )}
        {message && (
            <button type="submit" className="text-primary px-2 font-semibold">Send</button>
        )}
      </form>
    </footer>
  );
}
