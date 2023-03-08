import './App.css';
import {BrowserRouter} from "react-router-dom";
import {Route, Routes} from "react-router";
import Login from "./ecommerce/login";
import Home from "./ecommerce/home";
import Cart from "./ecommerce/Cart";
import Register from "./ecommerce/register";
import Content from "./ecommerce/content";

function App() {
   return (
       <BrowserRouter>
           <div className="container">
               <Routes>
                   <Route index element={<Login/>}/>
                   <Route path={"/register"} element={<Register/>}/>
                   <Route path={"/store/*"} element={<Content/>}/>
               </Routes>
           </div>
       </BrowserRouter>
  );
}

export default App;
