import { useState, createElement } from "react"
import classNames from "classnames"

function Section({ children, activeTab }) {
  const [active, setActive] = useState(activeTab);
  return (
    <>
      <div className="border-t flex items-center justify-center gap-x-14">
        {children.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActive(index)} 
            className={classNames(
              {
                "text-[#8e8e8e] py-5 tracking-wide -mt-px  border-t text-center flex items-center gap-x-2 font-semibold": true,
                "!text-black border-t border-black": active === index
              }
            )}
          >
            {tab.props.icon}
            {tab.props.title}
          </button>
        ))}
      </div>
      <div>{children[active]}</div>
    </>
  );
}
Section.Tab = function ({ children }) {
  return (
    <div>
      {children}
    </div>
  );
};
export default Section;
