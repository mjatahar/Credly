import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { TrustScore } from "@/components/ui/TrustScore";
import { creators, formatFollowers } from "@/lib/mockData";
import { getProposals, saveProposal, updateProposalStatus } from "@/lib/appState";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Mail, MessageSquare, CheckCircle2, Clock3, Eye, Send } from "lucide-react";
import { toast } from "sonner";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

const statusColor = {
  sent: "bg-secondary text-secondary-foreground",
  viewed: "bg-trust-medium/10 text-trust-medium",
  accepted: "bg-trust-high/10 text-trust-high",
};

export default function CreatorProfileDetail() {
  const { creatorId } = useParams();
  const creator = creators.find((item) => item.id === creatorId);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [budget, setBudget] = useState("");
  const [timeline, setTimeline] = useState("");
  const [proposals, setProposals] = useState(() => getProposals());

  const creatorProposals = useMemo(
    () => proposals.filter((proposal) => proposal.creatorId === creatorId),
    [proposals, creatorId],
  );

  if (!creator) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-6">
            <div className="bg-card rounded-2xl p-12 border border-border/60 text-center">
              <h1 className="text-2xl font-semibold mb-2">Creator not found</h1>
              <p className="text-muted-foreground mb-4">This profile may have been moved or deleted.</p>
              <Button asChild variant="outline">
                <Link to="/brands/discover">Back to discovery</Link>
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const submitProposal = () => {
    if (!message.trim() || !budget.trim() || !timeline.trim()) {
      toast.error("Please complete message, budget, and timeline.");
      return;
    }
    const next = saveProposal({
      creatorId,
      creatorName: creator.name,
      budget,
      timeline,
      message,
      status: "sent",
      createdAt: new Date().toISOString(),
    });
    setProposals(next);
    setOpen(false);
    setMessage("");
    setBudget("");
    setTimeline("");
    toast.success("Proposal sent.");
  };

  const setStatus = (id, status) => {
    const next = updateProposalStatus(id, status);
    setProposals(next);
    toast.success(`Proposal marked ${status}.`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-6 space-y-6">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/brands" className="hover:text-foreground transition-colors">Dashboard</Link>
            <span>/</span>
            <Link to="/brands/discover" className="hover:text-foreground transition-colors">Discover Creators</Link>
            <span>/</span>
            <span className="text-foreground">{creator.name}</span>
          </div>

          <section className="bg-card rounded-2xl p-6 border border-border/60 shadow-card">
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center text-xl font-bold text-accent">
                  {creator.avatar}
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-foreground">{creator.name}</h1>
                  <p className="text-muted-foreground">{creator.handle} • {creator.location}</p>
                  <p className="text-sm text-muted-foreground mt-2 max-w-2xl">{creator.bio}</p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    <span className="px-2 py-0.5 rounded-full bg-secondary text-xs">{creator.niche}</span>
                    <span className="px-2 py-0.5 rounded-full bg-secondary text-xs">{creator.platform}</span>
                    <span className="px-2 py-0.5 rounded-full bg-secondary text-xs">{formatFollowers(creator.followers)} followers</span>
                    <span className="px-2 py-0.5 rounded-full bg-secondary text-xs">{creator.engagementRate}% engagement</span>
                  </div>
                </div>
              </div>
              <div className="space-y-2 min-w-48">
                <TrustScore score={creator.trustScore} size="lg" />
                <Dialog open={open} onOpenChange={setOpen}>
                  <DialogTrigger asChild>
                    <Button variant="accent" className="w-full">
                      <Mail className="w-4 h-4" />
                      Send Proposal
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Proposal for {creator.name}</DialogTitle>
                      <DialogDescription>Send a collaboration message and track status.</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-3">
                      <input value={budget} onChange={(e) => setBudget(e.target.value)} placeholder="Budget, e.g. $2,500 - $3,200" className="w-full px-3 py-2 rounded-lg bg-secondary border border-border/50" />
                      <input value={timeline} onChange={(e) => setTimeline(e.target.value)} placeholder="Timeline, e.g. Apr 10 - May 5, 2026" className="w-full px-3 py-2 rounded-lg bg-secondary border border-border/50" />
                      <textarea
                        rows={5}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder={`Hi ${creator.name}, we'd love to collaborate on our upcoming launch...`}
                        className="w-full px-3 py-2 rounded-lg bg-secondary border border-border/50"
                      />
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                      <Button variant="accent" onClick={submitProposal}>
                        <Send className="w-4 h-4" />
                        Send
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                <Button variant="outline" className="w-full">
                  <MessageSquare className="w-4 h-4" />
                  Open Chat
                </Button>
              </div>
            </div>
          </section>

          <section className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-card rounded-2xl p-6 border border-border/60 shadow-card">
              <h2 className="font-semibold mb-4">Audience & Performance</h2>
              <div className="grid sm:grid-cols-3 gap-3 mb-6">
                <div className="p-3 rounded-lg bg-secondary/60 border border-border/50">
                  <p className="text-xs text-muted-foreground">Audience Age</p>
                  <p className="text-sm font-semibold">{creator.audienceAge}</p>
                </div>
                <div className="p-3 rounded-lg bg-secondary/60 border border-border/50">
                  <p className="text-xs text-muted-foreground">Women Audience</p>
                  <p className="text-sm font-semibold">{creator.audienceWomen}%</p>
                </div>
                <div className="p-3 rounded-lg bg-secondary/60 border border-border/50">
                  <p className="text-xs text-muted-foreground">Avg Response Time</p>
                  <p className="text-sm font-semibold">{creator.responseTime}</p>
                </div>
              </div>

              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={creator.monthlyPerformance}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="month" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Line yAxisId="left" type="monotone" dataKey="impressions" stroke="hsl(var(--accent))" strokeWidth={2} />
                    <Line yAxisId="right" type="monotone" dataKey="engagement" stroke="hsl(var(--primary))" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-card rounded-2xl p-6 border border-border/60 shadow-card">
                <h3 className="font-semibold mb-3">Past Campaigns</h3>
                <div className="space-y-3">
                  {creator.pastCampaigns.map((campaign) => (
                    <div key={campaign.name} className="p-3 rounded-lg bg-secondary/60 border border-border/50">
                      <p className="text-sm font-medium">{campaign.name}</p>
                      <p className="text-xs text-muted-foreground">{campaign.result} • {campaign.budget} • {campaign.month}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-card rounded-2xl p-6 border border-border/60 shadow-card">
                <h3 className="font-semibold mb-3">Proposal Status</h3>
                {creatorProposals.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No proposals yet.</p>
                ) : (
                  <div className="space-y-3">
                    {creatorProposals.map((proposal) => (
                      <div key={proposal.id} className="p-3 rounded-lg bg-secondary/60 border border-border/50">
                        <div className="flex items-center justify-between mb-1">
                          <span className={`px-2 py-0.5 text-xs rounded-full ${statusColor[proposal.status]}`}>
                            {proposal.status}
                          </span>
                          <span className="text-xs text-muted-foreground">{proposal.timeline}</span>
                        </div>
                        <p className="text-xs text-muted-foreground mb-3">{proposal.budget}</p>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" onClick={() => setStatus(proposal.id, "viewed")}>
                            <Eye className="w-3.5 h-3.5" />
                            Viewed
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => setStatus(proposal.id, "accepted")}>
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            Accepted
                          </Button>
                          <Button size="sm" variant="ghost" onClick={() => setStatus(proposal.id, "sent")}>
                            <Clock3 className="w-3.5 h-3.5" />
                            Reset
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

