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
        if (data.status === "success") {
          setTodos(data.allTodos);
        }
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

      const data = await res.json();
      console.log(data)
      if (data.success === "false") {
        setError(data.message);
      } else {
        const newTodo = data.savedTodo;
        setTodos([...todos, newTodo]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  console.log(formData);
  // console.log(user.userId);
  // console.log(todos.content);

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
                    type="text"
                    className="h-10 border-transparent rounded-xl placeholder-slate-900 text-base outline-none"
                    id="title"
                    name="title"
                    onChange={handleChange}
                  />
                  <input
                    placeholder="content"
                    type="text"
                    className="h-1/2 border-transparent rounded-xl outline-none"
                    id="content"
                    name="content"
                    onChange={handleChange}
                  />
                </div>
              </div>
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

          <div className="mt-20">
            {todos.map((todo) => (
              <div key={todo._id}>
                <div className="bg-white mt-6 rounded-lg p-3 flex flex-col gap-2">
                  <div className="flex justify-between">
                    <div>{todo.title}</div>
                    <div>{/* Render icons here */}</div>
                  </div>
                  <div className="opacity-60">{todo.content}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
