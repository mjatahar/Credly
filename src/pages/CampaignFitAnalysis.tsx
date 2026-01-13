import { Link } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { TrustScore } from "@/components/ui/TrustScore";
import { CompatibilityMeter } from "@/components/ui/CompatibilityMeter";
import { InsightCard } from "@/components/ui/InsightCard";
import {
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Clock,
  BookOpen,
  Shield,
  Star,
  ThumbsUp,
  Bookmark,
  X,
  Sparkles,
} from "lucide-react";

// Mock campaign data
const campaign = {
  id: "1",
  brand: "GlowNaturals",
  brandLogo: "GN",
  title: "Summer Wellness Collection Launch",
  budget: "₹50,000 - ₹80,000",
  timeline: "4 weeks",
  deliverables: "3 Instagram Reels + 2 Stories",
  niche: "Wellness & Lifestyle",
  fitScore: 84,
};

const fitReasons = [
  {
    title: "Strong audience overlap",
    description: "72% of your audience matches the brand's target demographic.",
    icon: CheckCircle2,
    variant: "positive" as const,
  },
  {
    title: "Content style alignment",
    description: "Your aesthetic and tone closely match GlowNaturals' brand voice.",
    icon: CheckCircle2,
    variant: "positive" as const,
  },
  {
    title: "Budget may feel limiting",
    description: "Given your reach, this budget is on the lower end but reasonable for brand awareness.",
    icon: AlertTriangle,
    variant: "warning" as const,
  },
];

const brandIndicators = [
  { label: "Brief Clarity", score: 88, description: "Detailed expectations and creative guidelines" },
  { label: "Payment Transparency", score: 92, description: "Clear payment terms upfront" },
  { label: "Past Creator Experience", score: 76, description: "Generally positive, some revision requests" },
];

const considerations = [
  "The brand has historically requested 1-2 rounds of revisions",
  "Timeline is achievable but leaves little buffer",
  "Product aligns well with your existing content themes",
  "This could lead to a long-term partnership if successful",
];

export default function CampaignFitAnalysis() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link to="/influencers" className="hover:text-foreground transition-colors">Dashboard</Link>
            <span>/</span>
            <Link to="/influencers/campaigns" className="hover:text-foreground transition-colors">Campaigns</Link>
            <span>/</span>
            <span className="text-foreground">Fit Analysis</span>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Campaign Overview */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-card rounded-2xl p-6 border border-border/60 shadow-card">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center text-lg font-bold text-accent">
                    {campaign.brandLogo}
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-foreground">{campaign.brand}</h2>
                    <span className="text-xs font-medium text-muted-foreground">{campaign.niche}</span>
                  </div>
                </div>

                <h3 className="font-medium text-foreground mb-4">{campaign.title}</h3>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Budget</span>
                    <span className="font-medium text-foreground">{campaign.budget}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Timeline</span>
                    <span className="font-medium text-foreground">{campaign.timeline}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Deliverables</span>
                    <span className="font-medium text-foreground text-right">{campaign.deliverables}</span>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-border">
                  <div className="text-center mb-4">
                    <p className="text-sm text-muted-foreground mb-2">Campaign Fit Score</p>
                    <TrustScore score={campaign.fitScore} size="lg" />
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <Button variant="accent" className="flex-1">
                  Apply
                  <ArrowRight className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Bookmark className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Analysis Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Fit Analysis */}
              <div className="bg-card rounded-2xl p-6 border border-border/60 shadow-card">
                <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-accent" />
                  Why This Campaign Fits (or Doesn't)
                </h3>
                <div className="space-y-3">
                  {fitReasons.map((reason) => (
                    <InsightCard
                      key={reason.title}
                      title={reason.title}
                      description={reason.description}
                      icon={reason.icon}
                      variant={reason.variant}
                    />
                  ))}
                </div>
              </div>

              {/* Brand Quality Indicators */}
              <div className="bg-card rounded-2xl p-6 border border-border/60 shadow-card">
                <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Shield className="w-4 h-4 text-accent" />
                  Brand Quality Indicators
                </h3>
                <div className="space-y-5">
                  {brandIndicators.map((indicator) => (
                    <div key={indicator.label}>
                      <CompatibilityMeter label={indicator.label} score={indicator.score} />
                      <p className="text-xs text-muted-foreground mt-1">{indicator.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Things to Consider */}
              <div className="bg-card rounded-2xl p-6 border border-border/60 shadow-card">
                <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-accent" />
                  Things to Consider Before Applying
                </h3>
                <ul className="space-y-3">
                  {considerations.map((item, index) => (
                    <li key={index} className="flex items-start gap-3 text-sm">
                      <span className="w-5 h-5 rounded-full bg-secondary flex items-center justify-center flex-shrink-0 text-xs font-medium text-muted-foreground">
                        {index + 1}
                      </span>
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Comparison Summary */}
              <div className="bg-secondary/30 rounded-2xl p-6 border border-border/40">
                <h3 className="font-semibold text-foreground mb-4">Your Strengths vs Campaign Needs</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="bg-card rounded-xl p-4 border border-border/60">
                    <h4 className="text-sm font-medium text-muted-foreground mb-3">Your Strengths</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2 text-foreground">
                        <ThumbsUp className="w-3.5 h-3.5 text-trust-high" />
                        Wellness content expertise
                      </li>
                      <li className="flex items-center gap-2 text-foreground">
                        <ThumbsUp className="w-3.5 h-3.5 text-trust-high" />
                        High engagement reels
                      </li>
                      <li className="flex items-center gap-2 text-foreground">
                        <ThumbsUp className="w-3.5 h-3.5 text-trust-high" />
                        Female 25-35 audience
                      </li>
                    </ul>
                  </div>
                  <div className="bg-card rounded-xl p-4 border border-border/60">
                    <h4 className="text-sm font-medium text-muted-foreground mb-3">Campaign Needs</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2 text-foreground">
                        <Star className="w-3.5 h-3.5 text-accent" />
                        Authentic wellness voice
                      </li>
                      <li className="flex items-center gap-2 text-foreground">
                        <Star className="w-3.5 h-3.5 text-accent" />
                        Video content creation
                      </li>
                      <li className="flex items-center gap-2 text-foreground">
                        <Star className="w-3.5 h-3.5 text-accent" />
                        Health-conscious audience
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
