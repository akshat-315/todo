import React from 'react';
import { useAuth } from '../context/AuthContext';
import icon from '../assets/icon.png';
import { Link, useNavigate } from 'react-router-dom';
import { CgProfile } from 'react-icons/cg';
import { BiLogOut } from 'react-icons/bi';

const Sidebar = ({ setTodos }) => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleSignout = async () => {
        try {
            const res = await fetch('/api/user/sign-out', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' }
            });

            if (res.ok) {
                logout();
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleFilter = async (status) => {
        try {
            const res = await fetch(
                `/api/todo/fetch-todo/${user.userId}?status=${status}`,
                {
                    method: 'GET'
                }
            );

            const data = await res.json();
            if (data.status === 'fail') {
                console.log(data.message);
            } else {
                setTodos(data.todos);
            }
        } catch (error) {
            console.log(error);
        }
    };

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

    return (
        <div className="container mx-auto flex flex-col justify-between min-h-screen">
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
                    <CgProfile className="text-lg  md:text-4xl" />
                    <h2 className="text-sm md:text-lg">{user.email}</h2>
                </div>
                <div>
                    <div></div>
                </div>
            </div>
            <button
                className="flex items-center  justify-center gap-4 -mt-96 border-none bg-gray-200 cursor-pointer hover:bg-gray-300 rounded-3xl mr-16"
                onClick={getAllTodos}
            >
                <div className="inline-block rounded-full border-2 h-4 w-4 bg-yellow-400 border-none"></div>
                <div>
                    <p className="text-sm md:text-lg">Show all tasks</p>
                </div>
            </button>
            <button
                className="flex items-center  justify-center gap-4 -mt-96 border-none bg-gray-200 cursor-pointer hover:bg-gray-300 rounded-3xl mr-8"
                onClick={() => handleFilter('active')}
            >
                <div className="inline-block rounded-full border-2 h-4 w-4 bg-green-400 border-none"></div>
                <div>
                    <p className="text-sm md:text-lg">Show active tasks HIiiii</p>
                </div>
            </button>
            <button
                className="flex  items-center justify-center gap-4 -mt-96 border-none bg-gray-200 cursor-pointer hover:bg-gray-300 rounded-3xl"
                onClick={() => handleFilter('completed')}
            >
                <div className="inline-block rounded-full border-2 h-4 w-4 bg-red-500 border-none"></div>
                <div>
                    <p className="text-sm md:text-lg">Show completed tasks</p>
                </div>
            </button>
            <div className="flex justify-end mr-6 mb-4">
                <button
                    className="bg-[#de483a] border-none text-white rounded-xl p-2 cursor-pointer"
                    onClick={handleSignout}
                    title="Sign Out?"
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
