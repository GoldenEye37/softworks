import React from "react";
import page from "../assets/page.svg";
import {useRouteError} from "react-router-dom";

export default function Unauthorized() {
  const error = useRouteError();
  console.error(error);

  return (
      <div className="mt-6 flex justify-center items-center max-h-screen">
          <div className="mt-6 pb-6 justify-center items-center bg-white h-screen text-gray-600 text-lg" id="error-page">
              <img src={page} alt="404 error page not found"/>
              <div className="flex flex-col mt-6 justify-center align-center items-center">
                  <h1 className="text-3xl">Oops!</h1>
                  <p>Sorry, an unexpected error has occurred.</p>
              </div>
              <p className="flex justify-center items-center mt-2 text-amber-500">
                  <i>{error.statusText || error.message}</i>
              </p>
          </div>
      </div>

  );
}