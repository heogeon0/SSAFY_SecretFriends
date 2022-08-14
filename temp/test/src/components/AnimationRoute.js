import { Route, Routes, useLocation } from "react-router-dom";
import Diary from "../router/Diary";
import Login from "../router/Login";
import Main from "../router/Main";
import MyCanvas from "../router/MyCanvas";

function AnimationRoute() {
  const location = useLocation();
  return (
    <Routes>
      <Route path="/" element={<Login />}></Route>
      <Route path="/mains" element={<Main />}></Route>
      <Route path="/diary" element={<Diary />}></Route>
    </Routes>
  );
}

export default AnimationRoute;
