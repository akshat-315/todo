import { Link } from "react-router-dom";
import icon from "../assets/icon.png";
import insta from "../assets/insta.png";
import twitter from "../assets/twitter.png";
import linkedin from "../assets/linkedIn.png";

const Footer = () => {
  return (
    <div className="bg-[#c8c8c8] px-6 py-16">
      <div className="flex sm:flex-col justify-center items-center gap-12">
        <div className="flex gap-2 w-1/4 px-40 justify-center">
          <img src={icon} width={28} height={30} />
          <h2 className="text-4xl text-gray-800">todo</h2>
        </div>
        <div className="flex flex-col gap-6 justify-center items-center md:flex-row md:gap-20">
          <div className="flex flex-col gap-2">
            <h2>Features</h2>
            <Link className="no-underline ">
              <button className=" bg-[#c8c8c8] hover:bg-[#9e9e9e] text-gray-600 border-none">
                How it works <span> </span>
              </button>
            </Link>
            <Link className="no-underline ">
              <button className=" bg-[#c8c8c8] hover:bg-[#9e9e9e] text-gray-600 border-none">
                Pricing
              </button>
            </Link>
            <Link className="no-underline ">
              <button className=" bg-[#c8c8c8] hover:bg-[#9e9e9e] text-gray-600 border-none">
                Templates
              </button>
            </Link>
          </div>
          <div className="flex flex-col gap-2">
            <h2>Resources</h2>
            <Link className="no-underline ">
              <button className=" bg-[#c8c8c8] hover:bg-[#9e9e9e] text-gray-600 border-none">
                How it works <span> </span>
              </button>
            </Link>
            <Link className="no-underline ">
              <button className=" bg-[#c8c8c8] hover:bg-[#9e9e9e] text-gray-600 border-none">
                Pricing
              </button>
            </Link>
            <Link className="no-underline ">
              <button className=" bg-[#c8c8c8] hover:bg-[#9e9e9e] text-gray-600 border-none">
                Templates
              </button>
            </Link>
          </div>
          <div className="flex flex-col gap-2">
            <h2>Company</h2>
            <Link className="no-underline ">
              <button className=" bg-[#c8c8c8] hover:bg-[#9e9e9e] text-gray-600 border-none">
                How it works <span> </span>
              </button>
            </Link>
            <Link className="no-underline ">
              <button className=" bg-[#c8c8c8] hover:bg-[#9e9e9e] text-gray-600 border-none">
                Pricing
              </button>
            </Link>
            <Link className="no-underline ">
              <button className=" bg-[#c8c8c8] hover:bg-[#9e9e9e] text-gray-600 border-none">
                Templates
              </button>
            </Link>
          </div>
          <div className="sm:flex  gap-12 md:flex-col  md:gap-6">
            <div>
              <img src={insta} alt="Instagram GIF" width={20} />
            </div>
            <div>
              <img src={twitter} alt="Instagram GIF" width={20} />
            </div>
            <div>
              <img src={linkedin} alt="Instagram GIF" width={20} />
            </div>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
