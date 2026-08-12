// import { Menu, Search } from "lucide-react";
import { Link } from "react-router";
import logo from "../assets/retrivo_logo.png";
import { RiMenu2Fill } from "react-icons/ri";

const Header = () => {
  const navLinks = (
    <>
      <Link to="/" className="md:text-lg lg:hover:text-[#146B46]">
        Home
      </Link>
      <Link to="/" className="md:text-lg lg:hover:text-[#146B46]">
        Browse items
      </Link>
      <Link to="/" className="md:text-lg lg:hover:text-[#146B46]">
        Report item
      </Link>
      <Link to="/" className="md:text-lg lg:hover:text-[#146B46]">
        How it works
      </Link>
      <Link to="/about" className="md:text-lg lg:hover:text-[#146B46]">
        About
      </Link>
      {/* Retrivo | Home | Browse Items | Report Item | My Reports | My Claims | Profile| show after login */}
    </>
  );
  return (
    <>
      <div className="navbar bg-[#F4F5F7] shadow-sm">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">             
              <RiMenu2Fill className="h-5 w-5"/>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 font-bold capitalize text-gray-800  rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {navLinks}
            </ul>
          </div>
          <Link to={'/'} className="hidden lg:block " >
            <img src={logo} alt="logo" className="w-30 " />
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 font-bold capitalize text-gray-600  gap-4">
            {navLinks}
          </ul>
        </div>
        <div className="navbar-end">
          {/* <a className="btn">Button</a> */}
          <Link to={'/'} className="lg:hidden cursor-pointer">
            <img src={logo} alt="logo" className="w-28 " />
          </Link>
          {/* <button className="btn btn-ghost btn-circle">
            <Search className="h-6 w-6" />
          </button> */}
          <Link to={'/register'} className="uppercase text-[#F4F5F7] bg-[#0F6A43] px-3 py-2 rounded font-medium">
            signup
          </Link>
        </div>
      </div>
    </>
  );
};

export default Header;
