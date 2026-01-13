import { Link } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { TrustScore } from "@/components/ui/TrustScore";
import { InsightCard } from "@/components/ui/InsightCard";
import { CompatibilityMeter } from "@/components/ui/CompatibilityMeter";
import {
  ArrowRight,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Eye,
  Clock,
  Users,
  Sparkles,
  Target,
  BarChart3,
  MessageSquare,
  Calendar,
} from "lucide-react";

// Mock creator data
const creatorData = {
  name: "Priya Sharma",
  handle: "@priyacreates",
  avatar: "PS",
  trustScore: 78,
  niche: "Lifestyle & Wellness",
  platform: "Instagram",
  followers: "245K",
};

const scoreBreakdown = [
  { label: "Audience Relevance", score: 82 },
  { label: "Engagement Authenticity", score: 85 },
  { label: "Posting Consistency", score: 72 },
  { label: "Brand Alignment", score: 74 },
];

const workingInFavor = [
  {
    title: "High engagement authenticity",
    description: "Your audience shows genuine interaction patterns, not bot-like behavior.",
    icon: CheckCircle2,
  },
  {
    title: "Consistent content quality",
    description: "Brands notice your professional visual standards and clear messaging.",
    icon: TrendingUp,
  },
  {
    title: "Positive collaboration history",
    description: "Past brand partners have left constructive feedback about working with you.",
    icon: Sparkles,
  },
];

const hesitations = [
  {
    title: "Inconsistent posting schedule",
    description: "Gaps in content may concern brands looking for sustained campaign momentum.",
    icon: Clock,
  },
  {
    title: "Limited niche diversity",
    description: "Some brands may hesitate if their product doesn't fit your core wellness focus.",
    icon: Target,
  },
];

export default function InfluencerDashboard() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          {/* Page Header */}
          <div className="mb-8">
            <p className="section-header">Creator Dashboard</p>
            <h1 className="text-3xl font-bold text-foreground">How Brands See You</h1>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Profile & Score */}
            <div className="lg:col-span-1 space-y-6">
              {/* Profile Card */}
              <div className="bg-card rounded-2xl p-6 border border-border/60 shadow-card">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center text-xl font-bold text-accent">
                    {creatorData.avatar}
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-foreground">{creatorData.name}</h2>
                    <p className="text-sm text-muted-foreground">{creatorData.handle}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-medium">
                    {creatorData.niche}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-medium">
                    {creatorData.platform}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-medium">
                    {creatorData.followers} followers
                  </span>
                </div>
                <div className="flex justify-center pt-4 border-t border-border">
                  <TrustScore score={creatorData.trustScore} size="lg" />
                </div>
              </div>

              {/* Score Breakdown */}
              <div className="bg-card rounded-2xl p-6 border border-border/60 shadow-card">
                <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-accent" />
                  Score Breakdown
                </h3>
                <div className="space-y-4">
                  {scoreBreakdown.map((item) => (
                    <CompatibilityMeter key={item.label} label={item.label} score={item.score} />
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-card rounded-2xl p-6 border border-border/60 shadow-card">
                <h3 className="font-semibold text-foreground mb-4">Quick Actions</h3>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <Link to="/influencers/campaigns">
                      <Target className="w-4 h-4" />
                      Browse Campaigns
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <Link to="/influencers/history">
                      <Clock className="w-4 h-4" />
                      View History
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <Link to="/influencers/collaborations">
                      <Users className="w-4 h-4" />
                      Collaborations Hub
                    </Link>
                  </Button>
                </div>
              </div>
            </div>

            {/* Right Column - Insights */}
            <div className="lg:col-span-2 space-y-6">
              {/* What's Working */}
              <div className="bg-card rounded-2xl p-6 border border-border/60 shadow-card">
                <div className="flex items-center gap-2 mb-4">
                  <CheckCircle2 className="w-5 h-5 text-trust-high" />
                  <h3 className="font-semibold text-foreground">What's Working in Your Favor</h3>
                </div>
                <div className="space-y-3">
                  {workingInFavor.map((item) => (
                    <InsightCard
                      key={item.title}
                      title={item.title}
                      description={item.description}
                      icon={item.icon}
                      variant="positive"
                    />
                  ))}
                </div>
              </div>

              {/* Why Brands May Hesitate */}
              <div className="bg-card rounded-2xl p-6 border border-border/60 shadow-card">
                <div className="flex items-center gap-2 mb-4">
                  <AlertTriangle className="w-5 h-5 text-trust-medium" />
                  <h3 className="font-semibold text-foreground">Why Brands May Hesitate</h3>
                </div>
                <div className="space-y-3">
                  {hesitations.map((item) => (
                    <InsightCard
                      key={item.title}
                      title={item.title}
                      description={item.description}
                      icon={item.icon}
                      variant="warning"
                    />
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-border">
                  <Button variant="subtle" className="w-full" asChild>
                    <Link to="/influencers/insights">
                      <Eye className="w-4 h-4" />
                      View Improvement Insights
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Premium Upsell - Subtle */}
              <div className="bg-accent/5 rounded-2xl p-6 border border-accent/20">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-5 h-5 text-accent" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground mb-1">Unlock Deeper Insights</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Premium users get detailed compatibility analysis, historical patterns, and personalized improvement recommendations.
                    </p>
                    <Button variant="accent" size="sm" asChild>
                      <Link to="/pricing">
                        Explore Premium
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </Button>
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
