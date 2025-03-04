import { BrowserRouter as Router,Routes,Route} from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import CrmDashboard from "./pages/CrmDashboard"
import HrmDashboard from "./pages/HrmDashboard"
import Return from "./pages/ReturnProduct"
import Company from "./pages/Supplier"
import Task from "./pages/Task"
import Leads from "./pages/Leads"
import Customer from "./pages/purchaseditems"
import AddEmployee from "./pages/AddEmployee"
import AddPartner from "./pages/AddPartner"
import AddAdmin from "./pages/AddAdmin"
import AllEmployee from "./pages/AllEmployee"
import AllAdmin from "./pages/AllAdmin"
import Attendance from "./pages/Attendance"
import AllCustomer from "./pages/AllCustomer"
import AddNewProduct from "./pages/AddNewProduct"
import AddSales from "./pages/AddSales"
import AddPurchase from "./pages/AddPurchase"
import AllProduct from "./pages/AllProduct"
import AllSales from "./pages/AllSales"
import AllPurchase from "./pages/AllPurchase"
import Category from "./pages/Category"
import Order from "./pages/Order"
import Chat from "./pages/Chat"
import Email from "./pages/Email"
import Calendar from "./pages/Calendar"
import Invoices from "./pages/Invoices"
import Contacts from "./pages/Contacts"
import Login from "./pages/Login"
import Login2 from "./pages/Login2"
import Registration from "./pages/Registration"
import Registration2 from "./pages/Registration2"
import ResetPassword from "./pages/ResetPassword"
import UpdatePassword from "./pages/UpdatePassword"
import LoginStatus from "./pages/LoginStatus"
import Profile from "./pages/Profile"
import EditProfile from "./pages/EditProfile"
// import Utility from "./pages/Utility"
import SweetAlert from "./pages/SweetAlert"
import NestableList from "./pages/NestableList"
import Animation from "./pages/Animation"
import SwiperSlider from "./pages/SwiperSlider"
import Form from "./pages/Form"
import Table from "./pages/Table"
import Charts from "./pages/Charts"
import Icon from "./pages/Icon"
import Map from "./pages/Map"
import FileManager from "./pages/FileManager"
import Layout from "./components/layout/Layout"
import PublicLayout from "./components/layout/PublicLayout"
import Login3 from "./pages/Login3"
import Error400 from "./pages/Error400"
import Error403 from "./pages/Error403"
import Error404 from "./pages/Error404"
import Error408 from "./pages/Error408"
import Error500 from "./pages/Error500"
import Error503 from "./pages/Error503"
import Error504 from "./pages/Error504"
import ComingSoon from "./pages/ComingSoon"
import ComingSoon2 from "./pages/ComingSoon2"
import PricingTable2 from "./pages/PricingTable2"
import UnderConstruction from "./pages/UnderConstruction"
import StockList from "./pages/Stocklist"
import Salesorders from "./pages/salesorders"
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import ProtectedRoute from '../src/protectedroute/ProtectedRoute';


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!Cookies.get('access_token'));

  useEffect(() => {
    // Check if user is authenticated
    const checkAuth = () => {
      const hasToken = !!Cookies.get('access_token');
      setIsAuthenticated(hasToken);
    };
    
    checkAuth();
    window.addEventListener('storage', checkAuth);
    window.addEventListener('auth-change', checkAuth);
    return () => {
      window.removeEventListener('storage', checkAuth);
      window.removeEventListener('auth-change', checkAuth);
    };
  }, []);

  return (
    <Router>
      <Routes>
          <Route element={<PublicLayout />}>
              <Route path="/registration" element={<Registration />} />
              <Route path="/" element={<Login2 setIsAuthenticated={setIsAuthenticated} />} />
          </Route>        
          <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<CrmDashboard />} />
            <Route path="/allProduct" element={<AllProduct />} />
            <Route path="/category" element={<Category />} />
            <Route path="/addNewProduct" element={<AddNewProduct />} />
            <Route path="/purchaseditem" element={<Customer />} />

            <Route path="/allSales" element={<AllSales />} />
            <Route path="/addSales" element={<AddSales />} />

            <Route path="/allpurchase" element={<AllPurchase />} />
            <Route path="/addPurchase" element={<AddPurchase />} />

            <Route path="/allCustomer" element={<AllCustomer />} />
            <Route path="/supplier" element={<Company />} />

            <Route path="/addEmployee" element={<AddEmployee />} />
            <Route path="/allEmployee" element={<AllEmployee />} />

            <Route path="/addPartner" element={<AddPartner />} />

            <Route path="/addAdmin" element={<AddAdmin />} />
            <Route path="/allAdmin" element={<AllAdmin />} />

            <Route path="/invoice/:id" element={<Invoices />} />
            <Route path="/profile" element={<Profile/>}/>
            {/* <Route path="/editProfile" element={<EditProfile/>}/> */}
          </Route>
        </Route>        
      </Routes>
    </Router>
  );
}
export default App;










{/* 
          <Route path="/stocklist" element={<StockList/>}/>
          <Route path="/salesorders" element={<Salesorders/>}/>
          <Route path="/fileManager" element={<FileManager/>}/>
          <Route path="/hrmDashboard" element={<HrmDashboard/>}/>
          <Route path="/returnproduct" element={<Return/>}/>
         
          <Route path="/task" element={<Task/>}/>
          <Route path="/leads" element={<Leads/>}/>
          <Route path="/attendance" element={<Attendance/>}/>
         
          <Route path="/customerorders" element={<Order/>}/>
          <Route path="/chat" element={<Chat/>}/>
          <Route path="/calendar" element={<Calendar/>}/>
          <Route path="/email" element={<Email/>}/>
          <Route path="/contacts" element={<Contacts/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/editProfile" element={<EditProfile/>}/>
          <Route path="/sweetAlert" element={<SweetAlert/>}/>
          <Route path="/nestableList" element={<NestableList/>}/>
          <Route path="/animation" element={<Animation/>}/>
          <Route path="/swiperSlider" element={<SwiperSlider/>}/>
          <Route path="/form" element={<Form/>}/>
          <Route path="/table" element={<Table/>}/>
          <Route path="/charts" element={<Charts/>}/>
          <Route path="/icon" element={<Icon/>}/>
          <Route path="/map" element={<Map/>}/> */}

          
  
        {/* <Route path="/login" element={<Login/>}/>
        <Route path="/login3" element={<Login3/>}/>   
        <Route path="/resetPassword" element={<ResetPassword/>}/>
        <Route path="/updatePassword" element={<UpdatePassword/>}/>
        <Route path="/loginStatus" element={<LoginStatus/>}/>
        <Route path="/error400" element={<Error400/>}/>
        <Route path="/error403" element={<Error403/>}/>
        <Route path="/error404" element={<Error404/>}/>
        <Route path="/error408" element={<Error408/>}/>
        <Route path="/error500" element={<Error500/>}/>
        <Route path="/error503" element={<Error503/>}/>
        <Route path="/error504" element={<Error504/>}/>
        <Route path="/comingSoon" element={<ComingSoon/>}/>
        <Route path="/comingSoon2" element={<ComingSoon2/>}/>
       
        <Route path="/pricingTable2" element={<PricingTable2/>}/>
        <Route path="/underConstruction" element={<UnderConstruction/>}/> */}


 
