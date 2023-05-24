import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './SignIn.css'
const SignIn = () => {
    const navigate= useNavigate();
    const [formData, setFormData]= useState({
        email:"",
        password:"",
    })

    const {email, password}= formData;

    const handleInput=(e)=>{
       const {name, value}= e.target;
       setFormData((preVal)=>{
        return{
            ...preVal,
            [name]:value
        }
       })
    }

    const handleSubmit=(e)=>{
      e.preventDefault();
      if(!email || !password){
       toast.error("Please Fill the Data")
      } else{
        setTimeout(()=>{
          navigate("/dashboard")
        },[2000]);
        toast.success("Sign In Successfully")
        setFormData({
            email:"",
            password:"",
        })
      }

    }



  return (
     <div className='signin_container '>
       <div className="form_data_wrapper">
       <h2>Sign In With Blockovia</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group mb-3">
               <label htmlFor="email">Email</label>
               <input type="email" name='email' id='email' placeholder='Enter Email' className='form-control' autoComplete='off' onChange={handleInput} value={email}  />
            </div> 

            <div className="form-group mb-3">
               <label htmlFor="password">Password</label>
               <input type="password" name='password' id='password' onChange={handleInput} value={password} placeholder='Enter Password' className='form-control' autoComplete='off' />
            </div> 
               
            <button className='btn btn-primary mt-2'>Submit</button>
          </form>
       </div>
     </div>
  )
}

export default SignIn