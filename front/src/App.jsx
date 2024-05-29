import { Route, Routes } from "react-router";
import Login from "./pages/Login";
import Protect from "./layouts/Protect";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Authorized from "./layouts/Authorized";
import User from "./pages/User";
import Signup from "./pages/Signup";
import Dashboard from "./layouts/Dashboard";
import { GetAllProgramme, GetProgramme } from "./pages/programme/Programme";

function App() {
  return (
    <>
      <Routes>
        <Route element={<Dashboard />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/programmes">
            <Route index element={<GetAllProgramme />} />
            <Route path=":programmeId" element={<GetProgramme />} />
          </Route>
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
