"use client";

import { UidContext } from "@/context/UidContext";
import { useContext, useEffect } from "react";
import { getUsersController } from "@/lib/controllers/user.controller";

import HomeContainer from "./home/HomeContainer";
import ProfilContainer from "./profil/ProfilContainer";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { fetchUsersInfos } from "@/redux/slices/usersSlice";

export default function RootContainer() {
  const { path } = useContext(UidContext);
  const { push } = useRouter();

  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const res = await getUsersController();
      if (res?.users) {
        dispatch(fetchUsersInfos({ users: res.users }));
      } else {
        push("/login");
      }
    })();
  }, []);

  // connexion => validation => true => store: token
  // deconnexion => suppr: token
  // rechargement => revalid: token

  return (
    <div className="min-h-screen h-screen w-screen">
      {path === "/home" && <HomeContainer />}
      {path === "/profil" && <ProfilContainer />}
    </div>
  );
}
