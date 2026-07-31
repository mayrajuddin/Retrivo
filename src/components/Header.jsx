import { Search } from "lucide-react";
import { Link } from "react-router";

const Header = () => {
  const navLinks= <>
    <Link to='/' className="md:text-lg">Home</Link>
    <Link to='/' className="md:text-lg">Contact</Link>
    <Link to='/about' className="md:text-lg">About</Link>
  </>
  return (
    <>
      <div className="max-lg:collapse bg-base-200 lg:mb-48 shadow-sm w-full rounded-md">
        <input id="navbar-1-toggle" className="peer hidden" type="checkbox" />
        <label
          htmlFor="navbar-1-toggle"
          className="fixed inset-0 hidden max-lg:peer-checked:block"
        ></label>
        <div className="collapse-title navbar">
          <div className="navbar-start">
            <a className="btn text-xl capitalize">retrivo</a>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1 gap-4">
              {navLinks}
            </ul>
          </div>
          <div className="navbar-end">
            <input
              type="text"
              placeholder="Search"
              className="hidden input w-64 lg:w-auto"
            />
            <button className="btn btn-ghost btn-circle">
              <Search className="h-6 w-6" />
            </button>
          </div>
        </div>

        <div className="collapse-content lg:hidden z-1">
          <ul className="menu">
            {navLinks}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Header;
