// Home.jsx
import React from "react";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const { user } = useAuth();
  // console.log("My authority: ", user);

  return (
    <div className="min-h-screen bg-[#2D2E2D]">
      <h2>Hiii</h2>
    </div>
  );
};

export default Home;
