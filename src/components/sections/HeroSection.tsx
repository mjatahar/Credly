import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, XCircle, Sparkles } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/30 to-background pointer-events-none" />
      
      <div className="container mx-auto px-6 relative">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-8 animate-fade-in">
            <Sparkles className="w-4 h-4" />
            <span>Decision Intelligence Platform</span>
          </div>

          {/* Main heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6 animate-slide-up">
            Influencer marketing should be based on{" "}
            <span className="text-accent">trust</span>, not just followers.
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed animate-slide-up" style={{ animationDelay: "0.1s" }}>
            Make smarter partnership decisions with explainable Trust Scores, compatibility analysis, and historical insights — not vanity metrics.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <Button size="xl" variant="accent" asChild>
              <Link to="/influencers">
                Explore as Creator
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
            <Button size="xl" variant="outline" asChild>
              <Link to="/brands">
                Explore as Brand
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>

          {/* Comparison Cards */}
          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto animate-slide-up" style={{ animationDelay: "0.3s" }}>
            {/* Old Way */}
            <div className="bg-card rounded-2xl p-6 border border-border/60 shadow-card text-left">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-full bg-destructive/10 flex items-center justify-center">
                  <XCircle className="w-4 h-4 text-destructive" />
                </div>
                <h3 className="font-semibold text-foreground">The Old Way</h3>
              </div>
              <ul className="space-y-2.5">
                {[
                  "Chasing follower counts",
                  "Guessing brand–creator fit",
                  "Black-box algorithms",
                  "No feedback loops",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="text-destructive mt-0.5">×</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* New Way */}
            <div className="bg-card rounded-2xl p-6 border border-accent/20 shadow-card text-left relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-accent/5 rounded-full blur-2xl" />
              <div className="flex items-center gap-2 mb-4 relative">
                <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4 text-accent" />
                </div>
                <h3 className="font-semibold text-foreground">With TrustPulse</h3>
              </div>
              <ul className="space-y-2.5 relative">
                {[
                  "Influencer Trust Scores",
                  "Explainable insights",
                  "Brand–Creator compatibility",
                  "Historical feedback analysis",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="text-accent mt-0.5">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
