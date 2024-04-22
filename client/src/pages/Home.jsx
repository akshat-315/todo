// Home.jsx
import React from "react";
import { useAuth } from "../context/AuthContext";
import Sidebar from "../components/Sidebar";

const Home = () => {
  const { user } = useAuth();
  // console.log("My authority: ", user.email);

  return (
    <div className="min-h-screen bg-[#2D2E2D] flex">
      <Sidebar />
      <div>Home</div>
    </div>
  );
};

export default Home;
