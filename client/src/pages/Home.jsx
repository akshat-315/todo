// Home.jsx
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import Sidebar from "../components/Sidebar";
import Tasks from "../components/Tasks";

const Home = () => {
  const { user } = useAuth();
  console.log("My authority: ", user);
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const res = await fetch(`/api/todo/get-todos/${user.userId}`);
        if (!res.ok) {
          throw new Error("Failed to fetch todos");
        }
        const data = await res.json();
        setTodos(data.allTodos); // Assuming 'allTodos' contains the array of todos
      } catch (error) {
        console.error("There was an error loading todos:", error.message);
      }
    };

    fetchTodos(); // Call fetchTodos when the component mounts
  }, [user.userId]);

  console.log(todos);

  return (
    <div className="bg-[#2D2E2D] flex">
      <Sidebar />
      <Tasks todos={todos} />
    </div>
  );
};

export default Home;
