import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import NavBar from "./components/Home/NavBar";
import Footer from "./components/Home/Footer";
// router
import SignUp from "./router/SignUp";
import Login from "./router/Login";
import Intro from "./router/Intro";
import Main from "./router/Main";
import CreateChildren from "./router/CreateChildren/Index";
import NotFound404 from "./router/NotFound";
import Logout from "./router/Logout";
import SignOut from "./router/SignOut"; //회원탈퇴
import MemberUpdate from "./router/MemberUpdate";

import PublicRoute from "./components/PublicRoute";
import PrivateRoute from "./components/PrivateRoute";

function Router() {
  const access = !!localStorage.getItem("token");

  return (
    <div>
      <BrowserRouter>
        <NavBar />
        <Routes>
          {/* 로그인하지 않은 상태만 들어갈 수 있는 페이지 */}
          {/* 회원가입, 로그인 */}
          <Route path="/signup" element={<PublicRoute authenticated={access} component={<SignUp />} />}></Route>
          <Route path="/login" element={<PublicRoute authenticated={access} component={<Login />} />}></Route>
          {/* 로그인 필요한 페이지 */}
          {/* main, 아이 정보 등록 */}
          <Route path="/main" element={<PrivateRoute authenticated={access} component={<Main />} />}></Route>
          <Route path="/CreateChildren" element={<PrivateRoute authenticated={access} component={<CreateChildren />} />}></Route>
          <Route path="/logout" element={<PrivateRoute authenticated={access} component={<Logout />} />}></Route>
          <Route path="/updateMember" element={<PrivateRoute authenticated={access} component={<MemberUpdate />} />}></Route>
          <Route path="/signout" element={<PrivateRoute authenticated={access} component={<SignOut />} />}></Route>
          {/* 항상 접근 가능 */}
          <Route path="/" element={<Intro />}></Route>
          <Route path="*" element={<NotFound404 />}></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default Router;
