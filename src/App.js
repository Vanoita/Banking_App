import { BrowserRouter, Route, Routes} from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from "./components/Home.js";
import CreateAccount from "./components/CreateAccount.js";
import Login from "./components/Login.js";
import Register from "./components/Register.js";
import Transaction from "./components/Transaction.js";
import TransactionHistory from './components/TransactionHistory';
import { ChakraProvider} from '@chakra-ui/react';
import Dashboard from './components/Dashboard';
import ForgotPassword from './components/ForgotPassword';
import CreateNewPassword from './components/CreateNewPassword';
import ForgotUsername from './components/ForgotUsername';
import UserAdmin from './components/admin/UserAdmin';
import AdminDashboard from './components/admin/AdminDashboard';
import AddBeneficiary from './components/AddBeneficiary';
import LoginAdmin from './components/admin/LoginAdmin';
import AccountAdmin from './components/admin/AccountAdmin';
import TransactionAdmin from './components/admin/TransactionAdmin'
import Profile from './components/Profile';
import NotFound from './components/NotFound';
import CreateUser from './components/admin/CreateUser';


function App() {
  return (
    <ChakraProvider>
        <BrowserRouter>
          <Routes>
            <Route exact path = "/" element={<Home/>}/>
            <Route exact path = "/login" element={<Login/>}/>
            <Route exact path = "/register" element={<Register/>}/>
            <Route exact path = "/createaccount" element={<CreateAccount/>}/>
            <Route exact path = "/transaction" element={<Transaction/>}/>
            <Route exact path= "/transactionhistory" element={<TransactionHistory/>}/>
            <Route exact path= "/dashboard" element={<Dashboard/>}/>
            <Route exact path="/profile" element={<Profile/>}/>
            <Route exact path='/addBeneficiary' element={<AddBeneficiary/>}/>
            <Route exact path="/forgotPassword" element={<ForgotPassword/>} />
            <Route exact path="/forgotUsername" element={<ForgotUsername/>} />
            <Route exact path="/createNewPassword/:refId" element={<CreateNewPassword/>} />
            <Route exact path="/admin/dashboard" element={<AdminDashboard/>}/>
            <Route exact path="/admin/userAll" element={<UserAdmin/>}/>
            <Route exact path="/admin/accountAll" element={<AccountAdmin/>}/>
            <Route exact path="/admin/transactionAll" element={<TransactionAdmin/>}/>
            <Route exact path='/admin/login' element={<LoginAdmin/>}/>
            <Route exact path = '/admin/createUser' element={<CreateUser/>}/>
            <Route path="*" element={<NotFound/>}/>
          </Routes>
        </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;