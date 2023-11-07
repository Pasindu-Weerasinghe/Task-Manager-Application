import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
    const [success,setSuccess] = useState();
    const navigate = useNavigate();
    axios.defaults.withCredentials = true; 

    useEffect(()=>{
        axios.get('http://localhost:8080/admin').then(res=>{
            if(res.data === "Success"){
                setSuccess("Successded OK")
            }else{
                navigate('/')
            }
        })
    },[])
  return (
   <>
    <div>Admin</div>
    <p>{success}</p>
   </>
  )
}

export default Admin