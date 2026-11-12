
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { GoogleLogin } from "@react-oauth/google";
import BGImg from "../assets/logBG.jpg";
import { useAuth } from "../contexts/AuthContext";
const Login = () => {
  const { refreshUser } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Email and Password Login
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);

      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed!");
      }

      await refreshUser();
      navigate("/dashboard", { replace: true });
    } catch (err) {
      setError(err.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  // Google Login
  const handleGoogleLogin = async (credentialResponse) => {
    try {
      setError("");
      setLoading(true);

      const response = await fetch("http://localhost:5000/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          credential: credentialResponse.credential,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Google login failed!");
      }

      await refreshUser();
      navigate("/dashboard", { replace: true });
    } catch (err) {
      setError(err.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="bg-[#F5F5F5] min-h-screen justify-center flex flex-col items-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${BGImg})` }}
    >
      <div className="hero bg-base-200/50 w-3/4 py-18 px-20 rounded-lg">
        <div className="hero-content grid-cols-1 grid md:grid-cols-2">
          <div className="card bg-base-200 w-full max-w-sm shrink-0 shadow-2xl transition duration-300 ease-in-out border-r-base-200 border-r-2 hover:border-[#1E2B24]">
            <div className="card-body">
              <form onSubmit={handleLogin}>
                <fieldset className="fieldset">
                  <label className="label">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="input focus:outline-none border-[#afccbc] focus:border-[#1F2430]"
                    placeholder="Email"
                    required
                  />

                  <label className="label">Password</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="input focus:outline-none border-[#afccbc] focus:border-[#1F2430]"
                    placeholder="Password"
                    required
                  />

                  <div>
                    <a className="link link-hover">Forgot password?</a>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn bg-[#146B46] mt-4 text-white border-0 capitalize"
                  >
                    {loading ? "Logging in..." : "Login"}
                  </button>
                </fieldset>
              </form>

              <div>
                <p className="text-center text-sm divider">or</p>
              </div>

              <div className="flex justify-center items-center mt-2">
                <GoogleLogin
                  onSuccess={handleGoogleLogin}
                  onError={() => setError("Google login was unsuccessful!")}
                  theme="outline"
                  size="large"
                  shape="rectangular"
                  text="continue_with"
                />
              </div>

              {error && (
                <p className="text-center text-sm text-red-500 mt-2">
                  {error}
                </p>
              )}

              <div className="text-sm text-gray-500 text-center py-3">
                <p>
                  Don't have an account?{" "}
                  <Link to={"/register"} className="link">
                    Sign up
                  </Link>
                </p>
              </div>
            </div>
          </div>

          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold capitalize text-[#146B46]">
              welcome back
            </h1>
            <p className="py-6 text-xl text-gray-900/50">
              Sign in to report or find lost belongings on campus.
            </p>
          </div>
        </div>
      </div>

      <div className="text-center md:mt-6 text-sm">
        <p className="text-gray-900/50">
          By clicking continue, you agree to our{" "}
          <Link to={"/"} className="link">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link to={"/"} className="link">
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default Login;