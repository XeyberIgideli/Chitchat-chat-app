import classNames from "classnames";
import Message from "./Message";
import ScrollToBottom from 'react-scroll-to-bottom';
import { useSelector } from "react-redux";
import { memo } from "react"
export default memo(function Messages({ messages }) {
    const height = useSelector(state => state.inputHeight.height) 
 
    return (
        <ScrollToBottom className={classNames({
            "h-[calc(100%-144px)] px-4 py-4 pb-2 messages-field overflow-auto ": true,
            "!h-[calc(100%-180px)]": height > 80
        })}> 
        
            {/* <div className="mb-auto"></div>  */}
            { messages && messages?.map((message,index) => (
                <Message key={index} message={message}/>
            ))}
        </ScrollToBottom>
  );
})
