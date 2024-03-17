import SignupForm from "./components/auth/SignupForm";
import './App.css'
import LoginForm from "./components/auth/Login Form";
import {Routes, Route} from "react-router-dom";
import Layout from "./pages/Layout";
import Login from "./components/auth/Login Form";
import Unauthorized from "./pages/Unauthorized";
import RequireAuth from "./pages/RequireAuth";

function App() {
  return (
      // add routes
      <Routes>
          <Route path="/" element={<Layout/>}>

              <Route path="login" element={<Login />} />
              <Route path="signup" element={<SignupForm />} />
              <Route path="unauthorized" element={<Unauthorized />} />

              {/*todo*/}
              {/*authenticated            */}
              {/*<Route element={<RequireAuth authenticated= {true} />}>*/}
              {/*    <Route path="/" element={<Products />} />*/}
              {/*    <Route path="/" element={<Currencies />} />*/}
              {/*</Route>*/}

              {/*wild card*/}
              <Route path="*" element={<Unauthorized />} />
          </Route>
      </Routes>

  );
}

export default App;
