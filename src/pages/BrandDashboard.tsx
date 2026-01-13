import { Link } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { TrustScore } from "@/components/ui/TrustScore";
import { InsightCard } from "@/components/ui/InsightCard";
import { MetricBadge } from "@/components/ui/MetricBadge";
import {
  ArrowRight,
  Search,
  Filter,
  Users,
  Target,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  Plus,
  ChartLine,
  Briefcase,
  Activity,
  Sparkles,
} from "lucide-react";

// Mock brand data
const brandData = {
  name: "Verdant Beauty",
  campaigns: { active: 3, total: 12 },
  shortlisted: 15,
  avgTrustScore: 76,
};

const campaignHealth = [
  { name: "Summer Glow Launch", status: "on-track", progress: 65, dueIn: "12 days" },
  { name: "Monsoon Skincare Series", status: "needs-attention", progress: 30, dueIn: "25 days" },
  { name: "Brand Ambassador Q3", status: "at-risk", progress: 15, dueIn: "8 days" },
];

const attentionItems = [
  {
    title: "Brand Ambassador Q3 needs immediate action",
    description: "Only 1 of 5 creators have submitted content. Consider extending deadline or reaching out.",
    icon: AlertCircle,
    variant: "warning" as const,
  },
  {
    title: "High-fit creator available",
    description: "A creator with 91% compatibility just became available for partnerships.",
    icon: CheckCircle2,
    variant: "positive" as const,
  },
];

const trustDistribution = [
  { range: "85-100", count: 3, label: "Excellent" },
  { range: "70-84", count: 8, label: "Very Good" },
  { range: "55-69", count: 4, label: "Good" },
  { range: "Below 55", count: 0, label: "Fair" },
];

export default function BrandDashboard() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
              <p className="section-header">Brand Dashboard</p>
              <h1 className="text-3xl font-bold text-foreground">{brandData.name}</h1>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" asChild>
                <Link to="/brands/discover">
                  <Search className="w-4 h-4" />
                  Find Creators
                </Link>
              </Button>
              <Button variant="accent">
                <Plus className="w-4 h-4" />
                New Campaign
              </Button>
            </div>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-card rounded-xl p-5 border border-border/60 shadow-card">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                  <Briefcase className="w-5 h-5 text-accent" />
                </div>
                <span className="text-sm text-muted-foreground">Active Campaigns</span>
              </div>
              <p className="text-2xl font-bold text-foreground">{brandData.campaigns.active}</p>
            </div>
            <div className="bg-card rounded-xl p-5 border border-border/60 shadow-card">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                  <Users className="w-5 h-5 text-muted-foreground" />
                </div>
                <span className="text-sm text-muted-foreground">Shortlisted</span>
              </div>
              <p className="text-2xl font-bold text-foreground">{brandData.shortlisted}</p>
            </div>
            <div className="bg-card rounded-xl p-5 border border-border/60 shadow-card">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-trust-high/10 flex items-center justify-center">
                  <Activity className="w-5 h-5 text-trust-high" />
                </div>
                <span className="text-sm text-muted-foreground">Avg Trust Score</span>
              </div>
              <p className="text-2xl font-bold text-trust-high">{brandData.avgTrustScore}</p>
            </div>
            <div className="bg-card rounded-xl p-5 border border-border/60 shadow-card">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                  <ChartLine className="w-5 h-5 text-muted-foreground" />
                </div>
                <span className="text-sm text-muted-foreground">Total Campaigns</span>
              </div>
              <p className="text-2xl font-bold text-foreground">{brandData.campaigns.total}</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* Campaign Health */}
              <div className="bg-card rounded-2xl p-6 border border-border/60 shadow-card">
                <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-accent" />
                  Campaign Health
                </h3>
                <div className="space-y-4">
                  {campaignHealth.map((campaign) => (
                    <div
                      key={campaign.name}
                      className="flex items-center justify-between p-4 rounded-xl bg-secondary/30 border border-border/40"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-medium text-foreground">{campaign.name}</h4>
                          <span
                            className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                              campaign.status === "on-track"
                                ? "bg-trust-high/10 text-trust-high"
                                : campaign.status === "needs-attention"
                                ? "bg-trust-medium/10 text-trust-medium"
                                : "bg-trust-low/10 text-trust-low"
                            }`}
                          >
                            {campaign.status.replace("-", " ")}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>Progress: {campaign.progress}%</span>
                          <span>Due in {campaign.dueIn}</span>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        View
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Decision Signals */}
              <div className="bg-card rounded-2xl p-6 border border-border/60 shadow-card">
                <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Target className="w-4 h-4 text-accent" />
                  Attention Items
                </h3>
                <div className="space-y-3">
                  {attentionItems.map((item) => (
                    <InsightCard
                      key={item.title}
                      title={item.title}
                      description={item.description}
                      icon={item.icon}
                      variant={item.variant}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Trust Score Distribution */}
              <div className="bg-card rounded-2xl p-6 border border-border/60 shadow-card">
                <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-accent" />
                  Shortlist Trust Distribution
                </h3>
                <div className="space-y-3">
                  {trustDistribution.map((tier) => (
                    <div key={tier.range} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-3 h-3 rounded-full ${
                            tier.label === "Excellent"
                              ? "bg-trust-high"
                              : tier.label === "Very Good"
                              ? "bg-trust-high/70"
                              : tier.label === "Good"
                              ? "bg-trust-medium"
                              : "bg-trust-low"
                          }`}
                        />
                        <span className="text-sm text-muted-foreground">{tier.range}</span>
                      </div>
                      <span className="font-medium text-foreground">{tier.count} creators</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Links */}
              <div className="bg-card rounded-2xl p-6 border border-border/60 shadow-card">
                <h3 className="font-semibold text-foreground mb-4">Quick Actions</h3>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <Link to="/brands/discover">
                      <Search className="w-4 h-4" />
                      Discover Creators
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Filter className="w-4 h-4" />
                    View Shortlists
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Users className="w-4 h-4" />
                    Compare Creators
                  </Button>
                </div>
              </div>

              {/* Premium */}
              <div className="bg-accent/5 rounded-2xl p-6 border border-accent/20">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="w-5 h-5 text-accent" />
                  <h3 className="font-semibold text-foreground">Premium Insights</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Unlock advanced creator analytics, historical patterns, and AI-powered recommendations.
                </p>
                <Button variant="accent" size="sm" asChild>
                  <Link to="/pricing">
                    Upgrade
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
