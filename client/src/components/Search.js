import { CiSearch } from "react-icons/ci"
import { IoIosCloseCircleOutline } from "react-icons/io";
import classNames from "classnames";
import { useState } from "react";
function Search(props) {
  const [open, setOpen] = useState(false)
  return (
    <div {...props}>
        <span className={classNames({
          "flex justify-center pointer-events-none transition-all duration-600 items-center absolute top-0 left-0 w-9 h-9":true,
          "hidden": open
        })}>
           <CiSearch size="20" className="text-[#8e8e8e] "/>
        </span>
        <input onFocus={() => setOpen(true)} onBlur={() => setOpen(false)} type="text" className="h-9 pl-9 w-full transition-all duration-600 focus:pl-3 outline-none bg-[#efefef]  rounded-md" placeholder="Search..." />
        <button onClick={() => setOpen(false)} className={classNames({
          "justify-center transition-all duration-600 hidden items-center absolute top-0 right-0 w-9 h-9": true,
          "!flex": open
        })}>
           <IoIosCloseCircleOutline size="20" className="text-[#c7c7c7] "/>
        </button> 
    </div>
    )
}

export default Search;
