import Header from "components/Header"
import { Outlet } from "react-router-dom"
export function HomeLayout() {
    return (
        <>
            <Header/>
            <div className="container  lg:!max-w-[100%] mx-auto pt-0 lg:pt-4 ">
                <Outlet/>
            </div>
        </>
    )
}