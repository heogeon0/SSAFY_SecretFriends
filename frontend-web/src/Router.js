import { BrowserRouter, Route, Routes } from "react-router-dom";

// router
import SignUp from "./router/SignUp";
import Login from "./router/Login";
import Intro from "./router/Intro";

function Router() {
  <BrowserRouter>
    <Routes>
      {/* <Route path="/"></Route> */}
      <Route path="/signup" element={<SignUp/>}></Route>
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/intro" element={<Intro/>}></Route>
    </Routes>
  </BrowserRouter>
}

export default Router;