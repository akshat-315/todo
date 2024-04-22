import React from "react";
import { FaRegCircleUser } from "react-icons/fa6";
import { useAuth } from "../context/AuthContext";

const Sidebar = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-[#636363] z-50 w-1/3">
      <div>
        <div>
          <div>
            <FaRegCircleUser />
          </div>
          <p></p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
