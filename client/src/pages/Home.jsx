import React, { useState, useEffect } from "react";
import { Button } from "flowbite-react";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const [formData, setFormData] = useState({});
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState("");
  const { user } = useAuth();

  useEffect(() => {
    const getAllTodos = async () => {
      try {
        const res = await fetch(`/api/todo/get-todos/${user.userId}`);
        const data = await res.json();
        setTodos(data);
      } catch (error) {
        console.log(error);
      }
    };
    getAllTodos();
  }, [user.userId]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`/api/todo/create-todo`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, userId: user.userId }),
      });
      if (!res.ok) {
        throw new Error("Failed to create todo");
      }

      const newTodo = await res.json();
      setTodos([...todos, newTodo]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  console.log(formData);
  // console.log(user.userId);
  console.log(user.userId);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="bg-[#606260] w-1/3">
        <h1>Sidebar</h1>
      </div>

      {/* Main Content */}
      <div className="bg-[#2D2E2D] w-full flex justify-center">
        <div className="w-2/3">
          {/* Form */}
          <form onSubmit={handleFormSubmit}>
            <div className="bg-white rounded-xl h-32 flex flex-col gap-4 mt-20">
              <div className="h-full w-full bg-white rounded-xl">
                <div className="flex flex-col h-full justify-center">
                  <input
                    placeholder="task"
                    className="h-10 border-transparent rounded-xl placeholder-slate-900 text-base outline-none"
                    id="title"
                    name="title"
                    onChange={handleChange}
                  />
                  <input
                    placeholder="content"
                    className="h-1/2 border-transparent rounded-xl outline-none"
                    id="content"
                    name="content"
                    value={formData.content}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Error message */}
              {error && (
                <div className="text-red-500 text-sm text-center">{error}</div>
              )}

              {/* Add Task Button */}
              <div className="border-t" />
              <div className="flex justify-end bg-white rounded-xl">
                <div>
                  <Button
                    className="bg-[#de483a] border-none text-white rounded-lg py-1 px-1 mr-4 mb-1 cursor-pointer outline-none"
                    type="submit"
                  >
                    <div className="text-sm">Add Task</div>
                  </Button>
                </div>
              </div>
            </div>
          </form>

          {/* Display Todos */}
          <div className="bg-white mt-20 rounded-lg p-3 flex flex-col gap-2">
            {/* Display todos here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
