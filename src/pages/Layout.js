import React from "react";
import {Outlet} from "react-router-dom";
import LoginForm from "../components/auth/LoginForm";

const Layout = () => {
    return(
        <main className="flex items-center justify-center h-screen m-6">
            <Outlet />
        </main>
    );
};

export default Layout;