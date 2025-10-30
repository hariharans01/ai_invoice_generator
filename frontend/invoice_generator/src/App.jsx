import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import LandingPage from "./pages/LandingPage/LandingPage";
import SignUp from "./pages/Auth/SignUp";
import Login from "./pages/Auth/Login";
import Dashboard from "./pages/Dashboard/dashboard";
import Allinvoice from "./pages/Allinvoice/allinvoice";
import Createinvoice from "./pages/Allinvoice/createinvoice";
import InvoiceDetails from "./pages/Allinvoice/invoiceDetails";
import Profilepage from "./pages/profile/profilepage";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { AuthProvider } from "./context/AuthContex";

const App = () => {
  return (
    <AuthProvider> 
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />

          {/*Protected pages*/}
          <Route path="/" element={<ProtectedRoute />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="invoices" element={<Allinvoice />} />
            <Route path="invoices/new" element={<Createinvoice />} />
            <Route path="invoices/:id" element={<InvoiceDetails/>} />
            <Route path="profile" element={<Profilepage />} />
          </Route>
            
            

          {/* Catch all route */}
          <Route path="*" element={<Navigate to="/" replace/>} />
        </Routes>
      </Router>

      <Toaster
        toastOptions={{
          className: "",
          style: {
            fontSize:"13px",
          },
        }}
      />  
    </AuthProvider>
  )
}

export default App