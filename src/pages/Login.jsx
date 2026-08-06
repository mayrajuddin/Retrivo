import { FaFacebook, FaGoogle } from "react-icons/fa6";
import { Link } from "react-router";

const Login = () => {

    return (
        <div className="bg-[#F5F5F5] min-h-screen justify-center flex flex-col items-center">
              <div className="hero bg-base-200 w-3/4 py-18 px-20">
                <div className="hero-content grid-cols-1 grid md:grid-cols-2 ">
                  <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl transition duration-300 ease-in-out   border-r-white border-r-2 hover:border-[#1E2B24]">
                    <div className="card-body">
                      <fieldset className="fieldset">
                        <label className="label">Email</label>
                        <input type="email" className="input focus:outline-none border-[#E4F5EC] focus:border-[#1F2430]" placeholder="Email" />
                        <label className="label">Password</label>
                        <input
                          type="password"
                          className="input focus:outline-none border-[#E4F5EC] focus:border-[#1F2430]"
                          placeholder="Password"
                        />
                        <div>
                          <a className="link link-hover">Forgot password?</a>
                        </div>
                        <button className="btn bg-[#146B46] mt-4 text-white border-0 capitalize">login</button>
                      </fieldset>
                      <div><p className="text-center text-sm "> Or continue with</p></div> 
                      <div className="flex justify-center items-center gap-3">
                           <a rel="#" className="cursor-pointer border border-[#146B46] py-2 px-8 rounded-xl hover:bg-gray-200"><FaGoogle size={17} className="text-[#1E2B24]"/></a> 
                           <a rel="#" className="cursor-pointer border border-[#146B46] py-2 px-8 rounded-xl hover:bg-gray-200"><FaFacebook size={17} className="text-[#1E2B24]"/></a> 
                      </div>
                      <div className="text-sm text-gray-500 text-center py-3"><p>Don't have an account? <Link to={'/register'} className="link">Sign up</Link></p></div>
                    </div>
                  </div>
                  <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold capitalize text-[#146B46]">wellcome back</h1>
                    <p className="py-6 text-xl">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, at!
                    </p>
                  </div>
                </div>
              </div>
              <div className="text-center md:mt-6 text-sm">
                <p>
                  By clicking continue, you agree to our <Link to={'/'} className="link"> Terms of Service </Link> and <Link to={'/'} className="link">Privacy Policy</Link>.
                </p>
              </div>
            </div>
    );
};

export default Login;