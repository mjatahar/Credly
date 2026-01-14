import { Link } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, Mail, Sparkles, User, Building2 } from "lucide-react";
import { useState } from "react";

export default function Demo() {
  const [userType, setUserType] = useState<"influencer" | "brand" | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock submission
    alert("Thank you! We'll be in touch soon.");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-6">
          <div className="max-w-xl mx-auto">
            {/* Header */}
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-6">
                <Sparkles className="w-4 h-4" />
                <span>Get Started</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Request a Demo
              </h1>
              <p className="text-muted-foreground">
                See how Credly can transform your influencer partnerships.
              </p>
            </div>

            {/* Form Card */}
            <div className="bg-card rounded-2xl p-8 border border-border/60 shadow-card">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* User Type Selection */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-3">
                    I am a...
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setUserType("influencer")}
                      className={`p-4 rounded-xl border text-left transition-all ${
                        userType === "influencer"
                          ? "border-accent bg-accent/5"
                          : "border-border/60 hover:border-border"
                      }`}
                    >
                      <User
                        className={`w-5 h-5 mb-2 ${
                          userType === "influencer" ? "text-accent" : "text-muted-foreground"
                        }`}
                      />
                      <p className="font-medium text-foreground">Creator</p>
                      <p className="text-xs text-muted-foreground">Influencer / Content creator</p>
                    </button>
                    <button
                      type="button"
                      onClick={() => setUserType("brand")}
                      className={`p-4 rounded-xl border text-left transition-all ${
                        userType === "brand"
                          ? "border-accent bg-accent/5"
                          : "border-border/60 hover:border-border"
                      }`}
                    >
                      <Building2
                        className={`w-5 h-5 mb-2 ${
                          userType === "brand" ? "text-accent" : "text-muted-foreground"
                        }`}
                      />
                      <p className="font-medium text-foreground">Brand</p>
                      <p className="text-xs text-muted-foreground">Company / Agency</p>
                    </button>
                  </div>
                </div>

                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-secondary border-0 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50"
                    placeholder="Your name"
                    required
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-secondary border-0 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50"
                    placeholder="you@example.com"
                    required
                  />
                </div>

                {/* Company (for brands) */}
                {userType === "brand" && (
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-foreground mb-2">
                      Company
                    </label>
                    <input
                      type="text"
                      id="company"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg bg-secondary border-0 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50"
                      placeholder="Your company name"
                    />
                  </div>
                )}

                <Button type="submit" variant="accent" size="lg" className="w-full">
                  Request Demo
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </form>

              <p className="text-xs text-muted-foreground text-center mt-6">
                By submitting, you agree to our{" "}
                <Link to="#" className="text-accent hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link to="#" className="text-accent hover:underline">
                  Privacy Policy
                </Link>
                .
              </p>
            </div>

            {/* Quick Access */}
            <div className="mt-8 text-center">
              <p className="text-muted-foreground mb-4">Already have an account?</p>
              <Button variant="outline" asChild>
                <Link to="/login">
                  <Mail className="w-4 h-4" />
                  Log in
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
