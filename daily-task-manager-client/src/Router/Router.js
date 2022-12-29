import {createBrowserRouter} from "react-router-dom";
import Main from "../Layout/Main";
import MyTask from "../Pages/MyTask/MyTask";
import CompletedTasks from './../Pages/CompletedTasks/CompletedTasks';
import AddTask from './../Pages/AddTask/AddTask';
import Register from './../Pages/Register/Register';
import Login from './../Login/Login';
  

export const Router = createBrowserRouter([
    {
        path: '/',
        element: <Main />,
        children:[
 
            {
                path: '/',
                element: <AddTask />
            },
            {
                path: '/addTask',
                element: <AddTask />
            },
            {
                path: '/myTask',
                element: <MyTask />
            },
            {
                path: '/completedTasks',
                element: <CompletedTasks />
            },
            {
                path: '/register',
                element: <Register />
            },
            {
                path: '/login',
                element: <Login />
            }
        ]

    }
])