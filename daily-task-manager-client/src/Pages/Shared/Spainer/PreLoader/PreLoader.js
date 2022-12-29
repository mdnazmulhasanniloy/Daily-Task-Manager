import React from 'react';
import ScaleLoader from "react-spinners/ScaleLoader";



const PreLoader = () => {
    return (
        <div className='flex justify-center items-center h-screen'>
        <ScaleLoader color="#fff" />
        <h1 className="text-2xl text-white ml-5">
            Welcome To Daily Task Manager
        </h1>
        </div>
    );
};

export default PreLoader;