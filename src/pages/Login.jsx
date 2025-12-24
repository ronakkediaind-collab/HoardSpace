import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/common/Navbar";
import Input from "../components/common/Input";
import Button from "../components/common/Button";
import { MapPin } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("agency");
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!email) newErrors.email = "Email is required";
    if (!password) newErrors.password = "Password is required";
    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }
    login(email, password, role);
    toast.success("Welcome back!");
    navigate(role === "vendor" ? "/dashboard/vendor" : "/dashboard/agency");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-12 px-4 flex items-center justify-center min-h-screen">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-xl gradient-primary flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-7 h-7 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-display font-bold">Welcome Back</h1>
            <p className="text-muted-foreground mt-1">
              Sign in to your HoardSpace account
            </p>
          </div>
          <form
            onSubmit={handleSubmit}
            className="bg-card border border-border rounded-2xl p-6 space-y-4"
          >
            <Input
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={errors.email}
              placeholder="you@example.com"
            />
            <Input
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={errors.password}
              placeholder="••••••••"
            />
            <div>
              <label className="block text-sm font-medium mb-2">Login as</label>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setRole("agency")}
                  className={`flex-1 py-2 rounded-lg border transition-all ${
                    role === "agency"
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-input"
                  }`}
                >
                  Ad Agency
                </button>
                <button
                  type="button"
                  onClick={() => setRole("vendor")}
                  className={`flex-1 py-2 rounded-lg border transition-all ${
                    role === "vendor"
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-input"
                  }`}
                >
                  Vendor
                </button>
              </div>
            </div>
            <Button type="submit" className="w-full">
              Sign In
            </Button>
            <p className="text-center text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link to="/signup" className="text-primary hover:underline">
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
