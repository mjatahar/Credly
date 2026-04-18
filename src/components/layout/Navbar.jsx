import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Bell, LogOut, Menu, Moon, Sparkles, Sun, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import {
  getCurrentUser,
  getNotifications,
  getThemePreference,
  logout,
  markAllNotificationsRead,
  setThemePreference,
} from "@/lib/appState";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const publicNavItems = [
  { label: "For Influencers", href: "/influencers" },
  { label: "For Brands", href: "/brands" },
  { label: "Pricing", href: "/pricing" },
];

const brandNavItems = [
  { label: "Dashboard", href: "/brands" },
  { label: "Discover", href: "/brands/discover" },
  { label: "Brief Builder", href: "/brands/brief-builder" },
  { label: "Pricing", href: "/pricing" },
];

const influencerNavItems = [
  { label: "Dashboard", href: "/influencers" },
  { label: "Campaigns", href: "/influencers/campaigns" },
  { label: "Insights", href: "/influencers/insights" },
  { label: "Pricing", href: "/pricing" },
];

export function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(() => getCurrentUser());
  const [theme, setTheme] = useState(() => getThemePreference());
  const [notifications, setNotifications] = useState(() => getNotifications());

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    setThemePreference(theme);
  }, [theme]);

  useEffect(() => {
    const sync = () => {
      setUser(getCurrentUser());
      setNotifications(getNotifications());
    };
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);

  const unread = notifications.filter((item) => !item.read).length;
  const navItems = useMemo(() => {
    if (user?.role === "brand") return brandNavItems;
    if (user?.role === "influencer") return influencerNavItems;
    return publicNavItems;
  }, [user]);

  const handleLogout = () => {
    logout();
    setUser(null);
    navigate("/");
  };

  const markRead = () => {
    const next = markAllNotificationsRead();
    setNotifications(next);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/40">
      <nav className="container mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-accent-foreground" />
          </div>
          <span className="text-lg font-semibold text-foreground">Credly</span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "px-4 py-2 text-sm font-medium rounded-lg transition-colors",
                location.pathname === item.href || location.pathname.startsWith(`${item.href}/`)
                  ? "text-foreground bg-secondary"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/50",
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme((prev) => (prev === "dark" ? "light" : "dark"))}
            title="Toggle theme"
          >
            {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </Button>

          {user ? (
            <>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <Bell className="w-4 h-4" />
                    {unread > 0 && (
                      <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-accent text-[10px] text-accent-foreground flex items-center justify-center">
                        {unread}
                      </span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="end" className="w-80">
                  <div className="flex items-center justify-between mb-3">
                    <p className="font-semibold">Notifications</p>
                    <button onClick={markRead} className="text-xs text-accent hover:underline">Mark all read</button>
                  </div>
                  <div className="space-y-2 max-h-72 overflow-auto">
                    {notifications.length === 0 ? (
                      <p className="text-sm text-muted-foreground">No notifications.</p>
                    ) : (
                      notifications.map((item) => (
                        <div key={item.id} className="rounded-lg border border-border/50 p-3 bg-secondary/40">
                          <div className="flex items-center justify-between gap-2">
                            <p className="text-sm font-medium">{item.title}</p>
                            {!item.read && <span className="w-2 h-2 rounded-full bg-accent" />}
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">{item.description}</p>
                          <p className="text-[11px] text-muted-foreground mt-2">{item.timestamp}</p>
                        </div>
                      ))
                    )}
                  </div>
                </PopoverContent>
              </Popover>

              <span className="px-2 py-1 rounded-full text-xs bg-secondary capitalize">{user.role}</span>
              <Button variant="outline" onClick={handleLogout}>
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" asChild>
                <Link to="/login">Log in</Link>
              </Button>
              <Button variant="accent" asChild>
                <Link to="/demo">Request Demo</Link>
              </Button>
            </>
          )}
        </div>

        <button className="md:hidden p-2 text-muted-foreground hover:text-foreground" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {mobileMenuOpen && (
        <div className="md:hidden bg-background border-b border-border animate-slide-down">
          <div className="container mx-auto px-6 py-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "block px-4 py-3 text-sm font-medium rounded-lg transition-colors",
                  location.pathname === item.href || location.pathname.startsWith(`${item.href}/`)
                    ? "text-foreground bg-secondary"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/50",
                )}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-4 flex flex-col gap-2">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => setTheme((prev) => (prev === "dark" ? "light" : "dark"))}
              >
                {theme === "dark" ? "Switch to Light" : "Switch to Dark"}
              </Button>

              {user ? (
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                >
                  Logout
                </Button>
              ) : (
                <>
                  <Button variant="outline" asChild className="w-full">
                    <Link to="/login" onClick={() => setMobileMenuOpen(false)}>Log in</Link>
                  </Button>
                  <Button variant="accent" asChild className="w-full">
                    <Link to="/demo" onClick={() => setMobileMenuOpen(false)}>Request Demo</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
