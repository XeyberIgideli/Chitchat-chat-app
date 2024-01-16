import { Link, NavLink,useParams,useLocation, useNavigate } from "react-router-dom"
import Search from './Search'
import { logout } from "../config/_firebase"
import { GrHomeRounded } from "react-icons/gr";
import { FaRegUser } from "react-icons/fa";
import { RiMessengerLine } from "react-icons/ri";
import { BiMessageSquareAdd, BiSearch } from "react-icons/bi";
import { MdOutlineExplore } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";
import { FaAngleLeft } from "react-icons/fa6"; 
import { useSelector } from "react-redux";
export default function Header() {
  const {username} = useParams() 
  const location = useLocation()
  const navigate = useNavigate();
  const user = useSelector(state => state.auth.user) 
    return (
        <header>
          {/* Mobile header */}
         
         { username ? 
         ( <div className="sm:hidden py-2   sm:justify-normal border-b relative border-gray-300 sm:py-0 px-3 sm:px-0 flex items-center">
          <button onClick={() => navigate(-1)} className="">
                      <FaAngleLeft className="text-[26px] sm:text-[21px] "/>
          </button>
          <div className="w-full">
          <p className="text-center font-semibold">{username}</p>
          </div>
         </div> )
         : (<div className="py-2 border-b overflow-x-hidden relative border-gray-300 sm:py-0 px-3 sm:px-0 flex gap-x-2 items-center justify-between sm:justify-normal">
           <Link><img className="h-[37px]  absolute top-[20%] left-5 sm:static  mx-auto sm:hidden sm:mx-0" src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1024px-Instagram_logo.svg.png"/></Link>
           <div className="flex gap-x-4 items-center">
           <Search className="w-[270px] sm:hidden relative group md:w-[268px]" />
           <NavLink to="/favorites" className={({isActive}) => isActive ? "border-b py-2 border-black sm:hidden": "sm:hidden border-none"}>
                      <FaRegHeart  className="text-[22px] sm:text-[23px]"/>
            </NavLink>
           </div>
          </div>)}

          <div className="sm:static fixed w-full bottom-0 bg-white border-t sm:border-b  border-gray-300 ">
            <div className="flex items-center sm:justify-between h-[50px] sm:h-[60px] container mx-auto w-full px-4 lg:px-0 ">
                 <Link><img className="h-[34px] mx-auto hidden  sm:mx-0 sm:flex" src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1024px-Instagram_logo.svg.png"/></Link>
                 
                <Search className="sm:w-[220px] hidden sm:flex relative group md:w-[268px]" />

                 <nav className="flex items-center sm:gap-x-6 justify-around flex-1   sm:justify-normal sm:flex-none ">
                    <NavLink to="/" className={({isActive}) => isActive ? "border-b py-2 border-black": "border-none" }>
                      <GrHomeRounded className="text-[26px] sm:text-[21px]"/>
                    </NavLink>
                    <NavLink to="/inbox" className={({isActive}) => isActive ? "border-b py-2 border-black": "border-none"}>
                      <RiMessengerLine className="text-[30px] sm:text-[25px]"/>
                    </NavLink>
                    <NavLink to="/add" className={({isActive}) => isActive ? "border-b py-2 border-black": "border-none"}>
                      <BiMessageSquareAdd className="text-[30px] sm:text-[25px]"/>
                    </NavLink>
                    <NavLink to="/explore" className={({isActive}) => isActive ? "border-b py-2 border-black hidden sm:flex": "border-none"}>
                      <MdOutlineExplore className="text-[30px] sm:text-[25px]"/>
                    </NavLink> 
                    { <NavLink to="/favorites" className={({isActive}) => isActive ? "hidden sm:block border-b py-2 border-black": "hidden sm:block border-none"}>
                      <FaRegHeart  className="text-[27px] sm:text-[23px]"/>
                    </NavLink> }

                    <NavLink to={user.username} className={({isActive}) => isActive ? "border-b py-2 border-black": "border-none"}>
                      <FaRegUser   className="text-[27px] sm:text-[23px]"/>
                    </NavLink>
                 </nav>
            </div>
        </div>
        </header>
    )
}