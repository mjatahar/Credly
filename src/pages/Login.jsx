import { Link, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Mail, Lock, UserCog } from "lucide-react";
import { useEffect, useState } from "react";
import { getCurrentUser, setCurrentUser } from "@/lib/appState";
import { toast } from "sonner";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "brand",
  });

  useEffect(() => {
    const existing = getCurrentUser();
    if (existing?.role) {
      navigate(existing.role === "brand" ? "/brands" : "/influencers", { replace: true });
    }
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setCurrentUser({
      email: formData.email,
      role: formData.role,
      loggedInAt: new Date().toISOString(),
    });
    toast.success(`Logged in as ${formData.role}.`);
    navigate(formData.role === "brand" ? "/brands" : "/influencers");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-6">
          <div className="max-w-md mx-auto">
            <div className="text-center mb-10">
              <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center mx-auto mb-6">
                <Sparkles className="w-6 h-6 text-accent-foreground" />
              </div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Welcome back</h1>
              <p className="text-muted-foreground">Log in to access your Credly dashboard.</p>
            </div>

            <div className="bg-card rounded-2xl p-8 border border-border/60 shadow-card">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 rounded-lg bg-secondary border-0 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50"
                      placeholder="you@example.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label htmlFor="password" className="block text-sm font-medium text-foreground">Password</label>
                    <Link to="#" className="text-xs text-accent hover:underline">Forgot password?</Link>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      type="password"
                      id="password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 rounded-lg bg-secondary border-0 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50"
                      placeholder="********"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="role" className="block text-sm font-medium text-foreground mb-2">Login as</label>
                  <div className="relative">
                    <UserCog className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <select
                      id="role"
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 rounded-lg bg-secondary border-0 text-foreground focus:outline-none focus:ring-2 focus:ring-accent/50"
                    >
                      <option value="brand">Brand</option>
                      <option value="influencer">Influencer</option>
                    </select>
                  </div>
                </div>

                <Button type="submit" variant="accent" size="lg" className="w-full">
                  Log in
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </form>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="bg-card px-3 text-muted-foreground">or</span>
                </div>
              </div>

              <Button variant="outline" className="w-full" disabled>
                Continue with Google
              </Button>
            </div>

            <p className="text-center text-muted-foreground mt-6">
              Don't have an account?{" "}
              <Link to="/demo" className="text-accent hover:underline font-medium">Request a demo</Link>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
