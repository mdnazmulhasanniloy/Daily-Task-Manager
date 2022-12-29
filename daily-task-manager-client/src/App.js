import logo from './logo.svg';
import './App.css';
import { RouterProvider } from 'react-router-dom';
import { Router } from './Router/Router';
import { Toaster } from 'react-hot-toast';
import { useEffect, useState } from 'react';
import PreLoader from './Pages/Shared/Spainer/PreLoader/PreLoader';
import AOS from 'aos';



function App() {
  const [loading, setLoading] = useState(false);
  useEffect(()=>{
    setLoading(true);
    setTimeout(()=>{
      setLoading(false);

    }, 2000)
  },[])
  AOS.init();
  return (
    <>
    {
      loading ? 
      <PreLoader />
      : <div>
      <RouterProvider router={Router}></RouterProvider>
      <Toaster />
      </div>
    }
    </>
  );
}

export default App;
