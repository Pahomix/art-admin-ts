import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import ProtectedRoutes from "./routes/ProtectedRoutes.tsx";
import Auth from "./pages/Auth.tsx";
import Home from "./pages/Home.tsx";
import Users from "./pages/Users.tsx";
import Nav from "./components/nav/Nav.tsx";
import Edit from "./pages/AddEdit.tsx";
import Courses from "./pages/Courses.tsx";
import CourseModules from "./pages/CourseModules.tsx";
import ModuleMaterials from "./pages/ModuleMaterials.tsx";

function App() {
  return (
    <>
      <BrowserRouter>
      <Nav/>
        <Routes>
          <Route path="/login" element={<Auth />} />

          <Route element={<ProtectedRoutes />} >
            <Route path="/" element={<Home />} />
            <Route path="/users" element={<Users/>}/>
            <Route path="/courses" element={<Courses/>}/>
            <Route path="course_modules" element={<CourseModules/>}/>
            <Route path="materials" element={<ModuleMaterials/>}/>
            <Route path="/add/:modelType" element={<Edit />} />
            <Route path="/edit/:modelType/:id" element={<Edit />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
