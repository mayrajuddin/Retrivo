import { Link } from "react-router";

const Footer = () => {
  const qLinks = (
    <>
    <li>
                <Link to={'/'} className="hover:text-[#0f6a43] transition">
                  Home
                </Link>
              </li>

              <li>
                <Link to={'/'} className="hover:text-[#0f6a43] transition">
                  Browse Items
                </Link>
              </li>

              <li>
                <Link to={'/'} className="hover:text-[#0f6a43] transition">
                  Report Item
                </Link>
              </li>

              <li>
                <Link to={'/'} className="hover:text-[#0f6a43] transition">
                  How It Works
                </Link>
              </li>

              <li>
                <Link to={'/about'} className="hover:text-[#0f6a43] transition">
                  About
                </Link>
              </li>
    
    </>
  )

  return (
    <footer className="bg-[#f0ece8] text-[#0b2d5b]">

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-14">

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="lg:col-span-2">

            <h2 className="text-3xl font-bold">
              <span className="text-[#0b2d5b]">Retr</span>
              <span className="text-[#0f6a43]">ivo</span>
            </h2>

            <p className="mt-4 text-gray-600 max-w-md leading-7">
              A trusted campus lost and found platform designed to help
              students, faculty, and staff reconnect with their lost
              belongings.
            </p>

            <div className="flex gap-3 mt-6">

              <Link
                href="#"
                className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:bg-[#0b2d5b] hover:text-white transition"
              >
                f
              </Link>

              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:bg-[#0b2d5b] hover:text-white transition"
              >
                in
              </a>

              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:bg-[#0b2d5b] hover:text-white transition"
              >
                @
              </a>

            </div>

          </div>


          {/* Quick Links */}
          <div>

            <h3 className="font-semibold text-lg mb-5">
              Quick Links
            </h3>

            <ul className="space-y-3 text-gray-600">

              {qLinks}

            </ul>

          </div>


          {/* Support */}
          <div>

            <h3 className="font-semibold text-lg mb-5">
              Support
            </h3>

            <ul className="space-y-3 text-gray-600">

              <li>
                <a href="#" className="hover:text-[#0f6a43] transition">
                  Contact Us
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-[#0f6a43] transition">
                  FAQ
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-[#0f6a43] transition">
                  Privacy Policy
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-[#0f6a43] transition">
                  Terms & Conditions
                </a>
              </li>

            </ul>

          </div>

        </div>

      </div>


      {/* Bottom Footer */}
      <div className="border-t border-gray-300">

        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-5">

          <div className="flex flex-col md:flex-row justify-between items-center gap-3">

            <p className="text-sm text-gray-600">
              © 2026 Retrivo. All rights reserved.
            </p>

            <p className="text-sm text-gray-500">
              Built for the campus community
            </p>

          </div>

        </div>

      </div>

    </footer>
  );
};

export default Footer;