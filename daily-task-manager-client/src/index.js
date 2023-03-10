import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider } from "@material-tailwind/react";
import Context from './Context/Context';
import { QueryClient, QueryClientProvider, } from '@tanstack/react-query';




const root = ReactDOM.createRoot(document.getElementById('root'));
const queryClient = new QueryClient()
root.render(
  <QueryClientProvider client={queryClient}>
  <React.StrictMode>
  <Context>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </Context>
  </React.StrictMode>
  </QueryClientProvider>
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
