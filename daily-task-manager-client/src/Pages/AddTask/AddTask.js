import React, { useContext, useState } from 'react';
import { useForm } from "react-hook-form";
import { toast } from 'react-hot-toast';
import { AuthContext } from './../../Context/Context';
import { useTitle } from './../../Hooks/useTitle';



const AddTask = () => {
    const {user} = useContext(AuthContext)
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
const [loader, setLoader] = useState(false);
    useTitle('Add Task');


const onSubmit = data => {
    setLoader(true)
    if(!user?.uid){
        toast.error('Please first login then add a task');
        setLoader(false);
        return
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
                    const taskInfo = {
                        email: user?.email,
                        task: data.task,
                        photoURL: imgData.data.url,
                        complete: false

                    }

                    fetch(`https://daily-task-manager-server-seven.vercel.app/addTask`, {
                        method: 'POST',
                        headers: {

                            'content-type': 'application/json',
                            authorization: `bearer ${localStorage.getItem('accessToken')}`

                        },
                        body: JSON.stringify(taskInfo)
                    })
                        .then(res => res.json())
                        .then(data => {
                            if (data.acknowledged) {
                                setLoader(false)
                                toast.success('Your Task successfully added')
                            }
                        })
                        .catch(error => { toast.error(error.message); setLoader(false)})
                }})
    
}
    return (
        <div className='h-[100vh] w-screen mt-20 flex justify-center align-middle'>
            <div className=" w-9/12 items-center  ">
           <form className='mt-20 w-11/12 mx-auto' action="" onSubmit={handleSubmit(onSubmit)}>
           <label htmlFor='task'  className=' block mb-2 text-sm font-medium text-white '>Task Fild</label>
           <textarea rows="6" className='block p-2.5 w-full text-sm text-white bg-transparent rounded-lg border border-gray-300 focus:ring-white focus:border-white dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-white dark:focus:border-white'
           id='task' placeholder='Write Your Task here' 
           label="Textarea Blue" {...register("task",{
                required: "task field is required",
                maxLength: { value: 300, message: "you enter value is up to 300 characters" }

            })} />
            {
                errors.task && <p className=' text-red-600'>{errors.task.message}</p>
            }
            <div className="my-10 w-24">
            <label className="block">
                    <span className="sr-only">Choose a photo</span>
                    <input type="file" className="block text-sm text-slate-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-violet-50 file:text-violet-700
                    hover:file:bg-[#ffffff63]
                    " {...register("img", {
                        required: "img is required",
                    })} accept=".png, .jpg, .jpeg" required/>
                    
                </label>
                {
                    errors.img && <p className='text-danger text-red-600'>{errors.img.message}</p>
               }
            </div>
            <button type='submit' className='btn btn-primary
                      border border-2 rounded-md border-white
                     bg-white hover:bg-transparent
                     text-primary-100  hover:text-white
                     font-bold
                     w-full py-2'>{ loader? 
                        'Processing...' : 'Add Task'}</button>
            </form>
            
            </div>
        </div>
    );
};

export default AddTask;