export function Button ({type = "button",children, ...props}) {
    return ( 
        <button 
        type={type}  
        {...props}
        className="h-[30px] flex items-center px-2.5 justify-center gap-x-2 text-white text-sm bg-primary rounded font-medium disabled:opacity-50">{children}</button>
    )
}