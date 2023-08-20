import { BrowserRouter, Route, Routes} from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from "./components/Home.js";
import About from "./components/About.js";
import CreateAccount from "./components/CreateAccount.js";
import Login from "./components/Login.js";
import Register from "./components/Register.js";
import Transaction from "./components/Transaction.js";
import TransactionHistory from './components/TransactionHistory';
import { ChakraProvider, Container} from '@chakra-ui/react';
import Dashboard from './components/Dashboard';
import ForgotPassword from './components/ForgotPassword';
import CreateNewPassword from './components/CreateNewPassword';
import ForgotUsername from './components/ForgotUsername';


function App() {
  return (
    <ChakraProvider>
        <BrowserRouter>
          <Routes>
            <Route exact path = "/" element={<Home/>}/>
            <Route exact path = "/about" element={<About/>}/>
            <Route exact path = "/login" element={<Login/>}/>
            <Route exact path = "/register" element={<Register/>}/>
            <Route exact path = "/createaccount" element={<CreateAccount/>}/>
            <Route exact path = "/transaction" element={<Transaction/>}/>
            <Route exact path= "/transactionhistory" element={<TransactionHistory/>}/>
            <Route exact path= "/dashboard" element={<Dashboard/>}/>
            <Route exact path="/forgotPassword" element={<ForgotPassword/>} />
            <Route exact path="/forgotUsername" element={<ForgotUsername/>} />
            <Route exact path="/createNewPassword/:refId" element={<CreateNewPassword/>} />
          </Routes>
        </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;