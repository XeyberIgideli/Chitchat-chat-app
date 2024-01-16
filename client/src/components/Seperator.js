export function Seperator ({label = "OR"}) {
    return ( 
    <div className="flex items-center py-2">
        <div className="h-px bg-gray-300 flex-1"></div>
        <span className="px-4 text-[13px] font-semibold text-gray-500">{label}</span>
        <div className="h-px bg-gray-300 flex-1"></div>
      </div>
    )
}