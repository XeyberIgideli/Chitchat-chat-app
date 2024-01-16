import { useSelector } from "react-redux"
import { BiMessageSquareAdd } from "react-icons/bi";
import { FaChevronDown } from "react-icons/fa6";
import Chatlist from "./Chatlist";

export default function Sidebar () {
    const user = useSelector(state => state.auth.user)
    return (
        <aside className="md:w-[349px] flex-shrink-0 border-r border-gray-300">
           <header className="flex h-[60px] border-b px-5 border-gray-300 justify-center md:justify-between items-center">
              <button className="hidden md:flex gap-x-2.5 mx-auto items-center font-semibold">
                {user.username}
                <FaChevronDown size={18}/>
              </button>
            <BiMessageSquareAdd className="text-[32px] md:text-[24px]"/>
           </header>

           {/* Chatlist */}
           
           <Chatlist/>
        </aside>
    )
}