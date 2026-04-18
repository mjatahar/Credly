import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { AlertTriangle, Home, Search, Target } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/40 flex items-center justify-center px-6">
      <div className="max-w-xl w-full bg-card border border-border/60 rounded-2xl p-8 shadow-card text-center">
        <div className="w-14 h-14 rounded-full bg-warning/10 mx-auto mb-4 flex items-center justify-center">
          <AlertTriangle className="w-7 h-7 text-warning" />
        </div>
        <h1 className="text-4xl font-bold mb-2">404</h1>
        <p className="text-xl text-foreground mb-2">Page not found</p>
        <p className="text-sm text-muted-foreground mb-6">
          We could not find <span className="font-medium text-foreground">{location.pathname}</span>. It may have been moved or no longer exists.
        </p>

        <div className="grid sm:grid-cols-2 gap-3 mb-4">
          <Button asChild variant="accent">
            <Link to="/">
              <Home className="w-4 h-4" />
              Return Home
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/brands/discover">
              <Search className="w-4 h-4" />
              Discover Creators
            </Link>
          </Button>
        </div>

        <Button asChild variant="ghost" className="w-full">
          <Link to="/brands/brief-builder">
            <Target className="w-4 h-4" />
            Open Campaign Brief Builder
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
