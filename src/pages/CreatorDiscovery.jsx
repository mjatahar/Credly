import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { TrustScore } from "@/components/ui/TrustScore";
import { CompatibilityMeter } from "@/components/ui/CompatibilityMeter";
import { InsightCard } from "@/components/ui/InsightCard";
import { Skeleton } from "@/components/ui/skeleton";
import { creators, formatFollowers } from "@/lib/mockData";
import { addCreatorToList, createList, getCreatorLists } from "@/lib/appState";
import {
  Search,
  Plus,
  MapPin,
  Instagram,
  Youtube,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  Bookmark,
} from "lucide-react";
import { toast } from "sonner";

const initialFilters = {
  search: "",
  platform: "all",
  niche: "all",
  minEngagement: "0",
  followers: "all",
  country: "all",
  sortBy: "fit_desc",
};

const fitBreakdown = {
  audienceOverlap: 85,
  toneAlignment: 90,
  contentStyle: 82,
  workflowFit: 88,
};

export default function CreatorDiscovery() {
  const [filters, setFilters] = useState(initialFilters);
  const [selectedId, setSelectedId] = useState(creators[0]?.id || "");
  const [loading, setLoading] = useState(true);
  const [lists, setLists] = useState(() => getCreatorLists());
  const [newListName, setNewListName] = useState("");
  const [selectedList, setSelectedList] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(timer);
  }, []);

  const niches = useMemo(() => ["all", ...new Set(creators.map((c) => c.niche))], []);
  const countries = useMemo(() => ["all", ...new Set(creators.map((c) => c.country))], []);

  const filteredCreators = useMemo(() => {
    const search = filters.search.toLowerCase();
    const applyFollowerRange = (followers) => {
      if (filters.followers === "all") return true;
      if (filters.followers === "lt200") return followers < 200000;
      if (filters.followers === "200to500") return followers >= 200000 && followers <= 500000;
      return followers > 500000;
    };

    const sorted = creators
      .filter((creator) => {
        const isMatchingSearch =
          creator.name.toLowerCase().includes(search) ||
          creator.handle.toLowerCase().includes(search) ||
          creator.niche.toLowerCase().includes(search);

        return (
          isMatchingSearch &&
          (filters.platform === "all" || creator.platform === filters.platform) &&
          (filters.niche === "all" || creator.niche === filters.niche) &&
          (filters.country === "all" || creator.country === filters.country) &&
          creator.engagementRate >= Number(filters.minEngagement) &&
          applyFollowerRange(creator.followers)
        );
      })
      .sort((a, b) => {
        switch (filters.sortBy) {
          case "engagement_desc":
            return b.engagementRate - a.engagementRate;
          case "cost_asc":
            return a.estimatedCost - b.estimatedCost;
          case "cost_desc":
            return b.estimatedCost - a.estimatedCost;
          case "fit_desc":
          default:
            return b.fitScore - a.fitScore;
        }
      });

    return sorted;
  }, [filters]);

  const selectedCreator = useMemo(() => {
    return filteredCreators.find((creator) => creator.id === selectedId) || filteredCreators[0] || null;
  }, [filteredCreators, selectedId]);

  useEffect(() => {
    if (selectedCreator && selectedCreator.id !== selectedId) {
      setSelectedId(selectedCreator.id);
    }
  }, [selectedCreator, selectedId]);

  const getPlatformIcon = (platform) => {
    return platform === "instagram" ? Instagram : Youtube;
  };

  const addList = () => {
    const next = createList(newListName);
    setLists(next);
    setNewListName("");
    if (next.length) setSelectedList(next[0].name);
    toast.success("List saved.");
  };

  const addSelectedToList = () => {
    if (!selectedCreator) return;
    if (!selectedList) {
      toast.error("Select a list first.");
      return;
    }
    const next = addCreatorToList(selectedList, selectedCreator.id);
    setLists(next);
    toast.success(`${selectedCreator.name} added to ${selectedList}.`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link to="/brands" className="hover:text-foreground transition-colors">Dashboard</Link>
            <span>/</span>
            <span className="text-foreground">Discover Creators</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Find the Right Creators</h1>
              <p className="text-muted-foreground">Advanced filters by platform, niche, engagement, followers, and location.</p>
            </div>
            <Button variant="outline" asChild>
              <Link to="/brands/brief-builder">Open Brief Builder</Link>
            </Button>
          </div>

          <div className="bg-card rounded-xl p-4 border border-border/60 shadow-card mb-6">
            <div className="grid lg:grid-cols-6 gap-3">
              <div className="lg:col-span-2 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search by name, niche, or handle"
                  value={filters.search}
                  onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-secondary border border-border/50"
                />
              </div>

              <select value={filters.platform} onChange={(e) => setFilters({ ...filters, platform: e.target.value })} className="px-3 py-2.5 rounded-lg bg-secondary border border-border/50">
                <option value="all">All Platforms</option>
                <option value="instagram">Instagram</option>
                <option value="youtube">YouTube</option>
              </select>

              <select value={filters.niche} onChange={(e) => setFilters({ ...filters, niche: e.target.value })} className="px-3 py-2.5 rounded-lg bg-secondary border border-border/50">
                {niches.map((niche) => (
                  <option key={niche} value={niche}>{niche === "all" ? "All Niches" : niche}</option>
                ))}
              </select>

              <select value={filters.followers} onChange={(e) => setFilters({ ...filters, followers: e.target.value })} className="px-3 py-2.5 rounded-lg bg-secondary border border-border/50">
                <option value="all">All Followers</option>
                <option value="lt200">Under 200K</option>
                <option value="200to500">200K - 500K</option>
                <option value="gt500">500K+</option>
              </select>

              <select value={filters.sortBy} onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })} className="px-3 py-2.5 rounded-lg bg-secondary border border-border/50">
                <option value="fit_desc">Sort: Fit Score</option>
                <option value="engagement_desc">Sort: Engagement</option>
                <option value="cost_asc">Sort: Cost Low to High</option>
                <option value="cost_desc">Sort: Cost High to Low</option>
              </select>
            </div>

            <div className="grid sm:grid-cols-3 gap-3 mt-3">
              <label className="text-xs text-muted-foreground">
                Min Engagement: {filters.minEngagement}%
                <input
                  type="range"
                  min="0"
                  max="8"
                  step="0.1"
                  value={filters.minEngagement}
                  onChange={(e) => setFilters({ ...filters, minEngagement: e.target.value })}
                  className="w-full"
                />
              </label>

              <select value={filters.country} onChange={(e) => setFilters({ ...filters, country: e.target.value })} className="px-3 py-2.5 rounded-lg bg-secondary border border-border/50 h-10 self-end">
                {countries.map((country) => (
                  <option key={country} value={country}>{country === "all" ? "All Countries" : country}</option>
                ))}
              </select>

              <Button
                variant="ghost"
                className="h-10 self-end"
                onClick={() => setFilters(initialFilters)}
              >
                Reset Filters
              </Button>
            </div>
          </div>

          <div className="grid lg:grid-cols-4 gap-6">
            <div className="lg:col-span-1 space-y-3">
              <div className="bg-card rounded-xl p-4 border border-border/60 shadow-card">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-accent" />
                  Saved Creator Lists
                </h3>
                <div className="flex gap-2 mb-3">
                  <input
                    value={newListName}
                    onChange={(e) => setNewListName(e.target.value)}
                    placeholder="New list name"
                    className="flex-1 px-3 py-2 rounded-lg bg-secondary border border-border/50 text-sm"
                  />
                  <Button size="sm" variant="outline" onClick={addList}>Create</Button>
                </div>
                <select value={selectedList} onChange={(e) => setSelectedList(e.target.value)} className="w-full mb-2 px-3 py-2 rounded-lg bg-secondary border border-border/50 text-sm">
                  <option value="">Select list</option>
                  {lists.map((list) => (
                    <option key={list.name} value={list.name}>
                      {list.name} ({list.creatorIds.length})
                    </option>
                  ))}
                </select>
                <Button size="sm" className="w-full" variant="accent" onClick={addSelectedToList}>
                  <Plus className="w-4 h-4" />
                  Add Selected Creator
                </Button>
              </div>

              {loading ? (
                <div className="space-y-3">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <div key={idx} className="p-4 rounded-xl border border-border/60 bg-card">
                      <Skeleton className="h-4 w-2/3 mb-2" />
                      <Skeleton className="h-3 w-1/2 mb-2" />
                      <Skeleton className="h-3 w-full" />
                    </div>
                  ))}
                </div>
              ) : filteredCreators.length === 0 ? (
                <div className="bg-card rounded-xl p-6 border border-border/60 text-center">
                  <Sparkles className="w-8 h-8 text-muted-foreground/60 mx-auto mb-2" />
                  <p className="font-medium">No creators match these filters</p>
                  <p className="text-sm text-muted-foreground mb-3">Try broadening follower range or lowering min engagement.</p>
                  <Button size="sm" variant="outline" onClick={() => setFilters(initialFilters)}>Clear Filters</Button>
                </div>
              ) : (
                filteredCreators.map((creator) => {
                  const PlatformIcon = getPlatformIcon(creator.platform);
                  return (
                    <button
                      key={creator.id}
                      onClick={() => setSelectedId(creator.id)}
                      className={`w-full text-left p-4 rounded-xl border transition-all ${
                        selectedCreator?.id === creator.id
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
                              {formatFollowers(creator.followers)}
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
                })
              )}
            </div>

            <div className="lg:col-span-3 space-y-6">
              {selectedCreator ? (
                <>
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
                              {formatFollowers(selectedCreator.followers)} followers
                            </span>
                            <span className="px-2 py-0.5 rounded-full bg-secondary text-xs font-medium text-secondary-foreground">
                              {selectedCreator.engagementRate}% engagement
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="accent" onClick={addSelectedToList}>
                          <Plus className="w-4 h-4" />
                          Add to List
                        </Button>
                        <Button variant="outline" asChild>
                          <Link to={`/brands/creator/${selectedCreator.id}`}>View Full Profile</Link>
                        </Button>
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-6 pt-6 border-t border-border">
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground mb-2">Brand-Creator Fit</p>
                        <TrustScore score={selectedCreator.fitScore} size="lg" />
                        <p className="text-xs text-muted-foreground mt-2">Estimated Cost: ${selectedCreator.estimatedCost}</p>
                      </div>
                      <div className="space-y-3">
                        <CompatibilityMeter label="Audience Overlap" score={fitBreakdown.audienceOverlap} />
                        <CompatibilityMeter label="Tone Alignment" score={fitBreakdown.toneAlignment} />
                        <CompatibilityMeter label="Content Style" score={fitBreakdown.contentStyle} />
                        <CompatibilityMeter label="Workflow Fit" score={fitBreakdown.workflowFit} />
                      </div>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="bg-card rounded-2xl p-6 border border-border/60 shadow-card">
                      <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-trust-high" />
                        Opportunity Signals
                      </h3>
                      <div className="space-y-3">
                        <InsightCard title="Excellent audience match" description="78% overlap with your target demographic" variant="positive" />
                        <InsightCard title="Consistent content quality" description="High production value across recent posts" variant="positive" />
                      </div>
                    </div>
                    <div className="bg-card rounded-2xl p-6 border border-border/60 shadow-card">
                      <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 text-trust-medium" />
                        Risk Signals
                      </h3>
                      <div className="space-y-3">
                        <InsightCard title="Busy schedule ahead" description="Has active campaign commitments this month" variant="warning" />
                        <InsightCard title="Pricing variability" description="Rates can increase in peak campaign periods" variant="warning" />
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="bg-card rounded-2xl p-12 border border-border/60 shadow-card text-center">
                  <Sparkles className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-foreground mb-2">Select a creator</h3>
                  <p className="text-muted-foreground">Choose a creator from the list to view insights and compatibility analysis.</p>
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
