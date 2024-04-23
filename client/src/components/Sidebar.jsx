import React from "react";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaPlusCircle } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

const Sidebar = () => {
  const { user } = useAuth();
  console.log("User: ", user);
  return (
    <div className="min-h-screen bg-[#636363] z-50 w-1/4">
      <div>
        <ul>
            <li>
                
            </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
