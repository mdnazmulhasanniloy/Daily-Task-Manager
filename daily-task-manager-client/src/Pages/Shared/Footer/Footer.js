import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        
<footer className=" mt-24 p-4 bg-primary-200 rounded-lg shadow md:px-6 md:py-8">
<div className="sm:flex sm:items-center sm:justify-between">
    <a href="https://flowbite.com/" className="flex items-center mb-4 sm:mb-0">
        <img src="Logo.png" className="mr-3 h-8" alt="Flowbite Logo" />
        <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">Daily Task Manager</span>
    </a>
    <ul className="flex flex-wrap items-center mb-6 text-sm text-white sm:mb-0 dark:text-gray-400">
        <li>
            <Link className="mr-4 hover:underline md:mr-6 " to='addTask'>Add Task</Link>
        </li>
        <li>
        <Link className="mr-4 hover:underline md:mr-6 " to='myTask'>My Task</Link>
        </li>
        <li>
        <Link className="mr-4 hover:underline md:mr-6 " to='completedTasks'>Completed Tasks</Link>
        </li>
    </ul>
</div>
<hr className="my-6 border-white sm:mx-auto dark:border-gray-700 lg:my-8" />
<span className="block text-sm text-white sm:text-center dark:text-gray-400">© 2022 <a href="#" className="hover:underline">MD Nazmul Hasan</a>. All Rights Reserved.
</span>
</footer>

    );
};

export default Footer;