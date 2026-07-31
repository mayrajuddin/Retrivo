import { FaFacebook, FaLinkedin } from "react-icons/fa6";
import { Link } from "react-router";


const Footer = () => {
    const navLinks= <>
        <Link to='/'>Home</Link>
        <Link to='/'>Contact</Link>
        <Link to='/about'>About</Link>
      </>
    return (
        <>
            <footer className="footer footer-horizontal footer-center bg-base-200 text-base-content rounded p-10">
  <nav className="grid grid-flow-col gap-4">
    {navLinks}
  </nav>
  <nav>
    <div className="grid grid-flow-col gap-4">
      <a className="link">
        <FaFacebook className="h-6 w-6"/>
      </a>
      <a className="link">
        <FaLinkedin className="h-6 w-6" />
      </a>
    </div>
  </nav>
  <aside>
    <p>Copyright © {new Date().getFullYear()} - All right reserved by ACME Industries Ltd</p>
  </aside>
</footer>
        </>
    );
};

export default Footer;