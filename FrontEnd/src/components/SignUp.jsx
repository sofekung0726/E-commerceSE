import React, { useContext } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FaGooglePlusG, FaFacebookF, FaGithub } from "react-icons/fa";
import { useForm } from "react-hook-form"
import { AuthContext } from '../context/AuthProvider';
import Modal from './Modal';

const SignUp = ({ name }) => {
    const { createUser } = useContext(AuthContext)
    const location = useLocation()
    const navigate = useNavigate()
    const from = location?.state?.from?.pathname || "/";
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const onSubmit = (data) => {
        createUser(data.email, data.password).then(
            (result) => {
                // Signed up 
                const user = result.user;
                console.log(user);
                alert("Account created Successfully")
                navigate(from, { replace: true })
            })
            .catch((error) => {
                console.log(error);
            })
    }
    return (
        <div className=' max-w-md bg-white shadow-w-full mx-auto flex-items-center justify-center my-40'>
            <form className="card-body flex flex-col justify-center text-center" onSubmit={handleSubmit(onSubmit)}>
                <h3 className="font-bold text-lg ">Create Account</h3>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input type="email" placeholder="email" className="input input-bordered" required
                        {...register("email")}
                    />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Password</span>
                    </label>
                    <input type="password" placeholder="password" className="input input-bordered" required
                        {...register("password")}
                    />
                    <label className="label">
                        <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                    </label>
                </div>
                <div className="form-control mt-6">
                    <input type='submit' value='SignUp' className="btn bg-red text-white" />
                </div>
                <p className='text-center my-2 '>Have an account ?
                    <button onClick={() => document.getElementById('login').showModal()} className='underline ml-1'> Login Now </button>
                </p>
                {/* <button htmlFor={name} className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'
                    onClick={() => document.getElementById(name).close()}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="bg-red w-6 h-6 rounded-full text-white">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>


                </button> */}
            </form>
            <div className='text-center space-x-3 mb-3'>
                <button className="btn btn-circle btn-ghost hover:bg-red hover:text-white">
                    <FaGooglePlusG />
                </button>
                <button className="btn btn-circle btn-ghost hover:bg-red hover:text-white">
                    <FaFacebookF />
                </button>
                <button className="btn btn-circle btn-ghost hover:bg-red hover:text-white">
                    <FaGithub />
                </button>
            </div>
            <Modal name={"login"} />
        </div>
    )
}

export default SignUp