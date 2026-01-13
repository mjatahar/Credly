import { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight, Sparkles, User, Building2 } from "lucide-react";

const influencerPlans = [
  {
    name: "Monthly",
    price: "₹499",
    period: "/month",
    description: "Perfect for getting started",
    features: [
      "Full Trust Score breakdown",
      "Campaign fit analysis",
      "Historical feedback insights",
      "Compatibility comparisons",
      "Priority support",
    ],
  },
  {
    name: "Half-Yearly",
    price: "₹2,499",
    period: "/6 months",
    description: "Best for growing creators",
    popular: true,
    savings: "Save ₹495",
    features: [
      "Everything in Monthly",
      "Advanced pattern analysis",
      "Personalized recommendations",
      "Brand matching alerts",
      "Collaboration insights",
    ],
  },
  {
    name: "Yearly",
    price: "₹4,499",
    period: "/year",
    description: "For serious creators",
    savings: "Save ₹1,489",
    features: [
      "Everything in Half-Yearly",
      "Early access to new features",
      "Dedicated account manager",
      "Custom reports",
      "API access",
    ],
  },
];

const brandPlans = [
  {
    name: "Monthly",
    price: "₹2,999",
    period: "/month",
    description: "For campaign-based needs",
    features: [
      "Unlimited creator discovery",
      "Trust Score filtering",
      "Fit analysis for all creators",
      "Campaign health dashboard",
      "Basic shortlisting",
    ],
  },
  {
    name: "Half-Yearly",
    price: "₹14,999",
    period: "/6 months",
    description: "For active brands",
    popular: true,
    savings: "Save ₹2,995",
    features: [
      "Everything in Monthly",
      "Advanced creator comparison",
      "Historical collaboration data",
      "Team collaboration",
      "Priority support",
    ],
  },
  {
    name: "Yearly",
    price: "₹27,999",
    period: "/year",
    description: "For enterprise needs",
    savings: "Save ₹7,989",
    features: [
      "Everything in Half-Yearly",
      "Custom integrations",
      "Dedicated success manager",
      "Advanced analytics & exports",
      "SLA guarantees",
    ],
  },
];

const freeFeatures = [
  "Basic Trust Score (limited breakdown)",
  "5 campaign fit analyses / month",
  "Basic creator discovery",
  "Community access",
];

export default function Pricing() {
  const [activeTab, setActiveTab] = useState<"influencer" | "brand">("influencer");

  const plans = activeTab === "influencer" ? influencerPlans : brandPlans;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-6">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              <span>Transparent Pricing</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Choose your plan
            </h1>
            <p className="text-lg text-muted-foreground">
              Unlock deeper insights and make smarter partnership decisions.
            </p>
          </div>

          {/* Toggle */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex p-1 rounded-xl bg-secondary">
              <button
                onClick={() => setActiveTab("influencer")}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-medium transition-all ${
                  activeTab === "influencer"
                    ? "bg-card text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <User className="w-4 h-4" />
                For Creators
              </button>
              <button
                onClick={() => setActiveTab("brand")}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-medium transition-all ${
                  activeTab === "brand"
                    ? "bg-card text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Building2 className="w-4 h-4" />
                For Brands
              </button>
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative bg-card rounded-2xl p-6 border shadow-card ${
                  plan.popular ? "border-accent ring-2 ring-accent/20" : "border-border/60"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="px-3 py-1 rounded-full bg-accent text-accent-foreground text-xs font-medium">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-foreground mb-1">{plan.name}</h3>
                  <p className="text-sm text-muted-foreground">{plan.description}</p>
                </div>

                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold text-foreground">{plan.price}</span>
                    <span className="text-muted-foreground">{plan.period}</span>
                  </div>
                  {plan.savings && (
                    <span className="text-sm text-trust-high font-medium">{plan.savings}</span>
                  )}
                </div>

                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-trust-high flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  variant={plan.popular ? "accent" : "outline"}
                  className="w-full"
                >
                  Get Started
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>

          {/* Free Tier */}
          <div className="max-w-2xl mx-auto">
            <div className="bg-secondary/30 rounded-2xl p-8 border border-border/40 text-center">
              <h3 className="text-xl font-semibold text-foreground mb-2">Start Free</h3>
              <p className="text-muted-foreground mb-6">
                Get a taste of TrustPulse with limited features. No credit card required.
              </p>
              <div className="flex flex-wrap justify-center gap-4 mb-6">
                {freeFeatures.map((feature) => (
                  <span
                    key={feature}
                    className="px-3 py-1.5 rounded-full bg-card text-sm text-muted-foreground border border-border/60"
                  >
                    {feature}
                  </span>
                ))}
              </div>
              <Button variant="outline" asChild>
                <Link to="/demo">
                  Try for Free
                  <ArrowRight className="w-4 h-4" />
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
