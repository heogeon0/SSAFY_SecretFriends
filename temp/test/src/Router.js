import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from "./router/Login";
import MyCanvas from "./router/MyCanvas";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}>
        </Route>
        <Route path="/main" element={<MyCanvas />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;