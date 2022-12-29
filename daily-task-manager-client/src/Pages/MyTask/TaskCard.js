import React from 'react';
import { Card, CardHeader, CardBody, Typography, CardFooter, Button } from '@material-tailwind/react';

const TaskCard = ({task, handelCompleted, handelDelete, handleOpen}) => {
    return (
        <Card key={task.length} >
                    <CardHeader floated={false} className=" h-48">
                    <img src={task.photoURL} alt="" />
                    </CardHeader>
                    <CardBody className="text-lg">
                      <Typography>
                        {
                            task?.task.slice(0, 100)
                        }...
                      </Typography>
                    </CardBody>
                    <CardFooter divider className="flex items-center justify-between py-3">
                      <Typography variant="small">
                      <Button color="blue" size="sm" onClick={()=>handleOpen(task)}>update</Button>
                      
                      </Typography>
                      <Typography variant="small" color="gray" className="flex gap-1">
                      <Button color="red" size="sm" onClick={()=>handelDelete(task._id)}>Delete</Button>
                      </Typography>
                      <Typography variant="small" color="gray" className="flex gap-1">
                      <Button color="green" size="sm" onClick={()=>handelCompleted(task._id)} >Completed</Button>
                      </Typography>
                    </CardFooter>
                  </Card>
    );
};

export default TaskCard;