import { TrendingUp, Eye, Users, History } from "lucide-react";
import { TrustScore } from "@/components/ui/TrustScore";

const concepts = [
  {
    icon: TrendingUp,
    title: "Influencer Trust Score",
    description: "A transparent 0-100 score measuring reliability, authenticity, and partnership potential — not just popularity.",
    highlight: "Completely explainable",
  },
  {
    icon: Eye,
    title: "Explainable Insights",
    description: "Every recommendation comes with clear reasoning. No black boxes, no hidden algorithms — just transparent analysis.",
    highlight: "Full transparency",
  },
  {
    icon: Users,
    title: "Brand–Creator Compatibility",
    description: "AI-powered matching that considers audience overlap, tone alignment, and historical collaboration patterns.",
    highlight: "Smart matching",
  },
  {
    icon: History,
    title: "Historical Feedback",
    description: "Learn from past collaborations. See what worked, what didn't, and identify patterns for better future decisions.",
    highlight: "Continuous learning",
  },
];

export function ConceptsSection() {
  return (
    <section className="py-20 lg:py-28">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="section-header">Core Concepts</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Intelligence you can trust
          </h2>
          <p className="text-muted-foreground text-lg">
            Built on transparency, powered by data, designed for better decisions.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Concept Cards */}
          <div className="grid sm:grid-cols-2 gap-4">
            {concepts.map((concept, index) => (
              <div
                key={concept.title}
                className="group insight-card hover:border-accent/30"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                  <concept.icon className="w-5 h-5 text-accent" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{concept.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                  {concept.description}
                </p>
                <span className="text-xs font-medium text-accent">{concept.highlight}</span>
              </div>
            ))}
          </div>

          {/* Right: Visual Trust Score Demo */}
          <div className="flex justify-center">
            <div className="bg-card rounded-2xl p-8 border border-border/60 shadow-card max-w-sm w-full">
              <div className="text-center mb-6">
                <TrustScore score={82} size="xl" />
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Audience Relevance</span>
                  <span className="font-medium text-foreground">High</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Engagement Quality</span>
                  <span className="font-medium text-foreground">Very Good</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Consistency</span>
                  <span className="font-medium text-foreground">Excellent</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Brand Alignment</span>
                  <span className="font-medium text-foreground">Strong</span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground text-center mt-6 pt-4 border-t border-border">
                Every score is backed by transparent, explainable data
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
