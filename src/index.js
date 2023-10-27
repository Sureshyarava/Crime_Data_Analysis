import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from './Pages/Home';
import Login from './Pages/Login';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import Dashboard from './Pages/Dashboard';
import Trend from './Pages/Trend';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/dashboard",
    element: <Dashboard />
  },
  {
    path: "/trend1",
    element: <Trend />
  },
  {
    path: "/trend2",
    element: <Trend />
  },
  {
    path: "/trend3",
    element: <Trend />
  },
  {
    path: "/trend4",
    element: <Trend />
  },
  {
    path: "/trend5",
    element: <Trend />
  },
  {
    path: "/trend6",
    element: <Trend />
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
reportWebVitals();
