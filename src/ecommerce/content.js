import {Route, Routes} from "react-router";
import Navi from "./navigation";
import Home from "./home";
import Cart from "./Cart";
import Detail from "./detail";

const Content = () => {
    return (
        <div>
            <Navi/>
            <Routes>
                <Route path={"/home"} element={<Home/>}/>
                <Route path={"/cart"} element={<Cart/>}/>
                <Route path={"/product/:a"} element={<Detail/>}/>
            </Routes>
        </div>
    );
}
export default Content;