import React from 'react';
import { useState, useContext } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { AuthContext } from '../Context/Context';
import useToken from './../Hooks/useToken';
import { useTitle } from './../Hooks/useTitle';

const Login = () => {
    const {signInUserPassword, googleSignIn}= useContext(AuthContext)
    const [passwordToggle, setPasswordToggle] = useState(false)
    const { register, handleSubmit,  formState: { errors } } = useForm();
    const [createdUserEmail, setCreatedUserEmail] = useState('');
    const [loader, setLoader] = useState(false)
    const location = useLocation()
    const navigate = useNavigate()
    const [token] = useToken(createdUserEmail)
    useTitle('Login')

    const from = location?.state?.from || '/';


    if (token) {
        navigate(from, { replace: true })
        toast.success('Login success full');
    }


    const onSubmit = (data) => {

        // LOGIN user login
        setLoader(true)
        //Sign in user password
        signInUserPassword(data.email, data.password)
            .then((result) => {
                const user = result.user;
                setCreatedUserEmail(user.email)
                setLoader(false)



            }).catch((error) => {

                const errorMessage = error.message;
                toast.error(errorMessage)
                setLoader(false)


            });


    }

//google login
const handelToGoogleLogin = () => {

    setLoader(true)

    googleSignIn()
        .then((result) => {
            const user = result.user;
            setCreatedUserEmail(user.email)
            setLoader(false);

        }).catch((error) => {

            const errorMessage = error.message;
            toast.error(errorMessage)
            setLoader(false)


        });
    }





    return (
        <div className='w-screen mt-10'>
        <div className=" w-4/6 h-5/6 m-auto bg-white shadow-2xl rounded-lg p-10">
        <h1 className="text-5xl font-bold text-center my-5">Create Account</h1>
        <div className="flex justify-center my-10">
        <button onClick={handelToGoogleLogin} className='bg-blue-50 hover:bg-blue-100 text-[#3B5998] text-3xl p-4 rounded-full' ><FcGoogle  /></button>
        </div>
        <form className="" onSubmit={handleSubmit(onSubmit)}>
            
            <div className="">
            <label className={errors.email ?'text-lg text-red-400':'text-lg text-blue-400'} htmlFor="Email">Enter Your Email</label>
                <input type='email' id="Email" placeholder='example@mail.com' {...register("email", {
                    required: "Please enter a valid email address (the data you entered is not in the right format) ",
                    maxLength: { value: 40, message: "you enter value is up to 40 characters" }

                })} className={errors.email ? "px-2 w-full border border-red-400 border-3 py-5" : "px-2 w-full py-3 border border-blue-400 border-3"} />
                {
                    errors.email && <p className=' text-red-600 mt-3'>{errors.email.message}</p>
                }
            </div>
            <div className="mt-10">
            <label className={errors.password ?'text-lg text-red-400':'text-lg text-blue-400'} htmlFor="Password">Enter Password</label>
                <input type={passwordToggle? "text" : "password"} placeholder="Password" id="Password" {...register("password", {
                    required: "Password is required",
                    minLength: { value: 6, message: "At last provide 6 characters" },
                    pattern: {
                        value: /(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[a-zA-Z!#$%&? "])[a-zA-Z0-9!#$%&?]/,
                        message: "must include lower, upper, number, and special chars"
                    }
                    

                })} className={errors.password ? "px-2 w-full border border-red-400 border-3 py-5" : "px-2 w-full py-3 border border-blue-400 border-3"}/>
                <div className='w-100 flex justify-end mr-5 -mt-10'>
                        {
                            passwordToggle ? <AiFillEyeInvisible onClick={() => setPasswordToggle(!passwordToggle)} className='text-2xl cursor-pointer' />
                                : <AiFillEye onClick={() => setPasswordToggle(!passwordToggle)} className='text-2xl cursor-pointer' />
                        }
                    </div>
                    {
                        errors.password && <p className='text-red-600 mt-3'>{errors.password.message}</p>
                    }

            </div>
            
           

            <div className="mt-10">
            <button className=' py-3 w-full
            bg-blue-400 hover:bg-white
            text-white hover:text-blue-400
              border bottom-3 border-blue-400'
              type='submit' disabled={loader}
            >{ loader? 
            'Processing...' : 'Sign UP'}</button>
            </div>
            <div className="my-5">
            <p href="#" className="text-center text-sm">

            Don't have account?
            <Link to='/register' className="label-text-alt link link-hover text-blue-400 hover:border-b-2 hover:border-blue-300 text-sm ml-1">Create account</Link>
        </p>
            </div>
          
          
        </form>
        </div>
        
    </div>
    );
};

export default Login;