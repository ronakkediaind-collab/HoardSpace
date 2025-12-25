import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/common/Navbar";
import Input from "../components/common/Input";
import Button from "../components/common/Button";

export default function SignupForm() {
  const { role } = useParams();
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    companyName: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setForm((p) => ({ ...p, [field]: value }));
    setErrors((p) => ({ ...p, [field]: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!form.name) newErrors.name = "Name is required";
    if (!form.email) newErrors.email = "Email is required";
    if (!form.password) newErrors.password = "Password is required";
    if (form.password !== form.confirmPassword)
      newErrors.confirmPassword = "Passwords don't match";
    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }
    signup({ ...form, role });
    toast.success("Account created successfully!");
    navigate(role === "vendor" ? "/dashboard/vendor" : "/dashboard/agency");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-12 px-4 flex items-center justify-center">
        <div className="w-full max-w-md">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-display font-bold">
              Create {role === "vendor" ? "Vendor" : "Agency"} Account
            </h1>
            <p className="text-muted-foreground mt-1">
              Fill in your details to get started
            </p>
          </div>
          <form
            onSubmit={handleSubmit}
            className="bg-card border border-border rounded-2xl p-6 space-y-4"
          >
            <Input
              label="Full Name"
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
              error={errors.name}
            />
            <Input
              label="Email"
              type="email"
              value={form.email}
              onChange={(e) => handleChange("email", e.target.value)}
              error={errors.email}
            />
            <Input
              label="Phone"
              value={form.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
            />
            <Input
              label={role === "vendor" ? "Company Name" : "Agency Name"}
              value={form.companyName}
              onChange={(e) => handleChange("companyName", e.target.value)}
            />
            <Input
              label="Password"
              type="password"
              value={form.password}
              onChange={(e) => handleChange("password", e.target.value)}
              error={errors.password}
            />
            <Input
              label="Confirm Password"
              type="password"
              value={form.confirmPassword}
              onChange={(e) => handleChange("confirmPassword", e.target.value)}
              error={errors.confirmPassword}
            />
            <Button type="submit" className="w-full">
              Create Account
            </Button>
            <p className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link to="/login" className="text-primary hover:underline">
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
