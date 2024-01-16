import { NavLink, useParams } from "react-router-dom";
import classNames from "classnames";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default function ChatLinkSkeleton ({index}) {
    return (
        <NavLink key={index} className={classNames({
            "flex items-center gap-x-4 px-5 py-2": true,
            // "bg-[#efefef]": chatId == chat,
            // "hover:bg-zinc-50 transition-all duration-400": chatId != chat
        })}> 
            <Skeleton height={65} width={65} circle/>
            <div className="w-full hidden sm:block">
             <Skeleton />
             <Skeleton />
            </div>
        </NavLink> 
    )
    
}