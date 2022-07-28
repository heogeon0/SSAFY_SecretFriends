import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./components/Home/NavBar";
// router
import SignUp from "./router/SignUp";
import Login from "./router/Login";
import Intro from "./router/Intro";
import Main from "./router/Main";
import CreateChildern from "./router/CreateChildern/Index";

function Router() {
  return (
    <div>
      <BrowserRouter>
        <NavBar />
        <Routes>
          {/* <Route path="/"></Route> */}
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/" element={<Intro />}></Route>
          <Route path="/main" element={<Main />}></Route>
          <Route path="/createChildern" element={<CreateChildern />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default Router;
