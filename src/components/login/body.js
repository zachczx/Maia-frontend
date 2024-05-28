import React, {useState} from "react";
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";

function Body () {
  const [hidePassword, setHidePassword] = useState();
  const [password, setPassword] = useState("");

  const togglePasswordVisibility = () => {
    setHidePassword(!hidePassword);
  }

  return (
    <div className="flex flex-col mt-10 gap-y-3">
      <input 
        type="text" 
        placeholder="Username" 
        className="focus:outline-0 text-sm border border-1 border-gray-200 w-full p-2 rounded-lg" 
      />
      <div className="flex flex-row justify-between w-full p-2 border border-1 border-gray-200 rounded-lg">
        <input 
          type={hidePassword ? "password" : "text"}
          placeholder="Password" 
          className="focus:outline-0 text-sm w-full p-2 rounded-lg" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={togglePasswordVisibility}>
          {hidePassword 
            ? <IoEyeOffOutline /> 
            : <IoEyeOutline />
          }
        </button>
      </div>
      <button className="focus:outline-0 text-sm bg-accent text-white p-2 rounded-lg mt-3">Log In</button>
    </div>
  )
}

export default Body;