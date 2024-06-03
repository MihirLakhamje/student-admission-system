import { Route, Routes } from "react-router";
import Login from "./pages/Login";
import Protect from "./layouts/Protect";
import Home from "./pages/Home";
import Authorized from "./layouts/Authorized";
import Signup from "./pages/Signup";
import Dashboard from "./layouts/Dashboard";
import { AddProgramme, DeleteProgramme, GetAllProgramme, GetProgramme, UpdateProgramme } from "./pages/programme/Programme";
import NotFound from "./pages/NotFound";
import ViewAllApplications from "./pages/application/ViewAllApplication";
import CreateApplication from "./pages/application/CreateApplication";
import UploadDoc from "./pages/application/UploadDoc";
import MyApplication from "./pages/application/MyApplication";
import ViewApplication from "./pages/application/ViewApplication";
import About from "./pages/About";

function App() {
  return (
    <>
      <Routes>
        <Route element={<Dashboard />}>
          <Route path="/login"  element={<Login />} />
          <Route path="/signup"  element={<Signup />} />
          <Route path="/about" element={<About />} />
          <Route path="/programmes">
            <Route index element={<GetAllProgramme />} />
            <Route path=":programmeId" element={<GetProgramme />} />
          </Route>
          <Route path="/" element={<Protect />}>
            {/* Welcome page */}
            <Route index element={<Home />} />

            {/* Programme routes */}
            <Route path="programmes" element={<Authorized allowedRoles={"admin"} />}>
              <Route index element={<GetAllProgramme />} />
              <Route path="create" element={<AddProgramme />} />
              <Route path=":programmeId" element={<GetProgramme />} />
              <Route path=":programmeId/edit" element={<UpdateProgramme />} />
              <Route path=":programmeId/delete" element={<DeleteProgramme />} />
            </Route>

            {/* Application routes (user) */}
            <Route path="application" element={<Authorized allowedRoles={"user"} />}>
              <Route index element={<CreateApplication />} />
              <Route path="upload" element={<UploadDoc />} />
              <Route path="view" element={<MyApplication />} />
            </Route>

            {/* Application routes (admin) */}
            <Route path="applications" element={<Authorized allowedRoles={"admin"} />}>
              <Route index element={<ViewAllApplications />} />
              <Route path=":applicationId" element={<ViewApplication />} />
            </Route>

          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
