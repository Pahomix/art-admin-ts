import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import ProtectedRoutes from "./routes/ProtectedRoutes.tsx";
import Auth from "./pages/Auth.tsx";
import Home from "./pages/Home.tsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Auth />} />

          <Route element={<ProtectedRoutes />} >
            <Route path="/" element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
