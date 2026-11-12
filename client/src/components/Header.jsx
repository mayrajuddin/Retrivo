
import { Link } from "react-router";
import logo from "../assets/retrivo_logo.png";
import { RiMenu2Fill } from "react-icons/ri";
import { useAuth } from "../contexts/AuthContext";

const Header = () => {
  const { user, loading } = useAuth();

  const profilePath =
    user?.role === "admin"
      ? "/dashboard/admin/profile"
      : "/dashboard/profile";

  const userInitial = user?.name?.charAt(0)?.toUpperCase() || "U";

  const navLinks = (
    <>
      <Link to="/" className="md:text-lg lg:hover:text-[#146B46]">
        Home
      </Link>

      <Link
        to="/browse-items"
        className="md:text-lg lg:hover:text-[#146B46]"
      >
        Browse items
      </Link>

      {user && (
        <Link
          to="/dashboard/report-item"
          className="md:text-lg lg:hover:text-[#146B46]"
        >
          Report item
        </Link>
      )}

      <Link to="/about" className="md:text-lg lg:hover:text-[#146B46]">
        About
      </Link>
    </>
  );

  return (
    <>
      <header className="navbar bg-[#F4F5F7] shadow-sm">
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost lg:hidden"
            >
              <RiMenu2Fill className="h-5 w-5" />
            </div>

            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 font-bold capitalize text-gray-800 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {navLinks}
            </ul>
          </div>

          <Link to="/" className="hidden lg:block">
            <img src={logo} alt="Retrivo logo" className="w-30" />
          </Link>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 font-bold capitalize text-gray-600 gap-4">
            {navLinks}
          </ul>
        </div>

        <div className="navbar-end">
          <Link to="/" className="lg:hidden cursor-pointer">
            <img src={logo} alt="Retrivo logo" className="w-28" />
          </Link>

          {!loading && (
            <>
              {!user ? (
                <Link
                  to="/register"
                  className="uppercase text-[#F4F5F7] bg-[#0F6A43] px-3 py-2 rounded font-medium"
                >
                  Signup
                </Link>
              ) : (
                <Link
                  to={profilePath}
                  title="Go to profile"
                  aria-label="Go to dashboard profile"
                  className="ml-2"
                >
                  <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#0F6A43] flex items-center justify-center bg-[#0F6A43] text-white font-bold text-lg hover:opacity-80 transition">
                    {user.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt={user.name || "User"}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      userInitial
                    )}
                  </div>
                </Link>
              )}
            </>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
