import { FaGoogle } from "react-icons/fa6";
import { Link } from "react-router";

const Login = () => {

    return (
        <div>
            <section className="bg-[#F8F8F8] py-8 text-secondary">
                <div className="container mx-auto">
                    <div className="max-w-sm mx-auto border bg-slate-400 shadow-xl rounded pb-6">
                        <form  className="p-6">
                            <h3 className="text-center font-bold text-2xl capitalize">login now</h3>
                            <div className="form-control mb-2">
                                <div className="label">
                                    <div className="text-lg">Email</div>
                                </div>
                                <input type="email"  className="focus:outline-none input" placeholder='Your Email' />
                                
                            </div>
                            <div className="form-control mb-2">
                                <div className="label">
                                    <div className="text-lg">Password</div>
                                </div>
                                <input type="password"  className="focus:outline-none input" placeholder='Password' />
                                
                            </div>
                            <button type='submit' className='btn btn-secondary w-full mt-4 text-lg'>Login</button>
                        </form>
                        <p className="text-center capitalize text-lg">new to Pcmart ? <Link to="/register" className=''><strong>register</strong></Link></p>
                        <div className="px-6">
                            <button  type='button' className='btn btn-secondary font-bold btn-outline w-full mt-4  text-lg'> <FaGoogle className='mr-3' />  google</button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Login;