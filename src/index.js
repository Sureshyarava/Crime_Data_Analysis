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
import Trend1 from './Pages/Trend1';
import Trend2 from './Pages/Trend2';
import Trend3 from './Pages/Trend3';
import Trend4 from './Pages/Trend4';
import Trend5 from './Pages/Trend5';
import Trend6 from './Pages/Trend6';
import Document from './Pages/Document';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/document",
    element: <Document />
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
    element: <Trend1 />
  },
  {
    path: "/trend2",
    element: <Trend2 />
  },
  {
    path: "/trend3",
    element: <Trend3 />
  },
  {
    path: "/trend4",
    element: <Trend4 />
  },
  {
    path: "/trend5",
    element: <Trend5 />
  },
  {
    path: "/trend6",
    element: <Trend6 />
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
reportWebVitals();
