import { Backpack, Check, IdCard, MoveRight, Search } from "lucide-react";
import { Link } from "react-router";

const Hero = () => {
  return (
    <section className="bg-[#f7f5f2] min-h-155 flex items-center">
      <div className="max-w-7xl mx-auto w-full px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-[#e5f1ec] text-[#0f6a43] px-4 py-2 rounded-full text-sm font-medium mb-6">
              <span className="w-2 h-2 rounded-full bg-[#0f6a43]"></span>
              Campus Lost & Found Platform
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-[#0b2d5b]">
              Lost Something?
              <br />
              <span className="text-[#0f6a43]">Let's Bring It Back.</span>
            </h1>

            <p className="mt-6 text-gray-600 text-base md:text-lg leading-8 max-w-xl">
              Retrivo is a campus-based lost and found platform that helps
              students, faculty, and staff report, search, and recover their
              lost belongings easily and securely.
            </p>

            <div className="flex flex-wrap gap-4 mt-8">
              <Link to={"browse-items"} className="btn bg-[#0f6a43] hover:bg-[#0c5a38] text-white border-none px-7">
                Browse Items
              </Link>
              <Link to='report-item' className="btn bg-white hover:bg-gray-100 text-[#0b2d5b] border border-[#0b2d5b] px-7">
                Report an Item
              </Link>
            </div>

            <div className="mt-10 max-w-xl">
              <div className="flex items-center bg-white border border-gray-200 rounded-xl shadow-sm p-2">
                <input
                  type="text"
                  placeholder="Search for lost or found items..."
                  className="input flex-1 border-none focus:outline-none focus:ring-0 bg-transparent"
                />

                <button className="btn bg-[#0b2d5b] hover:bg-[#082344] text-white border-none rounded-lg">
                  <Search />
                </button>
              </div>
            </div>
          </div>

          <div className="relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md">
              <div className="absolute inset-0 bg-[#dfece7] rounded-[40px] rotate-3"></div>

              <div className="relative bg-white rounded-[40px] shadow-xl p-7">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="text-sm text-gray-500">Recent Listing</p>

                    <h3 className="text-xl font-bold text-[#0b2d5b]">
                      Found Items
                    </h3>
                  </div>

                  <div className="w-11 h-11 rounded-full bg-[#e5f1ec] flex items-center justify-center">
                    <span className="text-[#0f6a43] text-xl">
                      <Check />
                    </span>
                  </div>
                </div>

                <div className="bg-[#f7f5f2] rounded-2xl p-5">
                  <div className="flex gap-4 items-center">
                    <div className="w-20 h-20 rounded-xl bg-[#dce5ee] flex items-center justify-center text-3xl">
                      <Backpack />
                    </div>

                    <div>
                      <h4 className="font-semibold text-[#0b2d5b]">
                        Black Backpack
                      </h4>

                      <p className="text-sm text-gray-500 mt-1">
                        Central Library
                      </p>

                      <span className="inline-block mt-2 text-xs bg-[#e5f1ec] text-[#0f6a43] px-3 py-1 rounded-full">
                        Found
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 border border-gray-100 rounded-2xl p-4">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-[#eef0f3] flex items-center justify-center text-2xl">
                      <IdCard />
                    </div>

                    <div className="flex-1">
                      <h4 className="font-semibold text-[#0b2d5b] text-sm">
                        Student ID Card
                      </h4>

                      <p className="text-xs text-gray-500">Cafeteria Area</p>
                    </div>

                    <span className="text-xs text-[#0f6a43] font-medium">
                      Found
                    </span>
                  </div>
                </div>

                <div className="flex justify-between items-center mt-6 pt-5 border-t">
                  <div>
                    <p className="text-xs text-gray-500">
                      Helping the campus community
                    </p>

                    <p className="text-sm font-semibold text-[#0b2d5b]">
                      Find. Report. Retrieve.
                    </p>
                  </div>

                  <div className="w-10 h-10 rounded-full bg-[#0f6a43] text-white flex items-center justify-center">
                    <MoveRight size={18} strokeWidth={1.5} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
