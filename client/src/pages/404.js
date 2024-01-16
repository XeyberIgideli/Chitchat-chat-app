import { Link } from "react-router-dom"
export function  Page404() {
    return (
        <div className="flex  flex-col items-center pt-4 justify-center gap-y-6">
            <h2 className="text-[22px] font-semibold">Sorry, this page isn't available.</h2>
            <p>The link you followed may be broken, or the page may have been removed.
               <Link to='/' className="text-blue-900"> Go back to Chitchat.</Link>
            </p>
        </div>
    )
}