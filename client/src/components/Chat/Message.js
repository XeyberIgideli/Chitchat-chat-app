import classNames from "classnames";
import { useSelector } from "react-redux";
import { useState } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { memo } from "react";

export default memo(function Message({ message }) {
  const user = useSelector((state) => state.auth.user);
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div 
    className="flex w-full relative"
    onMouseEnter={() => setShowTooltip(true)}
    onMouseLeave={() => setShowTooltip(false)}
    >

      {/* <div className="absolute left-[40%]">test123</div> */}

      <div
        className={classNames({
          "flex gap-x-2 items-center max-w-[50%]  ": true,
          "ml-auto": message.sentBy === user.uid,
        })}
      
      >

        {message.sentBy !== user.uid && (
          <img
            className="h-6 w-6 rounded-full mb-1"
            src={message.recipient.profilePhoto}
            alt=""
          />
        )}

        <div
          className={classNames({
            "relative flex items-center justify-between ": true,
            "flex-row-reverse ": user.uid !== message.sentBy,
          })}
        >
          <p
            className={classNames({
              "min-h-[44px] relative rounded-3xl text-left text-sm p-3 px-4 ": true,
              "border border-gray-200 flex-row-reverse":
                user.uid !== message.sentBy,
              "bg-[#dd3636]": user.uid === message.sentBy,
            })}
          >
            {message.message}
          </p>

          {/* Tooltip */}
          
          {showTooltip && (
            <div
            className={classNames({
              "absolute top-1/2 -translate-y-1/2": true,
              "-left-10": user.uid == message.sentBy,
              "-right-10": user.uid !== message.sentBy,
            })}
          >
            <button>...</button> 
          </div>
          )}

        </div>
      </div>


    </div>
  );
});
