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
import AllExpenses from "./pages/AllExpenses"
import AddExpenses from "./pages/AddExpenses"
import AllPurchase from "./pages/AllPurchase"
import Category from "./pages/Category"
import Invoices from "./pages/Invoices"
import Login from "./pages/Login"
import Login2 from "./pages/Login2"
import Registration from "./pages/Registration"
import Profile from "./pages/Profile"
import Layout from "./components/layout/Layout"
import PublicLayout from "./components/layout/PublicLayout"
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

            <Route path="/allExpenses" element={<AllExpenses />} />
            <Route path="/addExpenses" element={<AddExpenses />} />

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
          </Route>
        </Route>        
      </Routes>
    </Router>
  );
}
export default App;