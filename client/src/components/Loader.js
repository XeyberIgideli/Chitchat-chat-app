import { AiFillWechat } from "react-icons/ai"; 

export function Loader() {
    return (
        <div className="bg-zinz-50 transition-all duration-600 flex-col h-screen w-full text-pink-600 flex items-center justify-center">
            <AiFillWechat size={100}/>
            <h2 className="text-black text-2xl">Chitchat</h2>
        </div>
    )
}