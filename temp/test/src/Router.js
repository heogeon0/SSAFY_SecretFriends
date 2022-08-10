import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from "./router/Login";
import Main from "./router/Main";
import MyCanvas from "./router/MyCanvas";
import Diary from "./router/Diary";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/main" element={<MyCanvas />}></Route>
        <Route path="/mains" element={<Main />}></Route>
        <Route path="/diary" element={<Diary />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
