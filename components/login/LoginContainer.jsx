"use client";

import Link from "next/link";

import { loginController } from "@/lib/controllers/auth.controller";
import { useEffect, useState } from "react";

import { IoIosArrowRoundForward } from "react-icons/io";
import { useDispatch } from "react-redux";
import { fetchPersistInfos } from "@/redux/slices/persistSlice";
import { useRouter } from "next/navigation";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function LoginContainer() {
  const [isSubmit, setIsSubmit] = useState(false);
  const [name, setName] = useState({ value: "", error: "Nom requis" });
  const [email, setEmail] = useState({ value: "", error: "Email requis" });
  const dispatch = useDispatch();
  const { push } = useRouter();

  useEffect(() => {
    setIsSubmit(false);
    if (name.value.trim().length > 2) {
      setName((prev) => {
        let newState = { ...prev };
        newState.error = "";
        return newState;
      });
    } else {
      setName((prev) => {
        let newState = { ...prev };
        newState.error = "Nom requis";
        return newState;
      });
    }

    if (emailRegex.test(email.value.trim())) {
      setEmail((prev) => {
        let newState = { ...prev };
        newState.error = "";
        return newState;
      });
    } else {
      setEmail((prev) => {
        let newState = { ...prev };
        newState.error = "Email requis";
        return newState;
      });
    }
  }, [name.value, email.value]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmit(true);

    if (name.error === "" && email.error === "") {
      const res = await loginController({
        name: name.value,
        email: email.value,
      });

      if (res?.token) {
        dispatch(fetchPersistInfos({ token: res.token }));
        push("/home");
      }
    }
  };

  return (
    <div className="h-[100vh] w-full bg-no-repeat bg-left bg-cover">
      <div className="w-full h-full flex justify-center items-center flex-col">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col p-8 rounded-sm gap-6 w-max"
        >
          <div className="text-white text-4xl font-semibold bgText">
            Se connecter
          </div>
          <div className="flex flex-col w-full gap-6">
            <div className="w-full flex flex-col gap-2">
              <div className="w-full">
                <input
                  type="text"
                  id="nom"
                  required
                  placeholder="Votre nom"
                  className={`py-2 px-4 focus:outline outline-offset-1 outline-slate-300 transition-all duration-100 rounded-sm placeholder:text-slate-400 w-38 ${
                    isSubmit && name.error !== ""
                      ? "bg-red-400 text-white"
                      : "bg-slate-100"
                  }`}
                  onChange={(e) =>
                    setName((prev) => {
                      let newState = { ...prev };
                      newState.value = e.target.value;
                      return newState;
                    })
                  }
                />
              </div>
              <div className="w-full">
                <input
                  id="email"
                  type="text"
                  placeholder="Votre e-mail"
                  className={`py-2 px-4 focus:outline outline-offset-1 outline-slate-300 transition-all duration-100 rounded-sm placeholder:text-slate-400 w-38 ${
                    isSubmit && email.error !== ""
                      ? "bg-red-400 text-white"
                      : "bg-slate-100"
                  }`}
                  onChange={(e) =>
                    setEmail((prev) => {
                      let newState = { ...prev };
                      newState.value = e.target.value;
                      return newState;
                    })
                  }
                />
              </div>
            </div>
            <div className="w-full">
              <button
                type="submit"
                className="w-full buttonGradient uppercase text-white py-2 rounded-md"
              >
                Soumettre
              </button>
            </div>
            <div className="w-full">
              <Link href={"/auth/register"} className="flex justify-end">
                <label
                  htmlFor=""
                  className="text-white text-xs flex items-center"
                >
                  S{"'"}inscrire
                  <span>
                    <IoIosArrowRoundForward size={"1.15rem"} />
                  </span>
                </label>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
