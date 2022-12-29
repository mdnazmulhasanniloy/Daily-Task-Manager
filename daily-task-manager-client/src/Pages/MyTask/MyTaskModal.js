import { Dialog, DialogBody, DialogHeader, Button } from '@material-tailwind/react';
import React, { Fragment, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

const MyTaskModal = ({handleOpen, open, task, refetch}) => {
 

 
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loader, setLoader] = useState(false);
  
// update data
  const onSubmit = data => {
      setLoader(true)
      fetch(`https://daily-task-manager-server-seven.vercel.app/updateTask/${task._id}`,{
        method: 'PATCH',
        headers: {
          'content-type': 'application/json'
          },
        body: JSON.stringify(data)
      }) 
      .then(res=>res.json())
      .then(data => { 
        if(data.modifiedCount>0){
              setLoader(false)
              handleOpen()
              toast.success('your information is successful updated');
              refetch()
          }
          })
          .catch(err => {
            setLoader(false)
            handleOpen()
            toast.error(err.message)
          })
  }

    return (
        <div>
        <Fragment>
        <Dialog
          open={open}
          handler={handleOpen}
          animate={{
            mount: { scale: 1, y: 0 },
            unmount: { scale: 0.9, y: -100 },
          }}
        >
          <DialogHeader><h1 className='text-xl text-center font-bold'>Update Task</h1> </DialogHeader>
          <DialogBody divider>

          <form className='w-11/12 mx-auto' action="" onSubmit={handleSubmit(onSubmit)}>
           <label htmlFor='task'  className=' block mb-2 text-sm font-medium text-gray-600 '>Task Fild</label>
           <textarea rows="6" className='block p-2.5 w-full text-sm text-gray-600 bg-transparent rounded-lg border border-gray-300 focus:ring-white focus:border-white dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-white dark:focus:border-white'
           id='task' defaultValue={task?.task} placeholder='Write Your Task here' 
           label="Textarea Blue" {...register("task",{
                required: "task field is required",
                maxLength: { value: 300, message: "you enter value is up to 300 characters" }

            })} />
            {
                errors.task && <p className=' text-red-600'>{errors.task.message}</p>
            }

            <div className="flex justify-end mt-5">
                <Button
                variant="text"
                color="red"
                onClick={handleOpen}
                className="mr-1"
              >
                <span>Cancel</span>
              </Button>
              <Button type='submit' variant="gradient" color="green">
                <span>{ loader? 
                  'Processing...' : 'Confirm'}</span>
              </Button>
            
            </div>
            </form>
          </DialogBody>
        </Dialog>
      </Fragment>
        </div>
    );
};

export default MyTaskModal;