import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import ProtectedRoutes from "./routes/ProtectedRoutes.tsx";
import Auth from "./pages/Auth.tsx";
import Home from "./pages/Home.tsx";
import Users from "./pages/Users.tsx";
import Nav from "./components/nav/Nav.tsx";
import Edit from "./pages/AddEdit.tsx";

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
            <Route path="/add/:modelType" element={<Edit />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
