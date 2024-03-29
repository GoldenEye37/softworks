import React from 'react';
import ReactDOM from 'react-dom/client';
import {
    createBrowserRouter, Navigate, redirect,
    RouterProvider
} from "react-router-dom";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Unauthorized from "./pages/Unauthorized";
import Login from "./components/auth/LoginForm";
import SignupForm from "./components/auth/SignupForm";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/products/Products";
import RequireAuth from "./pages/RequireAuth";
import {AuthProvider} from "./context/AuthProvider";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        errorElement: <Unauthorized/>,
    children: [
        {
            path: "login",
            element: <Login />,
        },
        {
        path: "signup",
        element: <SignupForm />,
        },
        {
        path: "home",
        element: <RequireAuth element={<Dashboard />} />,
        },
        {
            path: "products",
            element: <RequireAuth element={<Products />} />,
        },
    ],
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
        <React.StrictMode>
            <AuthProvider>
              <RouterProvider router={router} />
            </AuthProvider>
        </React.StrictMode>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
