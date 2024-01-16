import { Outlet } from "react-router-dom" 
import Sidebar from "components/Inbox/Sidebar"
export default function InboxLayout () {
    return (
        <div className=" border-x lg:border-b lg:border-t border-gray-300 bg-white rounded lg:h-[calc(100vh-100px)] h-[calc(100vh-65px)] flex"> 
            <Sidebar/>
            <Outlet/> 
        </div>
    )
}