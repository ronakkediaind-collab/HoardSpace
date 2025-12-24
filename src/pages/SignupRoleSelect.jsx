import { Link } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Card from "../components/common/Card";
import { Building2, Megaphone } from "lucide-react";

export default function SignupRoleSelect() {
  const roles = [
    {
      id: "vendor",
      title: "I'm a Vendor",
      desc: "List your hoardings and manage bookings",
      icon: Building2,
      color: "primary",
    },
    {
      id: "agency",
      title: "I'm an Ad Agency",
      desc: "Find and book premium advertising spaces",
      icon: Megaphone,
      color: "accent",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-12 px-4 flex items-center justify-center min-h-screen">
        <div className="w-full max-w-2xl text-center">
          <h1 className="text-3xl font-display font-bold mb-2">
            Join HoardSpace
          </h1>
          <p className="text-muted-foreground mb-8">
            Choose how you want to use our platform
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {roles.map((role) => (
              <Link key={role.id} to={`/signup/${role.id}`}>
                <Card hover className="p-8 text-center h-full">
                  <div
                    className={`w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-4`}
                  >
                    <role.icon className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <h2 className="text-xl font-display font-semibold mb-2">
                    {role.title}
                  </h2>
                  <p className="text-muted-foreground text-sm">{role.desc}</p>
                </Card>
              </Link>
            ))}
          </div>
          <p className="mt-6 text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="text-primary hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
