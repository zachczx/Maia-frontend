import React from "react";
import Header from "@/components/login/header";
import Body from "@/components/login/body";

function Login () {
  return (
    <div className="flex h-screen justify-center items-center">
      <div className="w-[80%] sm:w-[50%] md:w-[40%] lg:w-[30%]">
        <Header />
        <Body />
      </div>
    </div>
  )
}

export default Login;
