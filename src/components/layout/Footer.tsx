import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";

const footerLinks = {
  Product: [
    { label: "For Influencers", href: "/influencers" },
    { label: "For Brands", href: "/brands" },
    { label: "Pricing", href: "/pricing" },
    { label: "Demo", href: "/demo" },
  ],
  Resources: [
    { label: "Documentation", href: "#" },
    { label: "Trust Score Guide", href: "#" },
    { label: "Case Studies", href: "#" },
    { label: "Blog", href: "#" },
  ],
  Company: [
    { label: "About", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Contact", href: "#" },
    { label: "Privacy", href: "#" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-16">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-accent-foreground" />
              </div>
              <span className="text-lg font-semibold">TrustPulse</span>
            </Link>
            <p className="text-sm text-primary-foreground/70 leading-relaxed">
              Decision intelligence for influencer marketing. Make smarter partnerships based on trust, not vanity metrics.
            </p>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-sm font-semibold mb-4 text-primary-foreground/90">{category}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-primary-foreground/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-primary-foreground/50">
            <p>© 2024 TrustPulse. All rights reserved.</p>
            <div className="flex gap-6">
              <Link to="#" className="hover:text-primary-foreground transition-colors">Terms</Link>
              <Link to="#" className="hover:text-primary-foreground transition-colors">Privacy</Link>
              <Link to="#" className="hover:text-primary-foreground transition-colors">Cookies</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
