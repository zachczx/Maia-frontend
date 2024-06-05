import { TbMessageCircleQuestion } from "react-icons/tb";
import { BsDash } from "react-icons/bs";

function Header ({
    setChatWindowOpen
}) {
    return (
        <div className="w-full h-content p-2 flex flex-row justify-between mb-2">
          <div className="flex items-center flex-row gap-2">
            <TbMessageCircleQuestion size={25} color="white" />
             <div>
              <p className="text-sm font-semibold text-white">
                MINDEF
              </p>
              <p className="text-xs text-neutral-100 italic">
                You can ask me anything
              </p>
            </div>
          </div>
          <div className="rounded-full w-5 h-5 bg-accent/5" onClick={() => setChatWindowOpen(false)}>
            <BsDash size={20} color="white" />
          </div>
        </div>
    )
}

export default Header;