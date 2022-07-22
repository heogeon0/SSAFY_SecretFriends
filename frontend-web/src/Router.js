import { BrowserRouter, Route, Routes } from "react-router-dom";

// router
import SignUp from "./router/SignUp";
import Login from "./router/Login";
import Intro from "./router/Intro";

function Router() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* <Route path="/"></Route> */}
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/" element={<Intro />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default Router;
