import React from "react";
import { useAuth } from "../context/AuthContext";
import icon from "../assets/icon.png";
import { Link, useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { BiLogOut } from "react-icons/bi";

const Sidebar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleSignout = async () => {
    try {
      const res = await fetch("/api/user/sign-out", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        logout();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col justify-between min-h-screen">
      <div>
        <div className="mt-20 p-10 flex justify-center items-center">
          <Link className="no-underline" to="/">
            <div className="flex gap-2">
              <img src={icon} width={46} height={46} alt="Icon" />
              <h2 className="text-[#de483a] text-6xl ">todo</h2>
            </div>
          </Link>
        </div>
        <div className="flex justify-center items-center gap-4 mt-10 text-gray-600">
          <CgProfile className="text-4xl" />
          <h2>{user.email}</h2>
        </div>
        <div>
          <div></div>
        </div>
      </div>
      <div className="ml-96 mb-8">
        <button
          className="bg-[#de483a] border-none text-white rounded-xl p-2 cursor-pointer"
          onClick={handleSignout}
        >
          <div className="px-4 py-1 text-l">
            <BiLogOut className="text-3xl" />
          </div>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
