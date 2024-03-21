import { useEffect} from "react";
import useAuth from "./useAuth";
import {axiosAuthenticated} from "../api/axios";

const useAxiosAuthenticated = () => {
    const {auth} = useAuth();

    useEffect(() => {
        console.log("request intercepted");
        const requestInterceptor = axiosAuthenticated.interceptors.request.use(
            config => {
                if (!config.headers['Authorization']){
                    config.headers['Authorization'] = `Bearer ${auth?.accessToken}`;
                }
                return config
            }, (error) => Promise.reject(error)
        );

        return () => {
            axiosAuthenticated.interceptors.request.eject(requestInterceptor);
        }
    }, [auth]);
    return axiosAuthenticated;
}

export default useAxiosAuthenticated;