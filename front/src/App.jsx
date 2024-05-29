import { Route, Routes } from "react-router";
import Login from "./pages/Login";
import Protect from "./layouts/Protect";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Authorized from "./layouts/Authorized";
import User from "./pages/User";
import Signup from "./pages/Signup";
import Dashboard from "./layouts/Dashboard";
import { GetAllProgramme } from "./pages/programme/Programme";

function App() {
  return (
    <>
      <Routes>
        <Route element={<Dashboard />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/programmes" element={<GetAllProgramme />} />
          <Route path="/" element={<Protect />}>
            <Route index element={<Home />} />
            <Route
              path="admin"
              element={<Authorized allowedRoles={["admin"]} />}
            >
              <Route index element={<Admin />} />
            </Route>
            <Route path="user" element={<Authorized allowedRoles={["user"]} />}>
              <Route index element={<User />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
