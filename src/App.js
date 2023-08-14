import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from "./components/Home.js";
import About from "./components/About.js";
import CreateAccount from "./components/CreateAccount.js";
import Login from "./components/Login.js";
import Register from "./components/Register.js";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route exact path = "/" element={<Home/>}/>
      <Route exact path = "/about" element={<About/>}/>
      <Route exact path = "/login" element={<Login/>}/>
      <Route exact path = "/register" element={<Register/>}/>
      <Route exact path = "/createaccount" element={<CreateAccount/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
