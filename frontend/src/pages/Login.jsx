import React, { useContext, useState } from "react";
import { FaEye, FaEyeSlash, FaLongArrowAltLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { AuthDataContext } from "../context/AuthContext";
import axios from "axios";
import { UserDataContext } from "../context/UserContext";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { userData, setUserData } = useContext(UserDataContext)

  const navigate = useNavigate();
  const { serverUrl } = useContext(AuthDataContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/login`,
        { email, password },
        { withCredentials: true }
      );
      setUserData(result.data)
      console.log(result);
      navigate("/")

      // // Optional redirect on success
      // if (result.status === 200) {
      //   navigate("/");
      // }


    } catch (error) {
      console.error("Login error:", error);
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center relative">
      {/* Back to home button */}
      <div className="bg-gray-100 p-1 rounded-full absolute top-10 left-10">
        <FaLongArrowAltLeft
          className="h-6 w-6 text-orange-600 cursor-pointer"
          onClick={() => navigate("/")}
          title="Back to Home"
        />
      </div>

      <form
        onSubmit={handleLogin}
        className="max-w-[68vh] w-[90%] h-[50vh] flex flex-col items-center border md:items-start gap-2 p-8 rounded-md"
      >
        <h1 className="text-2xl font-bold text-amber-700 mb-2">
          Welcome to EchoStay🏡
        </h1>

        {/* Email */}
        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="email" className="text-md font-semibold">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="outline-none border-2 border-gray-400 py-1 px-3 rounded-md"
          />
        </div>

        {/* Password */}
        <div className="flex flex-col gap-2 w-full mb-2 relative">
          <label htmlFor="password" className="text-md font-semibold">
            Password
          </label>
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
            className="outline-none border-2 border-gray-400 py-1 px-3 rounded-md pr-10"
          />

          {showPassword ? (
            <FaEye
              className="cursor-pointer absolute bottom-2 right-3 text-gray-600"
              onClick={() => setShowPassword(false)}
              title="Hide password"
            />
          ) : (
            <FaEyeSlash
              className="cursor-pointer absolute bottom-2 right-3 text-gray-600"
              onClick={() => setShowPassword(true)}
              title="Show password"
            />
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="bg-orange-600 p-2 px-8 rounded-md font-semibold text-white"
        >
          Login
        </button>

        <p className="text-sm mt-1">
          Create a new account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-blue-500 cursor-pointer underline ml-1 font-semibold"
          >
            Click here
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;