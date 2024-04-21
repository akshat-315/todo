import { Button } from "flowbite-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="bg-[#333333] p-4">
      <div className="flex justify-between">
        <div>
          <h2 className="text-[#f73e16]">todo</h2>
        </div>
        <div className="flex gap-8">
          <Link className="cursor-pointer no-underline text-white mt-2">
            Login
          </Link>
          <Link className="hover:cursor-pointer no-underline">
            <Button className="bg-[#f73e16]">Get started</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
