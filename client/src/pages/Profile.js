import { useParams, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { getUserProfile } from "config/_firebase"
import { Page404 } from "./404"
import Header from '../components/Profile/Header'
import { MdGridOn } from "react-icons/md"
import { FaHashtag } from "react-icons/fa6"
import Section from '../components/Profile/Section'
import Posts from '../components/Profile/Posts'
import Tagged from '../components/Profile/Tagged'
import {Helmet} from "react-helmet"
export default function Home() {

    const [user, setUser] = useState(null) 
    const {username} = useParams()
    const navigate = useNavigate() 

    useEffect(() => {
        (async () => {
            try {
                const response = await getUserProfile(username)
                setUser(response) 
            } catch(err) {
                setUser(false)
            }
        })() 
    }, [])

    if(user === false) {
        return <Page404/>
    }
    return user && (
        <div className="sm:px-4 py-4 sm:py-0">
            <Helmet>
                <title>{user.fullName} ~ (@{user.username}) ~ Chitchat</title>
            </Helmet>
            <Header user={user}/>
            <Section activeTab={0}>
                <Section.Tab title="POSTS" icon={<MdGridOn size={16}/>}><Posts/></Section.Tab>
                <Section.Tab title="TAGGED" icon={<FaHashtag size={16}/>}><Tagged/></Section.Tab>
            </Section>
        </div>
    )
}