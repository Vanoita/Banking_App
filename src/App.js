import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from "./components/Home.js";
import About from "./components/About.js";
import Register from "./components/Register.js";
import Login from "./components/Login.js";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route exact path = "/" element={<Home/>}/>
      <Route exact path = "/about" element={<About/>}/>
      <Route exact path = "/login" element={<Login/>}/>
      <Route exact path = "/register" element={<Register/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
