import React from 'react';
import { useState, useContext } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from './../../Context/Context';
import { toast } from 'react-hot-toast';
import useToken from './../../Hooks/useToken';
import { useTitle } from './../../Hooks/useTitle';





const Register = () => {
    const {createUser, updateUserProfile, googleSignIn} = useContext(AuthContext)
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [passwordToggle, setPasswordToggle] = useState(false)
    const [confirmPasswordToggle, setConfirmPasswordToggle] = useState(false)
    const [confirmPasswordError, setConfirmPasswordError] = useState('')
    const [createdUserEmail, setCreatedUserEmail] = useState('')
    const [loader, setLoader] = useState(false)
    const [token] = useToken(createdUserEmail);
    const Navigate = useNavigate();
    const location = useLocation();
    useTitle('Register')


    const from = location?.state?.from || '/';
    if (token) {
        Navigate(from, { replace: true })
        setLoader(false)
        toast.success('Register success full');

    }

    // google account login
    const handelToGoogleLogin = () =>{
        setLoader(true);

        googleSignIn()
            .then((result) => {
                const user = result.user;
                saveUser(user.displayName, user.email, user.photoURL);
                //set token
                setCreatedUserEmail(user.email);
                setLoader(false)
            }).catch((error) => {

                const errorMessage = error.message;
                toast.error(errorMessage)
                setLoader(false)


            });
    }

    //user login

    const onSubmit = data => {
        setLoader(true)
        if(data?.password !== data?.confirmPassword){
            setConfirmPasswordError("Your Password Don't match")
            setLoader(false)
            return;
        }
        const imgHostKey = `1ac619d1289137be2fe6cbaa52f2b8f9`

        const image = data.img[0];
        const formData = new FormData();
        formData.append('image', image);

        fetch(`https://api.imgbb.com/1/upload?key=${imgHostKey}`, {
            method: 'POST',
            body: formData
        })
        .then(res => res.json())
            .then(imgData => {
                if (imgData.success) {
                    const UserInfo = {
                        displayName: data.name,
                        photoURL: imgData.data.url,

                    }

                   
         // login userPassword 
        createUser(data?.email, data?.password)
        .then((result) => {
            const user = result.user;

            // update user profile
            updateUserProfile(UserInfo)
                .then(() => {
                    saveUser( data.email, imgData.data.url);
                })
                .catch(err => {
                    toast.error(err.message)
                    setLoader(false)
                });

        }).catch((error) => {

            const errorMessage = error.message;
            toast.error(errorMessage)
            setLoader(false)


        });
     }})
    }


     //save user in database

    const saveUser = (name, email, img) => {
        const users = {
            name,
            email,
            img
        }
        console.log(users)
        fetch(`https://daily-task-manager-server-seven.vercel.app/users`, {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(users)
        })
            .then(res => res.json())
            .then(data => {
                setCreatedUserEmail(email)
                setLoader(false)
            })
            .catch(error => {
                setLoader(false)
                toast.error(error.message)
            })
    }
    return (
        <div className='w-screen flex justify-center align-middle mt-20'>
            <form className="card-body bg-white shadow-2xl p-5 rounded-lg" onSubmit={handleSubmit(onSubmit)}>
            <h1 className="text-5xl font-bold text-center my-5">Create Account</h1>
            <div className="flex justify-center my-10">
                      <button onClick={handelToGoogleLogin} className='bg-blue-50 hover:bg-blue-100 text-[#3B5998] text-3xl p-4 rounded-full' ><FcGoogle  /></button>
            </div>
    
                <div className="grid gap-6 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1">
                <div className="">
                <label className={errors.name ?'text-lg text-red-400':'text-lg text-blue-400'} htmlFor="Name">Enter Your Name</label>
                <input type='text' id="Name" placeholder='Niloy' {...register("name", {
                    required: "This field is required (You can't leave this field blank) ",
                    maxLength: { value: 30, message: "Please Provide" }

                })} className={errors.name ? "px-2 w-full border border-red-400 border-3 py-5" : "px-2 w-full py-3 border border-blue-400 border-3"} />
                {
                    errors.name && <p className=' text-red-600'>{errors.name.message}</p>
                }
                </div>
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
                <div className="my-20">
                        <label className={errors.confirmPassword ?'text-lg text-red-400':'text-lg text-blue-400'} htmlFor="confirmPassword">Confirm Password</label>
                    <input type={confirmPasswordToggle? 'text' : 'password'} id="ConfirmPassword" placeholder='Confirm Password'  {...register("confirmPassword", {
                        required: "Password is required",
                        minLength: { value: 6, message: "At last provide 6 characters" },
                    })} className={confirmPasswordError ? "px-2 w-full border border-red-400 border-3 py-5" : "px-2 w-full py-3 border border-blue-400 border-3"} />

                    <div className='w-100 flex justify-end mr-5 -mt-10'>
                            {
                                confirmPasswordToggle ? <AiFillEyeInvisible onClick={() => setConfirmPasswordToggle(!confirmPasswordToggle)} className='text-2xl cursor-pointer' />
                                    : <AiFillEye onClick={() => setConfirmPasswordToggle(!confirmPasswordToggle)} className='text-2xl cursor-pointer' />
                            }
                        </div>
                        {
                            confirmPasswordError && <p className='text-red-600 mt-10'>{confirmPasswordError}</p>
                        }

                </div>
                <div className="my-10 w-24">
                <label className="block">
                        <span className="sr-only">Choose a photo</span>
                        <input type="file" className="block text-sm text-slate-500
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-full file:border-0
                        file:text-sm file:font-semibold
                      file:bg-blue-200 hover:file:text-white
                      hover:file:bg-blue-400 file:text-blue-700
                        " {...register("img", {
                            required: "img is required",
                        })} accept=".png, .jpg, .jpeg" required/>
                        
                    </label>
                    {
                        errors.img && <p className='text-danger text-red-600'>{errors.img.message}</p>
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
                <div className="text-center text-sm">

                Already have an account?
                <Link to='/login' className="label-text-alt link link-hover text-blue-400 hover:border-b-2 hover:border-blue-300 text-sm ml-1">
                 Login account
                
                </Link>
            </div>
                </div>
              
              
            </form>
            
            
        </div>
    );
};

export default Register;