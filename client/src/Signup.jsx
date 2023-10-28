import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8080/register", { name, email, password })
      .then((result) => {console.log(result)
      navigate('/login');
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="">User Name</label>
          <br />
          <input
            type="text"
            placeholder="Enter Name"
            autoComplete="off"
            name="uname"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="">Email</label>
          <br />
          <input
            type="email"
            placeholder="Enter Email"
            autoComplete="off"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="">Password</label>
          <br />
          <input
            type="password"
            placeholder="Enter Password"
            autoComplete="off"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <br />
        <button type="submit">Register</button>
      </form>
      <p>Already have an account</p>
      <Link to="/login">Login</Link>
    </div>
  );
};

export default Signup;
