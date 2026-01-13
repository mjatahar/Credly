import { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { TrustScore } from "@/components/ui/TrustScore";
import { CompatibilityMeter } from "@/components/ui/CompatibilityMeter";
import { InsightCard } from "@/components/ui/InsightCard";
import {
  Search,
  Filter,
  Plus,
  ArrowRight,
  MapPin,
  Instagram,
  Youtube,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  X,
  ChevronDown,
} from "lucide-react";

// Mock creator data
const creators = [
  {
    id: "1",
    name: "Priya Sharma",
    handle: "@priyacreates",
    avatar: "PS",
    trustScore: 82,
    niche: "Lifestyle & Wellness",
    platform: "instagram",
    followers: "245K",
    location: "Mumbai",
    fitScore: 88,
  },
  {
    id: "2",
    name: "Arjun Menon",
    handle: "@arjunmenon",
    avatar: "AM",
    trustScore: 76,
    niche: "Tech & Gadgets",
    platform: "youtube",
    followers: "512K",
    location: "Bangalore",
    fitScore: 72,
  },
  {
    id: "3",
    name: "Sneha Reddy",
    handle: "@snehafit",
    avatar: "SR",
    trustScore: 91,
    niche: "Fitness & Health",
    platform: "instagram",
    followers: "189K",
    location: "Hyderabad",
    fitScore: 94,
  },
  {
    id: "4",
    name: "Vikram Das",
    handle: "@vikramtravels",
    avatar: "VD",
    trustScore: 68,
    niche: "Travel & Adventure",
    platform: "youtube",
    followers: "320K",
    location: "Delhi",
    fitScore: 65,
  },
];

const selectedCreator = {
  ...creators[0],
  fitBreakdown: {
    audienceOverlap: 85,
    toneAlignment: 90,
    contentStyle: 82,
    workflowFit: 88,
  },
  positives: [
    { title: "Excellent audience match", description: "78% overlap with your target demographic" },
    { title: "Consistent content quality", description: "High production value across all posts" },
    { title: "Strong collaboration history", description: "95% positive feedback from past brands" },
  ],
  risks: [
    { title: "Busy schedule ahead", description: "Has 2 other campaigns running in parallel" },
  ],
};

export default function CreatorDiscovery() {
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>("1");

  const toggleFilter = (filter: string) => {
    setActiveFilters((prev) =>
      prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter]
    );
  };

  const getPlatformIcon = (platform: string) => {
    return platform === "instagram" ? Instagram : Youtube;
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link to="/brands" className="hover:text-foreground transition-colors">Dashboard</Link>
            <span>/</span>
            <span className="text-foreground">Discover Creators</span>
          </div>

          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Find the Right Creators</h1>
              <p className="text-muted-foreground">Discover based on trust and compatibility, not just followers</p>
            </div>
          </div>

          {/* Search & Filters */}
          <div className="bg-card rounded-xl p-4 border border-border/60 shadow-card mb-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search by name, niche, or handle..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-secondary border-0 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {["Instagram", "YouTube", "Trust 70+", "Wellness", "Tech"].map((filter) => (
                  <button
                    key={filter}
                    onClick={() => toggleFilter(filter)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      activeFilters.includes(filter)
                        ? "bg-accent text-accent-foreground"
                        : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                    }`}
                  >
                    {filter}
                  </button>
                ))}
                <button className="px-3 py-2 rounded-lg text-sm font-medium bg-secondary text-secondary-foreground hover:bg-secondary/80 flex items-center gap-1">
                  More
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Creator List */}
            <div className="lg:col-span-1 space-y-3">
              {creators.map((creator) => {
                const PlatformIcon = getPlatformIcon(creator.platform);
                return (
                  <button
                    key={creator.id}
                    onClick={() => setSelectedId(creator.id)}
                    className={`w-full text-left p-4 rounded-xl border transition-all ${
                      selectedId === creator.id
                        ? "bg-card border-accent/50 shadow-card-hover"
                        : "bg-card border-border/60 shadow-card hover:border-border"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center text-sm font-bold text-accent flex-shrink-0">
                        {creator.avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <h4 className="font-medium text-foreground truncate">{creator.name}</h4>
                          <TrustScore score={creator.trustScore} size="sm" showLabel={false} />
                        </div>
                        <p className="text-xs text-muted-foreground mb-2">{creator.handle}</p>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <PlatformIcon className="w-3 h-3" />
                            {creator.followers}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {creator.location}
                          </span>
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Selected Creator Details */}
            <div className="lg:col-span-2 space-y-6">
              {selectedId ? (
                <>
                  {/* Profile Header */}
                  <div className="bg-card rounded-2xl p-6 border border-border/60 shadow-card">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center text-xl font-bold text-accent">
                          {selectedCreator.avatar}
                        </div>
                        <div>
                          <h2 className="text-xl font-semibold text-foreground">{selectedCreator.name}</h2>
                          <p className="text-sm text-muted-foreground">{selectedCreator.handle}</p>
                          <div className="flex flex-wrap gap-2 mt-2">
                            <span className="px-2 py-0.5 rounded-full bg-secondary text-xs font-medium text-secondary-foreground">
                              {selectedCreator.niche}
                            </span>
                            <span className="px-2 py-0.5 rounded-full bg-secondary text-xs font-medium text-secondary-foreground">
                              {selectedCreator.followers} followers
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="accent">
                          <Plus className="w-4 h-4" />
                          Add to Shortlist
                        </Button>
                        <Button variant="outline">Compare</Button>
                      </div>
                    </div>

                    {/* Fit Score */}
                    <div className="grid sm:grid-cols-2 gap-6 pt-6 border-t border-border">
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground mb-2">Brand-Creator Fit</p>
                        <TrustScore score={selectedCreator.fitScore} size="lg" />
                      </div>
                      <div className="space-y-3">
                        <CompatibilityMeter label="Audience Overlap" score={selectedCreator.fitBreakdown.audienceOverlap} />
                        <CompatibilityMeter label="Tone Alignment" score={selectedCreator.fitBreakdown.toneAlignment} />
                        <CompatibilityMeter label="Content Style" score={selectedCreator.fitBreakdown.contentStyle} />
                        <CompatibilityMeter label="Workflow Fit" score={selectedCreator.fitBreakdown.workflowFit} />
                      </div>
                    </div>
                  </div>

                  {/* Signals */}
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="bg-card rounded-2xl p-6 border border-border/60 shadow-card">
                      <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-trust-high" />
                        Opportunity Signals
                      </h3>
                      <div className="space-y-3">
                        {selectedCreator.positives.map((item) => (
                          <InsightCard
                            key={item.title}
                            title={item.title}
                            description={item.description}
                            variant="positive"
                          />
                        ))}
                      </div>
                    </div>
                    <div className="bg-card rounded-2xl p-6 border border-border/60 shadow-card">
                      <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 text-trust-medium" />
                        Risk Signals
                      </h3>
                      <div className="space-y-3">
                        {selectedCreator.risks.map((item) => (
                          <InsightCard
                            key={item.title}
                            title={item.title}
                            description={item.description}
                            variant="warning"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="bg-card rounded-2xl p-12 border border-border/60 shadow-card text-center">
                  <Sparkles className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-foreground mb-2">Select a creator</h3>
                  <p className="text-muted-foreground">Choose a creator from the list to view detailed insights and compatibility analysis.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
