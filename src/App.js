import SignupForm from "./components/auth/SignupForm";
import './App.css'
import LoginForm from "./components/auth/Login Form";
import {Routes, Route} from "react-router-dom";
import Layout from "./pages/Layout";
import Login from "./components/auth/Login Form";
import Unauthorized from "./pages/Unauthorized";

function App() {
  return (
      // add routes
      <Routes>
          <Route path="/" element={<Layout/>}>

              <Route path="login" element={<Login />} />
              <Route path="signup" element={<SignupForm />} />
              <Route path="unauthorized" element={<Unauthorized />} />

              {/*authenticated            */}
              <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
                  <Route path="/" element={<Home />} />
              </Route>

              {/*wild card*/}
              <Route path="*" element={<NotFound />} />
          </Route>
      </Routes>

  );
}

export default App;
