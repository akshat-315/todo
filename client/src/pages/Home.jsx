import React, { useState, useEffect } from 'react';
import { Button } from 'flowbite-react';
import { useAuth } from '../context/AuthContext';
import { CiEdit } from 'react-icons/ci';
import { IoMdDoneAll } from 'react-icons/io';
import { TbUrgent } from 'react-icons/tb';
import { ImCross } from 'react-icons/im';
import { MdOutlineDoneOutline } from 'react-icons/md';
import { MdDeleteOutline } from 'react-icons/md';
import Sidebar from '../components/Sidebar';

const Home = () => {
    const [formData, setFormData] = useState({});
    const [updateData, setUpdateData] = useState({});
    const [todos, setTodos] = useState([]);
    const [error, setError] = useState('');
    const [isEditingId, setIsEditingId] = useState(null);
    const [isImportant, setIsImportant] = useState(false);
    const [status, setStatus] = useState(true);
    const { user } = useAuth();

    //Sends an API request back to the server and fetches all the todos of the specific user.
    //useEffect Hook will trigger whenever the user is changed.
    useEffect(() => {
        const getAllTodos = async () => {
            try {
                const res = await fetch(`/api/todo/get-todos/${user.userId}`);
                const data = await res.json();
                if (data.status === 'success') {
                    setTodos(data.allTodos);
                }
            } catch (error) {
                console.log(error);
            }
        };
        getAllTodos();
    }, [user.userId]);

    //Updates the todo by sending an API request back to the server.
    const handleFormUpdate = async (todoId) => {
        // e.preventDefault();
        console.log(todoId);

        try {
            const res = await fetch(`/api/todo/update-todo/${todoId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ ...updateData })
            });

            const data = await res.json();
            console.log(data);
            if (data.success === 'false') {
                setError(data.message);
            }
            //If the request is successful, finds the index of the todo that matches the provided 'todoId', updates its data and then updates the todos state with the modified todo list
            else {
                const updatedTodoIndex = todos.findIndex(
                    (todo) => todo._id === todoId
                );
                const updatedTodo = {
                    ...todos[updatedTodoIndex],
                    ...updateData
                };
                const updatedTodos = [...todos];
                updatedTodos[updatedTodoIndex] = updatedTodo;
                setTodos(updatedTodos);
            }
        } catch (error) {
            console.log(error);
        }
    };

    //Create a new todo by sending an API request to the server
    const handleFormSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch(`/api/todo/create-todo`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ ...formData, userId: user.userId })
            });

            const data = await res.json();
            console.log(data);
            if (data.success === 'false') {
                setError(data.message);
            } else {
                //Updates the todos state by adding a new todo
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

    const handleEditChange = (e) => {
        setUpdateData({ ...updateData, [e.target.id]: e.target.value });
    };

    // console.log(formData);
    // console.log(updateData);
    // console.log(user.userId);
    // console.log(todos.content);

    const handleEditIcon = (todoId) => {
        console.log('This', todoId);
        if (isEditingId === todoId) {
            setIsEditingId(null);
        } else setIsEditingId(todoId);
    };

    //Updates the isImportant state of the todo. Making a seperate function wasn't required and could be integrated with the handleFormUpdate function above
    const handleToggleUrgent = async (todoId, isUrgent) => {
        try {
            const updatedData = { isImportant: !isUrgent };
            const res = await fetch(`/api/todo/update-important/${todoId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedData)
            });

            const data = await res.json();
            console.log(data);
            if (data.success === 'false') {
                setError(data.message);
            } else {
                const updatedTodoIndex = todos.findIndex(
                    (todo) => todo._id === todoId
                );
                const updatedTodo = {
                    ...todos[updatedTodoIndex],
                    important: !isUrgent
                };
                const updatedTodos = [...todos];
                updatedTodos[updatedTodoIndex] = updatedTodo;
                setTodos(updatedTodos);
            }
        } catch (error) {
            console.error('Error toggling urgent status:', error);
        }
    };

    //Updates the status state of the todo. Making a seperate function wasn't required and could be integrated with the handleFormUpdate function above
    const handleStatus = async (todoId, currentStatus) => {
        try {
            const newStatus =
                currentStatus === 'completed' ? 'active' : 'completed';
            const updatedData = { status: newStatus };
            const res = await fetch(`/api/todo/update-status/${todoId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedData)
            });

            const data = await res.json();
            console.log(data);
            if (data.success === 'false') {
                setError(data.message);
            } else {
                const updatedTodoIndex = todos.findIndex(
                    (todo) => todo._id === todoId
                );
                const updatedTodo = {
                    ...todos[updatedTodoIndex],
                    status: newStatus
                };
                const updatedTodos = [...todos];
                updatedTodos[updatedTodoIndex] = updatedTodo;
                setTodos(updatedTodos);
            }
        } catch (error) {
            console.error('Error toggling todo status:', error);
        }
    };

    //changes the state of the isImportant variable
    const handleImportant = () => {
        if (!isImportant) {
            setIsImportant(true);
        } else setIsImportant(false);
    };

    //Sends a delete request to the server and deletes a todo
    const handleDelete = async (todoId) => {
        try {
            const res = await fetch(`/api/todo/delete-todo/${todoId}`, {
                method: 'DELETE'
            });

            if (!res.ok) {
                setError('Could not delete the task');
            }

            const data = await res.json();
            if (data.success === 'false') {
                setError(data.message);
            } else {
                setTodos((prevTodos) =>
                    prevTodos.filter((todo) => todo._id !== todoId)
                );
            }
        } catch (error) {
            console.log(error);
        }
    };

    console.log(todos);

    return (
        <div className="flex min-h-screen bg-[#2D2E2D]">
            {/* Sidebar */}
            <div className="bg-gray-200 w-1/3 rounded-r-3xl">
                <Sidebar setTodos={setTodos} />
            </div>

            {/* Main Content */}
            <div className="bg-[#2D2E2D] w-full flex justify-center">
                <div className="w-2/3">
                    {/* Form */}
                    <form onSubmit={handleFormSubmit}>
                        <div className="bg-gray-200 rounded-xl h-32 flex flex-col gap-4 mt-20 p-5">
                            <div className="h-full w-full rounded-xl ">
                                <div className="flex flex-col h-full justify-center">
                                    <input
                                        placeholder="task"
                                        type="text"
                                        className="h-10 border-transparent rounded-xl placeholder-black text-base outline-none bg-gray-200"
                                        id="title"
                                        name="title"
                                        onChange={handleChange}
                                    />
                                    <input
                                        placeholder="content"
                                        type="text"
                                        className="h-1/2 border-transparent rounded-xl outline-none bg-gray-200"
                                        id="content"
                                        name="content"
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            {/* Add Task Button */}
                            <div className="border-t" />
                            <div className="flex justify-end bg-gray-200 rounded-xl">
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
                                <div
                                    className={`bg-gray-200 mt-6 rounded-lg p-3 flex flex-col gap-4 ${
                                        todo.status === 'completed'
                                            ? 'opacity-40 line-through'
                                            : ''
                                    }
                  ${todo.important ? 'bg-red-300' : ''}`}
                                >
                                    {isEditingId === todo._id ? (
                                        <>
                                            <div className="flex justify-between items-center -mt-2">
                                                <input
                                                    placeholder={todo.title}
                                                    type="text"
                                                    className="h-10 border-transparent rounded-xl placeholder-slate-900 text-base outline-none w-full bg-gray-200 "
                                                    id="title"
                                                    name="title"
                                                    onChange={handleEditChange}
                                                />
                                                <div className="flex items-center">
                                                    <ImCross
                                                        className="mr-2 text-sm cursor-pointer"
                                                        onClick={() =>
                                                            handleEditIcon(
                                                                todo._id
                                                            )
                                                        }
                                                        title="Go back"
                                                    />
                                                    <MdOutlineDoneOutline
                                                        onClick={() => {
                                                            handleFormUpdate(
                                                                todo._id
                                                            );
                                                            setIsEditingId(
                                                                null
                                                            );
                                                        }}
                                                        className="cursor-pointer text-lg"
                                                        title="Save changes"
                                                    />
                                                </div>
                                            </div>
                                            <input
                                                placeholder={todo.content}
                                                type="text"
                                                className="h-1/2 border-transparent rounded-xl outline-none w-full bg-gray-200"
                                                id="content"
                                                name="content"
                                                onChange={handleEditChange}
                                            />
                                        </>
                                    ) : (
                                        <>
                                            <div className="flex justify-between">
                                                <div>{todo.title}</div>
                                                <div className="flex gap-3">
                                                    <TbUrgent
                                                        onClick={() => {
                                                            handleImportant(),
                                                                handleToggleUrgent(
                                                                    todo._id,
                                                                    isImportant
                                                                );
                                                        }}
                                                        className={`${
                                                            todo.important
                                                                ? 'text-red-600'
                                                                : 'text-gray-900'
                                                        } cursor-pointer text-lg`}
                                                        title={
                                                            todo.important
                                                                ? 'Remove from urgent'
                                                                : 'Mark as urgent'
                                                        }
                                                    />
                                                    <CiEdit
                                                        className="text-lg cursor-pointer"
                                                        onClick={() =>
                                                            handleEditIcon(
                                                                todo._id
                                                            )
                                                        }
                                                        title="Edit your task"
                                                    />
                                                    <IoMdDoneAll
                                                        className="text-lg cursor-pointer"
                                                        onClick={() =>
                                                            handleStatus(
                                                                todo._id,
                                                                todo.status
                                                            )
                                                        }
                                                        title="Assign task as completed?"
                                                    />
                                                </div>
                                            </div>
                                            <div className="flex justify-between">
                                                <div className="opacity-60">
                                                    {todo.content}
                                                </div>
                                                <MdDeleteOutline
                                                    className="text-lg cursor-pointer"
                                                    onClick={() =>
                                                        handleDelete(todo._id)
                                                    }
                                                />
                                            </div>
                                        </>
                                    )}
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
