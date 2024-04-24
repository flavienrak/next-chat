"use client";

import { verifyJWTController } from "@/lib/controllers/jwt.controller";
import { usePathname, useRouter } from "next/navigation";
import { createContext, useEffect } from "react";
import { useSelector } from "react-redux";

export const UidContext = createContext();

export default function UidContextProvider({ children }) {
  const path = usePathname();
  const { push } = useRouter();
  const { token } = useSelector((state) => state.persistInfos);

  useEffect(() => {
    if (token) {
      (async () => {
        const res = await verifyJWTController(token);

        if (res?.verify) {
          if (path === "/login" || path === "/register") {
            push("/home");
          }
        } else {
          if (path === "/home" || path === "/profil") {
            push("/login");
          }
        }
      })();
    } else {
      if (path === "/home" || path === "/profil") {
        push("/login");
      }
    }
  }, []);
  return <UidContext.Provider value={{ path }}>{children}</UidContext.Provider>;
}
