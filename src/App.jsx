import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
import Home from "./pages/Home";
import SearchResults from "./pages/SearchResults";
import HoardingDetails from "./pages/HoardingDetails";
import Login from "./pages/Login";
import SignupRoleSelect from "./pages/SignupRoleSelect";
import SignupForm from "./pages/SignupForm";
import VendorDashboard from "./pages/VendorDashboard";
import AgencyDashboard from "./pages/AgencyDashboard";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/hoarding/:id" element={<HoardingDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignupRoleSelect />} />
            <Route path="/signup/:role" element={<SignupForm />} />
            <Route path="/dashboard/vendor" element={<VendorDashboard />} />
            <Route path="/dashboard/agency" element={<AgencyDashboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        <ToastContainer position="bottom-right" theme="colored" />
      </AuthProvider>
    </ThemeProvider>
  );
}
