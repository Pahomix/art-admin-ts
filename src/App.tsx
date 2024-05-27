import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import ProtectedRoutes from "./routes/ProtectedRoutes.tsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Auth />} />

          <Route element={<ProtectedRoutes />} >

          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
