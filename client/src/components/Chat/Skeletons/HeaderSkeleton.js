import { IoIosInformationCircleOutline } from "react-icons/io";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

function HeaderSkeleton({peerData}) {
    return (
      <div className="h-[60px] border-b px-5 border-gray-300 flex justify-between items-center">
        <button className="flex gap-x-4 items-center w-full">
        <Skeleton height={50} width={50} circle/>
           <Skeleton width={100} />
        </button>
        <button>
        <IoIosInformationCircleOutline size={24}/>
        </button>
      </div>
    )
  }
  
  export default HeaderSkeleton;
  