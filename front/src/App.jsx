import { Route, Routes } from "react-router";
import Login from "./pages/Login";
import Protect from "./layouts/Protect";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Authorized from "./layouts/Authorized";
import User from "./pages/User";
import Signup from "./pages/Signup";
import Dashboard from "./layouts/Dashboard";
import { AddProgramme, DeleteProgramme, GetAllProgramme, GetProgramme, UpdateProgramme } from "./pages/programme/Programme";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <>
      <Routes>
        <Route element={<Dashboard />}>
          <Route path="/login"  element={<Login />} />
          <Route path="/signup"  element={<Signup />} />
          <Route path="/programmes">
            <Route index element={<GetAllProgramme />} />
            <Route path=":programmeId" element={<GetProgramme />} />
          </Route>
          <Route path="/" element={<Protect />}>
            <Route index element={<Home />} />
            <Route path="programmes">
              <Route index element={<GetAllProgramme />} />
              <Route path="create" element={<AddProgramme />} />
              <Route path=":programmeId" element={<GetProgramme />} />
              <Route path=":programmeId/edit" element={<UpdateProgramme />} />
              <Route path=":programmeId/delete" element={<DeleteProgramme />} />
            </Route>
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
