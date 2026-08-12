import {
  FilePlus2,
  Search,
  ShieldCheck,
  Handshake,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router";

const steps = [
  {
    number: "01",
    title: "Report an Item",
    description:
      "Lost or found something on campus? Submit the item details, location, date, and a photo.",
    icon: FilePlus2,
  },
  {
    number: "02",
    title: "Search Listings",
    description:
      "Browse recent listings and use categories or search to find a lost or found item.",
    icon: Search,
  },
  {
    number: "03",
    title: "Request a Claim",
    description:
      "Found your belongings? Select the item and submit a claim with the required information.",
    icon: Handshake,
  },
  {
    number: "04",
    title: "Verify & Retrieve",
    description:
      "Answer the ownership verification question. Once verified, the item can be safely returned.",
    icon: ShieldCheck,
  },
];

const HowItWorks = () => {
  return (
    <section className="bg-[#f7f5f2] py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-[#e5f1ec] text-[#0f6a43] px-4 py-2 rounded-full text-sm font-medium">
            <ShieldCheck size={17} />
            Simple & Secure
          </div>

          <h2 className="mt-5 text-3xl md:text-4xl font-bold text-[#0b2d5b]">
            How Retrivo Works
          </h2>

          <p className="mt-4 text-gray-600 leading-7">
            Retrieving a lost item doesn't have to be complicated. Retrivo makes
            the process simple, transparent, and secure.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-14">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div
                key={step.number}
                className="relative bg-white rounded-2xl p-7 border border-gray-200 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center justify-between">
                  <span className="text-4xl font-bold text-[#dce7e2]">
                    {step.number}
                  </span>

                  <div className="w-12 h-12 rounded-xl bg-[#e5f1ec] flex items-center justify-center text-[#0f6a43]">
                    <Icon size={23} />
                  </div>
                </div>

                <h3 className="mt-7 text-xl font-semibold text-[#0b2d5b]">
                  {step.title}
                </h3>

                <p className="mt-3 text-sm text-gray-600 leading-6">
                  {step.description}
                </p>

                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 -right-5 z-10">
                    <div className="w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center text-[#0f6a43]">
                      <ArrowRight size={16} />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <Link
            to={"/"}
            className="btn bg-[#0f6a43] hover:bg-[#0c5a38] text-white border-none px-7"
          >
            Get Started
            <ArrowRight size={17} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
