import { Button } from "components/Button";
import { TbMessages } from "react-icons/tb";

export default function Inbox () {
    return (
        <div className="flex flex-col gap-y-4 items-center justify-center h-full w-full"> 
           <TbMessages className="border border-black rounded-full p-6" size={110}/>
           <h2 className="text-[22px]">Your Messages</h2>
           <p className="text-sm text-[#8e8e8e] px-4 sm:px-0 text-center sm:text-left">Send private photos or messages to a friend or group.</p>
            <div>
             <Button>Send Message</Button>
            </div>
        </div>
    )
}