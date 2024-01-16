import { NavLink, useParams } from "react-router-dom";
import classNames from "classnames";
import 'react-loading-skeleton/dist/skeleton.css'

export default function ChatLink ({index,chat, chatId, chatList}) {
    return (
        <NavLink key={index} to={chatId || chat} className={classNames({
            "flex items-center gap-x-4 px-5 py-2": true,
            "bg-[#efefef]": chatId == chat,
            "hover:bg-zinc-50 transition-all duration-400": chatId != chat
        })}> 
            
            <img className="h-14 w-14 rounded-full" src={chatList[chat].profilePhoto} alt="" />
            <div>
                <h6>{chatList[chat].username}</h6>
                <p className="text-sm text-[#8e8e8e]">{chatList[chat].fullName}</p>
            </div>
        </NavLink> 
    )
    
}