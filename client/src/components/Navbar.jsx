import { Link } from "react-router-dom";
import icon from "../assets/icon.png";

const Navbar = () => {
  return (
    <div className="bg-[#2D2E2D]">
      <div className="flex justify-between py-6 px-8">
        <div className="flex gap-2">
          <img src={icon} width={26} height={26} />
          <h2 className="text-[#de483a] text-3xl">todo</h2>
        </div>
        <div className="sm:gap-6 flex gap-8">
          <Link to="sign-in">
            <button className="bg-transparent border-none text-white rounded-md py-1 cursor-pointer">
              <div className="px-4 py-1 text-lg text-gray-100">Sign In</div>
            </button>
          </Link>
          <Link to="/sign-up">
            <button className="bg-[#de483a] border-none text-white rounded-2xl py-1 cursor-pointer">
              <div className="px-4 py-1 text-base">Get Started</div>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
