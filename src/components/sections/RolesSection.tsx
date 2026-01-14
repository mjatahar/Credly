import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, User, Building2, ChartLine, Shield, Lightbulb, Target } from "lucide-react";

const roleCards = [
  {
    id: "influencers",
    title: "For Creators",
    subtitle: "Understand your value",
    icon: User,
    href: "/influencers",
    features: [
      { icon: ChartLine, label: "See your Trust Score and what drives it" },
      { icon: Target, label: "Discover campaigns that truly fit your style" },
      { icon: Lightbulb, label: "Get insights to improve your partnerships" },
    ],
    cta: "Explore Creator Features",
  },
  {
    id: "brands",
    title: "For Brands",
    subtitle: "Find the right partners",
    icon: Building2,
    href: "/brands",
    features: [
      { icon: Shield, label: "Discover creators with verified trust signals" },
      { icon: Target, label: "Match based on real compatibility, not followers" },
      { icon: ChartLine, label: "Track campaign health with intelligent alerts" },
    ],
    cta: "Explore Brand Features",
  },
];

export function RolesSection() {
  return (
    <section className="py-20 lg:py-28 bg-secondary/30">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="section-header">Built for both sides</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Choose your perspective
          </h2>
          <p className="text-muted-foreground text-lg">
            Whether you're a creator or a brand, Credly gives you the intelligence to make better decisions.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {roleCards.map((role) => (
            <div
              key={role.id}
              className="group bg-card rounded-2xl p-8 border border-border/60 shadow-card hover:shadow-card-hover hover:border-accent/30 transition-all duration-300"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                  <role.icon className="w-7 h-7 text-accent" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground">{role.title}</h3>
                  <p className="text-sm text-muted-foreground">{role.subtitle}</p>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {role.features.map((feature) => (
                  <li key={feature.label} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
                      <feature.icon className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <span className="text-sm text-foreground leading-relaxed pt-1.5">
                      {feature.label}
                    </span>
                  </li>
                ))}
              </ul>

              <Button variant="outline" className="w-full group-hover:border-accent/50" asChild>
                <Link to={role.href}>
                  {role.cta}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
