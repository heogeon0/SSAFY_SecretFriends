import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";

import Login from "./router/Login";
import Main from "./router/Main";
import MyCanvas from "./router/MyCanvas";
import Diary from "./router/Diary";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import AnimationRoute from "./components/AnimationRoute";

function Router() {
  return (
    <TransitionGroup component={null}>
      <CSSTransition classNames="fade" timeout={300}>
        <BrowserRouter>
          <AnimationRoute />
        </BrowserRouter>
      </CSSTransition>
    </TransitionGroup>
  );
}

export default Router;
