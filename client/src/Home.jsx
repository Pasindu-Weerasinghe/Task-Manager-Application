import React, { useEffect } from 'react'
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Home = () => {
  axios.defaults.withCredentials = true;
  const navigate = useNavigate();

 useEffect(()=>{
  
  axios
      .get("http://localhost:8080/home")
      .then((result) => { 
        
        if (result.data !== "Success") {
         navigate("/login");
        }
      })
      .catch((err) => console.log(err));
 },[])
  return (
    <div>Home</div>
  )
}

export default Home