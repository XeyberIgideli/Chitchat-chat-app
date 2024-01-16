import { FaHashtag } from "react-icons/fa6"

export default function Tagged () {
    return (
        <div className="flex flex-col items-center justify-center gap-4 pt-10">
            <div className="w-[62px] h-[62px] border-2 border-black rounded-full flex items-center justify-center ">
                <FaHashtag size={30}/>
            </div>
                <h6 className="text-[28px] font-light">No Photos</h6>
        </div>
    )
}