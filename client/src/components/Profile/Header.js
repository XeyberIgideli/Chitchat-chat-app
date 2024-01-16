import setChat, { sendMessage } from "config/_firebase";
import { Button } from "components/Button";
import InboxLayout from "pages/inbox";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import {v4 as uuidv4} from 'uuid';

function Header({user}) {
  const currentUser = useSelector(state => state.auth.user) 
  const combinedID = currentUser.uid > user.userID ? currentUser.uid + user.userID : user.userID + currentUser.uid
  async function messageHandle() {
    await setChat(combinedID, currentUser.uid, user.userID)
  }
  return (
    <section className="flex flex-col gap-y-4 sm:gap-y-0 sm:pb-6">
      <div className="flex items-center gap-x-8 px-4 sm:px-0 w-full">
        <img className="h-[80px] w-[80px] flex-shrink-0 self-start sm:self-center sm:h-[150px] sm:w-[150px] rounded-full" src={user.profilePhoto } alt="" />
      <nav className="flex flex-col gap-y-4 ">
        <div className="flex flex-col gap-y-2 sm:gap-y-0 sm:flex-row self-start sm:self-auto gap-x-6">
          <h1 className="text-[28px] self-start sm:self-auto font-light">{user.username}</h1>
          <div className="flex gap-x-3 items-center">
            <Button>Follow</Button>
            <NavLink onClick={messageHandle} to={"../inbox/" + combinedID} className="font-semibold bg-gray-300 py-1 px-3 rounded-lg">Message</NavLink>
          </div>
        </div>
        <div>
          <p>#Baku When secretshadowart posts, you'll see their photos and videos here.</p>
        </div>
        
      </nav>
      
      </div>
      <div className="flex items-center py-1 sm:py-0 px-4 sm:px-0 gap-x-10 w-full justify-between sm:justify-center border-t border-gray-300 sm:border-none">
          <p className="flex flex-col items-center sm:flex-row sm:gap-x-2"><span className="font-bold">0</span> posts</p>
          <p className="flex flex-col items-center sm:flex-row sm:gap-x-2"><span className="font-bold">{user.followers.length}</span> followers</p>
          <p className="flex flex-col items-center sm:flex-row sm:gap-x-2"><span className="font-bold">{user.following.length}</span> following</p>
        </div>
    </section>
  )
}

export default Header;
