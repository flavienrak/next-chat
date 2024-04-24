"use client";

import { UidContext } from "@/context/UidContext";
import { useContext } from "react";
import LoginContainer from "./login/LoginContainer";

export default function AuthContainer() {
  const { path } = useContext(UidContext);
  return (
    <div className="min-h-screen h-screen w-screen">
      {path === "/login" && <LoginContainer />}
    </div>
  );
}
