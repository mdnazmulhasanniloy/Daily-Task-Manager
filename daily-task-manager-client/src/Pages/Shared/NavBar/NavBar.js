import { useState, useEffect, useContext } from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  IconButton,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Avatar,
} from "@material-tailwind/react";
import { NavLink, useNavigate } from 'react-router-dom';
import './NavBar.css'
import { AuthContext } from './../../../Context/Context';
import { toast } from 'react-hot-toast';







const NavBar = () => {
  const {user, signOutUser} =useContext(AuthContext)
    const [openNav, setOpenNav] = useState(false);
    const Navigate = useNavigate();
 
  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);
 
  const handelLogout = () =>{
    signOutUser()
            .then(() => {
                localStorage.removeItem('accessToken')
                Navigate('/')
            })
            .catch(error => toast.error(error))
  }
  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 text-lg font-normal text-white"
      >
        <NavLink to="/addTask" className="flex relative NaveLink">
        Add Task
        </NavLink>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 text-lg font-normal text-white"
      >
        <NavLink to="/myTask" className="flex relative NaveLink">
        My Task
        </NavLink>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 text-lg font-normal text-white"
      >
        <NavLink to='/completedTasks' className="flex relative NaveLink">
        Completed Tasks
        </NavLink>
      </Typography>
     {
        !user?.email &&  <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 text-lg font-normal text-white"
      >
        <NavLink to='/login' className="flex relative NaveLink">
        Login
        </NavLink>
      </Typography>
     }
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 text-center mt-3 lg:mt-0 md:mt-0"
      >
                <Menu>
                <MenuHandler className="mr-5">
                <Avatar src={user?.photoURL? user?.photoURL : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOH2aZnIHWjMQj2lQUOWIL2f4Hljgab0ecZQ&usqp=CAU'} alt="avatar" variant="circular" />

                  
                </MenuHandler>
                <MenuList>
                  <MenuItem>Profile</MenuItem>
                  <MenuItem>Settings</MenuItem>
                  {user?.email && <MenuItem onClick={handelLogout}>Logout</MenuItem>}
                </MenuList>
              </Menu>
      </Typography>
    </ul>
  );
    return (
        <div>
        <Navbar className="mx-auto max-w-full bg-none py-2 px-4 lg:px-8 lg:py-4">
        <div className="container mx-auto flex items-center justify-between">
        
          <Typography
            as="a"
            href="#"
            variant="small"
            className="mr-4 cursor-pointer py-1.5 font-normal"
          >
            <span className="text-xl font-semibold">Daily Task Manager</span>
          </Typography>
          <div className="hidden lg:block">{navList}</div>
          <IconButton
            variant="text"
            className="ml-auto h-6 w-6 text-inherit p-2 rounded hover:text-transparent  lg:hidden"
            ripple={false}
            onClick={() => setOpenNav(!openNav)}
          >
            {openNav ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                className="h-6 w-6"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </IconButton>
        </div>
        <MobileNav open={openNav}>
            {navList}
      </MobileNav>
      </Navbar>
        </div>
    );
};

export default NavBar;