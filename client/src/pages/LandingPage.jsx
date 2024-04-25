import { Link } from "react-router-dom";
import image from "../assets/Image.png";
import gif from "../assets/gif.gif";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { FaTasks } from "react-icons/fa";

const LandingPage = () => {
  return (
    <>
      <Navbar />
      <div className="bg-[#2D2E2D] min-h-screen flex justify-center items-center">
        <div className="flex gap-20">
          <div className=" sm:text-base w-1/2 flex flex-col gap-10 text-gray-100 animate-pulse px-20 text-xl  ">
            <h2>
              All your tasks in one place <span>...</span>
            </h2>
            <h2>Organize your work and life, finally.</h2>
            <h2>
              Get started with the todo by clicking on the Sign In button.
            </h2>
            <h2>If you are new, get started by Registering your account!</h2>
            <Link className="no-underline " to={"/home"}>
              <div className="flex items-center justify-center gap-2 bg-[#de483a] w-1/4 rounded-2xl text-white p-3">
                <FaTasks className="" />
                <p className="">Start!</p>
              </div>
            </Link>
          </div>
          <div className="w-1/2">
            <div>
              <img src={gif} width={200} height={200} />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LandingPage;
