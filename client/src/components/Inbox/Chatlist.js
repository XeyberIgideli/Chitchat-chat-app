import { NavLink, useParams } from "react-router-dom";
import classNames from "classnames";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {getChatList } from "config/_firebase"; 
import ChatLinkSkeleton from "./ChatLinkSkeleton";

export default function Chatlist () {
    const {chatId} = useParams()
    
    const user = useSelector(state => state.auth.user)  
    const [loading, setLoading] = useState(true)

    const [chatList, showChatList] = useState([]) 
    useEffect(() => { 
       if(user.uid) {
         getChatList(user.uid)
         .then(chat => showChatList(chat ? chat : []))   
         .finally(() => setLoading(false))
       }
    }, [user.uid,chatId]) 
 
    return (
        <div className="h-[calc(100%-60px)] overflow-auto flex flex-col gap-y-2">   
            <header className="hidden md:flex justify-between py-3 px-5 items-center">
                <h6 className="font-semibold">Messages</h6>
                <button className="text-primary font-semibold">16 requests</button>
            </header> 

{loading ? (
        // Render skeleton while loading
        Array.from({ length: 5 }, (_, index) => (
          <ChatLinkSkeleton key={index} />
        ))
      ) : (
        // Render actual chat items
        chatList?.map((chat, index) => (
          <NavLink
            key={index}
            to={Array.from(Object.keys(chat[0]))[0]}
            className={classNames({
              "flex items-center gap-x-4 px-5 py-2": true,
              "bg-[#efefef]": chatId == Array.from(Object.keys(chat[0]))[0],
              "hover:bg-zinc-50 transition-all duration-400":
                chatId != Array.from(Object.keys(chat[0]))[0],
            })}
          >
            <img
              className="h-16 w-16 rounded-full"
              src={Array.from(Object.keys(chat[0]), (key) => chat[0][key].profilePhoto)}
              alt=""
            />

            <div className="hidden sm:block">
              <h6>{Array.from(Object.keys(chat[0]), (key) => chat[0][key].username)}</h6>
              <p className="text-sm text-[#8e8e8e]">
                {Array.from(Object.keys(chat[0]), (key) => chat[0][key].fullName)}
              </p>
            </div>

          </NavLink>
        ))
      )}

        </div>
    )
}