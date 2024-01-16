import { PrivateRoute } from "./components/PrivateRoute"
import Home from "./pages/Home"
import { HomeLayout } from "pages/HomeLayout"
import Profile from 'pages/Profile'
import Login from "./pages/auth/Login"
import AuthLayout from "./pages/auth/index"
import Register from './pages/auth/Register'
import { Page404 } from "pages/404"
import InboxLayout from "pages/inbox"
import Inbox from "pages/inbox/Inbox"
import Chat from "pages/inbox/Chat"
const routes = [
    {
        path: '/',
        element: <HomeLayout/>,
        auth:true,
        children: [
            {
                index: true,
                element: <Home/>
            },
            {
                path: ':username',
                element: <Profile/>
            },
            {
                path: '/inbox',
                element: <InboxLayout/>,
                children: [
                    {
                        index: true,
                        element: <Inbox/>
                    },
                    {
                        path: ':chatId',
                        element: <Chat/>
                    }
                ]
            }
        ]
    },
    {
        path: '/auth',
        element: <AuthLayout/>,
        children: [
            {
                path: 'login',
                element: <Login/>
            },
            {
                path: 'register',
                element: <Register/>
            }
        ]
    },
    {
        path:'*',
        element: <Page404/>
    }    
]

const authCheck = (routes) =>
    routes.map(route => {
        if(route?.auth) {
            route.element = <PrivateRoute>{route.element}</PrivateRoute>
        }
      
        if(route?.children) {
            route.children = authCheck(route.children)
        }

        return route
})
 

export default authCheck(routes)