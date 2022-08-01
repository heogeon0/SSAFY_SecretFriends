import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import NavBar from "./components/Home/NavBar";
import Footer from "./components/Home/Footer";
// router
import SignUp from "./router/SignUp";
import Login from "./router/Login";
import Intro from "./router/Intro";
import Main from "./router/Main";
import CreateChildern from "./router/CreateChildern/index";
import NotFound404 from "./router/NotFound";

function Router() {
  return (
    <div>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/" element={<Intro />}></Route>
          <Route path="/main" element={<Main />}></Route>
          <Route path="/createChildren" element={<CreateChildern />}></Route>
          <Route path="*" element={<NotFound404/>}></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default Router;
