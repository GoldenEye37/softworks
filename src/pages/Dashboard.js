import {useNavigate, Link, Outlet} from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthProvider";
import Navbar from "../components/common/Navbar";
import HeroSection from "../components/common/Hero";

const Dashboard = () => {
    const { setAuth } = useContext(AuthContext);
    const navigate = useNavigate();

    const logout = async () => {
        setAuth({});
        navigate('/login');
    }
    console.log(window.location);
    return (
        <div className="m-0 p-0 min-h-screen dark:bg-white dark:text-gray-500 min-w-full rounded-lg">
            <Navbar/>
            <HeroSection/>
            <Outlet/>
        </div>

    )
}

export default Dashboard;