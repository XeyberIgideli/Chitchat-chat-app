import { IoIosInformationCircleOutline } from "react-icons/io";
import { useParams } from "react-router-dom";
function Header({peerData}) {
  // const {chatId, username} = useParams()
    return (
      <div className="h-[60px] border-b px-5 border-gray-300 flex justify-between items-center">
        <button className="flex gap-x-4 items-center">
        <img className="h-6 w-6 rounded-full" src={peerData.profilePhoto} alt="" />
          {peerData.username}
        </button>
        <button>
        <IoIosInformationCircleOutline size={24}/>
        </button>
      </div>
    )
  }
  
  export default Header;
  