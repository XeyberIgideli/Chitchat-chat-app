import { getUsers } from "config/_firebase"
import { useEffect, useState } from "react"
import { NavLink } from "react-router-dom"
export default function Home() {
    const [users,showUsers] = useState('')

    useEffect(() => {
        getUsers().then(user => showUsers(user))
    },[])
    return (
        <div className="flex gap-x-4 px-4 py-5 lg:px-0"> 
            {Array.from(users).map((user,index) => (
                 <NavLink key={index} to={user.username}>{user.username}</NavLink>
            ))} 
        </div>
    )
}