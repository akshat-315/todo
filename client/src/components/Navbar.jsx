import { Link, useLocation, useNavigate } from 'react-router-dom';
import icon from '../assets/icon.png';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const location = useLocation();
    const { user, logout } = useAuth();
    const isSignUpPage = location.pathname === '/sign-up';
    const isSignInPage = location.pathname === '/sign-in';
    const navigate = useNavigate();

    const handleSignOut = async () => {
        try {
            const res = await fetch('/api/user/sign-out', {
                method: 'POST'
            });

            if (res.ok) {
                logout();
                navigate('/sign-in');
            }
        } catch (error) {}
    };

    return (
        <div className="bg-[#2D2E2D]">
            <div className="flex justify-between py-6 px-8">
                <Link className="no-underline" to="/">
                    <div className="flex gap-2">
                        <img src={icon} width={26} height={26} alt="Icon" />
                        <h2 className="text-[#de483a] text-3xl">todo</h2>
                    </div>
                </Link>
                <div className="sm:gap-6 flex gap-8">
                    {user ? (
                        <Link to="/sign-up">
                            <button
                                className="bg-[#de483a] border-none text-white rounded-2xl py-1 sm:mr-10  mr-12 cursor-pointer"
                                onClick={handleSignOut}
                            >
                                <div className="px-4 py-1 text-base">
                                    Logout
                                </div>
                            </button>
                        </Link>
                    ) : (
                        <>
                            {!isSignInPage && (
                                <Link to="/sign-in">
                                    <button className="bg-transparent border-none text-white rounded-md py-1 cursor-pointer">
                                        <div className="px-4 py-1 text-lg text-gray-100">
                                            Sign In
                                        </div>
                                    </button>
                                </Link>
                            )}
                            {!isSignUpPage && (
                                <Link to="/sign-up">
                                    <button className="bg-[#de483a] border-none text-white rounded-2xl py-1 cursor-pointer">
                                        <div className="px-4 py-1 text-base">
                                            Get Started
                                        </div>
                                    </button>
                                </Link>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
