import './App.css'
import {Routes, Route, Navigate, Outlet, redirect} from "react-router-dom";
import React from "react";
import RequireAuth from "./pages/RequireAuth";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/products/Products";


function App() {
  return (

      <main className="flex items-center justify-center h-screen m-6">
          <Routes>
              <Route path="/" element={<Navigate to="/login" />} />
              {/*<Route element={<RequireAuth />}>*/}
              {/*  <Route element={<Dashboard/>} path="/home" exact/>*/}
              {/*  <Route element={<Products/>} path="/products"/>*/}
              {/*</Route>*/}
          </Routes>
          <Outlet/>
      </main>
  );
}

export default App;
