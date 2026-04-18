import { Link } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { InsightCard } from "@/components/ui/InsightCard";
import {
  ArrowRight,
  Search,
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
  Bell,
} from "lucide-react";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const brandData = {
  name: "Verdant Beauty",
  activeCampaigns: 3,
  totalCampaigns: 12,
  avgTrustScore: 76,
  shortlisted: 15,
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
    variant: "warning",
  },
  {
    title: "High-fit creator available",
    description: "A creator with 91% compatibility just became available for partnerships.",
    icon: CheckCircle2,
    variant: "positive",
  },
];

const trustDistribution = [
  { range: "85-100", count: 3, label: "Excellent" },
  { range: "70-84", count: 8, label: "Very Good" },
  { range: "55-69", count: 4, label: "Good" },
  { range: "Below 55", count: 0, label: "Fair" },
];

const roiTrend = [
  { month: "Oct", roi: 2.1, conversions: 280 },
  { month: "Nov", roi: 2.4, conversions: 330 },
  { month: "Dec", roi: 2.2, conversions: 310 },
  { month: "Jan", roi: 2.8, conversions: 420 },
  { month: "Feb", roi: 3.1, conversions: 495 },
];

const topCampaigns = [
  { campaign: "Glow Launch", ctr: 4.8, cpm: 6.2 },
  { campaign: "Serum Drop", ctr: 3.9, cpm: 5.4 },
  { campaign: "Skincare Week", ctr: 5.4, cpm: 6.8 },
  { campaign: "Creator Bundle", ctr: 4.1, cpm: 5.9 },
];

export default function BrandDashboard() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
              <p className="section-header">Brand Dashboard</p>
              <h1 className="text-3xl font-bold text-foreground">{brandData.name}</h1>
            </div>
            <div className="flex gap-3 flex-wrap">
              <Button variant="outline" asChild>
                <Link to="/brands/discover">
                  <Search className="w-4 h-4" />
                  Find Creators
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/brands/brief-builder">
                  <Target className="w-4 h-4" />
                  Build Brief
                </Link>
              </Button>
              <Button variant="accent">
                <Plus className="w-4 h-4" />
                New Campaign
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-card rounded-xl p-5 border border-border/60 shadow-card">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                  <Briefcase className="w-5 h-5 text-accent" />
                </div>
                <span className="text-sm text-muted-foreground">Active Campaigns</span>
              </div>
              <p className="text-2xl font-bold text-foreground">{brandData.activeCampaigns}</p>
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
              <p className="text-2xl font-bold text-foreground">{brandData.totalCampaigns}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-card rounded-xl p-4 border border-border/60 shadow-card">
              <p className="text-xs text-muted-foreground">CTR</p>
              <p className="text-xl font-bold text-foreground">4.7%</p>
            </div>
            <div className="bg-card rounded-xl p-4 border border-border/60 shadow-card">
              <p className="text-xs text-muted-foreground">CPM</p>
              <p className="text-xl font-bold text-foreground">$6.1</p>
            </div>
            <div className="bg-card rounded-xl p-4 border border-border/60 shadow-card">
              <p className="text-xs text-muted-foreground">Conversions</p>
              <p className="text-xl font-bold text-foreground">1,835</p>
            </div>
            <div className="bg-card rounded-xl p-4 border border-border/60 shadow-card">
              <p className="text-xs text-muted-foreground">ROI</p>
              <p className="text-xl font-bold text-trust-high">3.1x</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-card rounded-2xl p-6 border border-border/60 shadow-card">
                <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-accent" />
                  Monthly Performance Trend
                </h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={roiTrend}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Area type="monotone" dataKey="conversions" stroke="hsl(var(--accent))" fill="hsl(var(--accent) / 0.15)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-card rounded-2xl p-6 border border-border/60 shadow-card">
                <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-accent" />
                  Top Campaign Benchmark
                </h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={topCampaigns}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="campaign" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="ctr" fill="hsl(var(--accent))" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-card rounded-2xl p-6 border border-border/60 shadow-card">
                <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-accent" />
                  Campaign Health
                </h3>
                <div className="space-y-4">
                  {campaignHealth.map((campaign) => (
                    <div key={campaign.name} className="flex items-center justify-between p-4 rounded-xl bg-secondary/30 border border-border/40">
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

              <div className="bg-card rounded-2xl p-6 border border-border/60 shadow-card">
                <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Target className="w-4 h-4 text-accent" />
                  Attention Items
                </h3>
                <div className="space-y-3">
                  {attentionItems.map((item) => (
                    <InsightCard key={item.title} title={item.title} description={item.description} icon={item.icon} variant={item.variant} />
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
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

              <div className="bg-card rounded-2xl p-6 border border-border/60 shadow-card">
                <h3 className="font-semibold text-foreground mb-4">Quick Actions</h3>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <Link to="/brands/discover">
                      <Search className="w-4 h-4" />
                      Discover Creators
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <Link to="/brands/brief-builder">
                      <Target className="w-4 h-4" />
                      Campaign Brief Builder
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Bell className="w-4 h-4" />
                    View Notifications
                  </Button>
                </div>
              </div>

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
