// import { FaGoogle } from "react-icons/fa";
import { FaFacebook, FaGoogle } from "react-icons/fa6";
import BGImg from '../assets/logBG.jpg'
import { Link } from "react-router";

const Register = () => {
  return (
    <div className="bg-[#F5F5F5] min-h-screen justify-center flex flex-col items-center bg-cover bg-center bg-no-repeat" style={{backgroundImage: `url(${BGImg})`}}>
      <div className="hero bg-base-200/50 w-3/4 py-18 px-20 rounded-lg">
        <div className="hero-content grid-cols-1 grid md:grid-cols-2 ">
          <div className="card bg-base-200 w-full max-w-sm shrink-0 shadow-2xl transition duration-300 ease-in-out border-r-base-200 border-r-2 hover:border-[#1E2B24]">
            <div className="card-body">
              <fieldset className="fieldset">
                <label className="label">Email</label>
                <input type="email" className="input focus:outline-none border-[#afccbc] focus:border-[#1F2430]" placeholder="Email" />
                <label className="label">Password</label>
                <input
                  type="password"
                  className="input focus:outline-none border-[#afccbc] focus:border-[#1F2430]"
                  placeholder="Password"
                />
                <div>
                  <a className="link link-hover">Forgot password?</a>
                </div>
                <button className="btn bg-[#146B46] mt-4 text-white border-0 capitalize">sign up</button>
              </fieldset>
              <div><p className="text-center text-sm "> Or continue with</p></div> 
              <div className="flex justify-center items-center gap-3">
                   <a rel="#" className="cursor-pointer border border-[#146B46] py-2 px-8 rounded-xl hover:bg-gray-200"><FaGoogle size={17} className="text-[#1E2B24]"/></a> 
                   <a rel="#" className="cursor-pointer border border-[#146B46] py-2 px-8 rounded-xl hover:bg-gray-200"><FaFacebook size={17} className="text-[#1E2B24]"/></a> 
              </div>
              <div className="text-sm text-gray-500 text-center py-3"><p>Already have an account? <Link to={'/login'} className="link">login</Link></p></div>
            </div>
          </div>
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold capitalize text-[#146B46]">Join Retrivo Today</h1>
            <p className="py-6 text-xl text-[#4F4F4F]">
              Help your campus community recover lost belongings.
            </p>
          </div>
        </div>
      </div>
      <div className="text-center md:mt-6 text-sm">
        <p className="text-gray-900/50">
          By clicking continue, you agree to our <Link to={'/'} className="link"> Terms of Service </Link> and <Link to={'/'} className="link">Privacy Policy</Link>.
        </p>
      </div>
    </div>
  );
};

export default Register;