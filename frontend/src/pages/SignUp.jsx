import React, { useContext, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { AuthDataContext } from "../context/AuthContext";
import axios from "axios";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { userData, setUserData } = useContext(UserDataContext)

  const navigate = useNavigate();
  const { serverUrl } = useContext(AuthDataContext);

  // ---------- Submit Handler ----------//
  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/signup`,
        { name, email, password },
        { withCredentials: true } // ✅ camel case
      );
      setUserData(result.data)
      navigate("/")
      console.log(result);

      if (result.status === 201) {
        navigate("/login");
      }
    } catch (error) {
      console.error("Signup error:", error);
    }
  };


  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <form
        onSubmit={handleSignUp}
        className="max-w-[68vh] w-[90%] h-[60vh] flex flex-col items-center justify-center border md:items-start gap-2 px-8 rounded-md"
      >
        <h1 className="text-2xl font-bold text-amber-700">
          Welcome to EchoStay🏡
        </h1>

        {/* Name */}
        <div className="mt-2 flex flex-col gap-2 w-full">
          <label htmlFor="name" className="text-md font-semibold">
            Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            required
            className="outline-none border-2 border-gray-400 py-1 px-3 rounded-md"
          />
        </div>

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

        {/* Password with eye toggle */}
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
              title="Hide password"
              onClick={() => setShowPassword(false)}
              className="cursor-pointer absolute bottom-2 right-3 text-gray-600"
            />
          ) : (
            <FaEyeSlash
              title="Show password"
              onClick={() => setShowPassword(true)}
              className="cursor-pointer absolute bottom-2 right-3 text-gray-600"
            />
          )}
        </div>

        <button
          type="submit"
          className="bg-orange-600 p-2 px-8 rounded-md font-semibold text-white"
        >
          Sign Up
        </button>

        <p className="text-sm mt-1">
          Already have an account?
          <span
            onClick={() => navigate("/login")}
            className="text-blue-500 cursor-pointer underline ml-1 font-semibold"
          >
            Login here
          </span>
        </p>
      </form>
    </div>
  );
};

export default SignUp;