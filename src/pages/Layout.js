import React from "react";
import SignupForm from "../../components/auth/SignupForm";
import {Outlet} from "react-router-dom";

const Layout = () => {
    return(
        <main className="flex items-center justify-center h-screen m-6">
              {/*<SignupForm/>*/}
            <Outlet />
        </main>
    );
};

export default Layout;