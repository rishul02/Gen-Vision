import React, { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [state, setState] = useState("Login");
  const { setShowLogin, backendUrl, setToken, setUser } =
    useContext(AppContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      if (state === "Login") {
        const { data } = await axios.post(backendUrl + "/api/user/login", {
          email,
          password,
        });

        if (data.success) {
          setToken(data.token);
          setUser(data.user);
          localStorage.setItem("token", data.token);
          setShowLogin(false);
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(backendUrl + "/api/user/register", {
          name,
          email,
          password,
        });

        if (data.success) {
          setToken(data.token);
          setUser(data.user);
          localStorage.setItem("token", data.token);
          setShowLogin(false);
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 
  bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center"
    >
      <motion.form
        onSubmit={onSubmitHandler}
        initial={{ opacity: 0.2, y: 50 }}
        transition={{ duration: 0.3 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative bg-white p-10 rounded-xl text-slate-500"
      >
        <h1 className="text-center text-2xl text-neutral-700 font-medium">
          {state}
        </h1>
        <p className="text-sm text-center text-gray-500 mt-2">
          Welcome back! Please Sign in to Continue
        </p>

        {state !== "Login" && (
          <div className="border border-gray-300 px-4 py-2 flex items-center rounded-full mt-5">
            <img src={assets.profile_icon} alt="User" className="w-5 h-5" />
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              className="outline-none text-sm flex-1 ml-2"
              placeholder="Full Name"
              autoComplete="off"
              required
            />
          </div>
        )}

        <div className="border border-gray-300 px-4 py-2 flex items-center rounded-full mt-4">
          <img src={assets.email_icon} alt="Email" className="w-5 h-5" />
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            className="outline-none text-sm flex-1 ml-2"
            placeholder="Enter your Email ID "
            autoComplete="off"
            required
          />
        </div>

        <div className="border border-gray-300 px-4 py-2 flex items-center rounded-full mt-4">
          <img src={assets.lock_icon} alt="Lock" className="w-5 h-5" />
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="Password"
            className="outline-none text-sm flex-1 ml-2"
            placeholder="Password"
            autoComplete="off"
            required
          />
        </div>

        <p className="text-sm text-blue-600 text-center mt-4 cursor-pointer">
          Forgot Password?
        </p>

        <button className="bg-blue-600 w-full text-white py-2 rounded-full mt-4 hover:bg-blue-700 transition">
          {state === "Login" ? "login" : "create account"}
        </button>

        {state === "Login" ? (
          <p className="mt-5 text-center">
            Don't have an Account?{" "}
            <span
              className="text-blue-600 cursor-pointer"
              onClick={() => setState("Sign Up")}
            >
              Sign up
            </span>{" "}
          </p>
        ) : (
          <p className="mt-5 text-center">
            Already have an Account!{" "}
            <span
              className="text-blue-600 cursor-pointer"
              onClick={() => setState("Login")}
            >
              Log in
            </span>{" "}
          </p>
        )}

        <img
          onClick={() => setShowLogin(false)}
          src={assets.cross_icon}
          alt=""
          className="absolute top-5 right-5 cursor-pointer"
        />
      </motion.form>
    </div>
  );
};

export default Login;
