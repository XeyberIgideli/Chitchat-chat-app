import {useState, useRef} from 'react'
import { useField } from 'formik'
import classNames from 'classnames'

export function Input({label,...props}) {

    const [visibledPassword, visiblePassword] = useState(false)
    const inputRef = useRef()
    const [field, meta, helpers] = useField(props);

    function handleVisible () { 
        if(!visibledPassword) {
            visiblePassword(visiblePassword => !visiblePassword)
            inputRef.current.type = 'text'
            inputRef.current.focus()
            return
        }

        visiblePassword(false)
        inputRef.current.type = 'password'
    
    } 
    return (
            <label className="flex relative bg-zinc-50 border rounded-sm focus-within:border-gray-400">
              <input {...field}  {...props} ref={inputRef} className={classNames({
                "w-full h-[38px] bg-transparent px-2 outline-none text-xs": true,
                "pt-[10px]": field.value
              })}/>
              <small className={classNames({
                "absolute left-[9px] cursor-text pointer-events-none text-xs text-gray-400 -translate-y-1/2 transition-all":true,
                "top-1/2 text-xs": !field.value, 
                "text-[10px] top-2.5": field.value
              })}>{label}</small>
              {
              props?.type === 'password' && field?.value && 
              (<button type='button' onClick={handleVisible} className='translate-y-1/2 h-full flex items-center text-sm font-semibold pr-2'>{!visibledPassword ? "Show" : "Hide"}</button>)  
              } 
            </label>
    )
}