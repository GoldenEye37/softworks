import './App.css'
import {Routes, Route, Navigate, Outlet, redirect} from "react-router-dom";
import React from "react";


function App() {
  return (

      <main className="flex items-center justify-center h-screen m-6">
          <Routes>
              <Route path="/" element={<Navigate to="/login" />} />
              {/*<Route path="/products" element={<Navigate to="/login" />} />*/}
          </Routes>
          <Outlet/>
      </main>
  );
}

export default App;
