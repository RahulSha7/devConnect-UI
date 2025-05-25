import axios from "axios";
import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";  
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handleLogin = async () => {
    try {
   const res =    await axios.post(
       BASE_URL+ "/login",
        { email, 
          password },
        { withCredentials: true }
  
      );
      
      dispatch(addUser(res.data));
      return navigate("/");
    } catch (err) {
      setError("Invalid email or password");
      console.error(err);
    }
  };
  return (
    <div className="card card-border bg-base-300 w-96 justify-center shadow-xl my-12 mx-auto">
      <div className="card-body">
        <h2 className="card-title justify-center">Login</h2>
        <label className="input py-2 my-4 rounded-lg">
          <input
            value={email}
            type="text"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label className="input rounded-lg ">
        <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
           
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="btn btn-ghost btn-xs"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </label>
      <div>
         <p className="text-red-500 size-20"> {error}</p>
      </div>
        <div className="card-actions  justify-center items-center -my-1 rounded-lg ">
         
          <button className="btn btn-primary " onClick={handleLogin}>
            Login
          </button>
            
        </div>
      </div>
    </div>
  );
};

export default Login;
