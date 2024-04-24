"use client";

import Link from "next/link";
import { format } from "date-fns";
import { useSelector } from "react-redux";

export default function ProfilContainer() {
  const { users } = useSelector((state) => state.users);
  return (
    <div className="w-full h-full flex justify-center items-center p-4 flex-col">
      <label htmlFor="" className="text-2xl font-bold">
        Profil
      </label>
      <div className="shadow-lg rounded-lg overflow-hidden w-full">
        <table className="w-full table-fixed">
          <thead>
            <tr className="bg-gray-100">
              <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">
                Name
              </th>
              <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">
                Email
              </th>
              <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">
                Date
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {users.map((user) => {
              return (
                <tr key={user._id}>
                  <td className="py-4 px-6 border-b border-gray-200">
                    {user.name}
                  </td>
                  <td className="py-4 px-6 border-b border-gray-200 truncate">
                    {user.email}
                  </td>
                  <td className="py-4 px-6 border-b border-gray-200">
                    {format(user.createdAt, "MM/dd/yyyy")}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <Link href={"/home"} className="text-xs text-blue-400 underline p-4">
        Home
      </Link>
    </div>
  );
}
