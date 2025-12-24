import { Link } from "react-router-dom";
import {
  MapPin,
  Mail,
  Phone,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-lg gradient-primary flex items-center justify-center">
                <MapPin className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-display font-bold text-gradient">
                HoardSpace
              </span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              India's premier outdoor advertising marketplace. Connect with
              premium hoarding spaces across the nation.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="#"
                className="p-2 rounded-lg bg-secondary hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="p-2 rounded-lg bg-secondary hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="p-2 rounded-lg bg-secondary hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="p-2 rounded-lg bg-secondary hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/search"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  Browse Hoardings
                </Link>
              </li>
              <li>
                <Link
                  to="/signup"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  List Your Hoarding
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  Pricing
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  How It Works
                </a>
              </li>
            </ul>
          </div>

          {/* Cities */}
          <div>
            <h4 className="font-display font-semibold mb-4">Popular Cities</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/search?city=mumbai"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  Mumbai
                </Link>
              </li>
              <li>
                <Link
                  to="/search?city=delhi"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  Delhi
                </Link>
              </li>
              <li>
                <Link
                  to="/search?city=bangalore"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  Bangalore
                </Link>
              </li>
              <li>
                <Link
                  to="/search?city=chennai"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  Chennai
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-muted-foreground text-sm">
                <Mail className="w-4 h-4 text-primary" />
                hello@hoardspace.in
              </li>
              <li className="flex items-center gap-2 text-muted-foreground text-sm">
                <Phone className="w-4 h-4 text-primary" />
                +91 98765 43210
              </li>
              <li className="flex items-start gap-2 text-muted-foreground text-sm">
                <MapPin className="w-4 h-4 text-primary mt-0.5" />
                <span>123 Business Hub, Andheri East, Mumbai 400069</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">
            © 2024 HoardSpace. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="#"
              className="text-muted-foreground hover:text-primary transition-colors text-sm"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-primary transition-colors text-sm"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
