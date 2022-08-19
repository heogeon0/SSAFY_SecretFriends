import { BrowserRouter } from "react-router-dom";
import NavBar from "./components/Home/NavBar";
import Footer from "./components/Home/Footer";

import AnimationRouter from "./AnimationRouter";


function Router() {
  return (
    <div>
      <BrowserRouter>
        <NavBar />
        <AnimationRouter />
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default Router;
