import React, { useContext, useState } from "react";
import "./Login.css";
import assets from "../../assets/assets";
import { AppContext } from "../../context/AppContext";
import { axiosInstance } from "../../config/api";
import { toast } from "react-toastify";

const Login = () => {
  const [currState, setCurrState] = useState("Sign up");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setToken } = useContext(AppContext);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (currState === "Sign up") {
        const response = await axiosInstance.post("/api/auth/register", { name: userName, email, password });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
        } else {
          toast.error(response.data.message);
        }
      } else {
        const response = await axiosInstance.post("/api/auth/login", { email, password });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  }

  return (
    <div className="login">
      <img src={assets.logo_big} className="logo" alt="Logo" />
      <form onSubmit={onSubmitHandler} className="login-form">
        <h2>{currState}</h2>

        {/* Conditional rendering of the username input */}
        {currState === "Sign up" && (
          <input
            onChange={(e) => setUserName(e.target.value)}
            value={userName}
            type="text"
            placeholder="Username"
            className="form-input"
            required
          />
        )}

        {/* Common email and password inputs */}
        <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type="email"
          placeholder="Email address"
          className="form-input"
          required
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type="password"
          placeholder="Password"
          className="form-input"
          required
          minLength={6}
        />

        {/* Submit Button */}
        <button type="submit">
          {currState === "Sign up" ? "Create account" : "Login now"}
        </button>

        {/* Terms and conditions */}
        <div className="login-term">
          <input type="checkbox" id="terms" />
          <label htmlFor="terms">
            Agree to the terms of use & privacy policy.
          </label>
        </div>

        {/* Toggle between Login and Sign up */}
        <div className="login-forgot">
          {currState === "Sign up" ? (
            <p className="login-toggle">
              Already have an account?
              <span onClick={() => setCurrState("Login")}>Login here</span>
            </p>
          ) : (
            <p className="login-toggle">
              Don't have an account?
              <span onClick={() => setCurrState("Sign up")}>Create one</span>
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default Login;
