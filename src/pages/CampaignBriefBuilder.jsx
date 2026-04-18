import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { saveBrief, getBriefs } from "@/lib/appState";
import { FileText, Copy, Download, Printer, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

const initialForm = {
  campaignName: "",
  objective: "Brand Awareness",
  budgetMin: "",
  budgetMax: "",
  audience: "",
  platform: "Instagram",
  timeline: "",
  deliverables: "",
  tone: "",
};

export default function CampaignBriefBuilder() {
  const [form, setForm] = useState(initialForm);
  const [savedBriefs, setSavedBriefs] = useState(() => getBriefs());

  const summary = useMemo(
    () => `
Campaign: ${form.campaignName || "-"}
Objective: ${form.objective}
Budget: $${form.budgetMin || "0"} - $${form.budgetMax || "0"}
Target Audience: ${form.audience || "-"}
Primary Platform: ${form.platform}
Timeline: ${form.timeline || "-"}
Deliverables: ${form.deliverables || "-"}
Brand Tone/Notes: ${form.tone || "-"}
    `.trim(),
    [form],
  );

  const handleSave = () => {
    if (!form.campaignName || !form.audience || !form.timeline) {
      toast.error("Please fill campaign name, audience, and timeline.");
      return;
    }
    const next = saveBrief(form);
    setSavedBriefs(next);
    toast.success("Campaign brief saved.");
  };

  const copySummary = async () => {
    try {
      await navigator.clipboard.writeText(summary);
      toast.success("Brief summary copied.");
    } catch {
      toast.error("Unable to copy summary.");
    }
  };

  const downloadText = () => {
    const blob = new Blob([summary], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${(form.campaignName || "campaign-brief").replace(/\s+/g, "-").toLowerCase()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link to="/brands" className="hover:text-foreground transition-colors">Dashboard</Link>
            <span>/</span>
            <span className="text-foreground">Campaign Brief Builder</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Campaign Brief Builder</h1>
              <p className="text-muted-foreground">Create a structured brief and share it with your team and creators.</p>
            </div>
            <Button variant="outline" asChild>
              <Link to="/brands/discover">
                Find Creators
              </Link>
            </Button>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            <section className="lg:col-span-2 bg-card rounded-2xl p-6 border border-border/60 shadow-card space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <label className="text-sm">
                  <span className="text-foreground block mb-2">Campaign Name</span>
                  <input value={form.campaignName} onChange={(e) => setForm({ ...form, campaignName: e.target.value })} className="w-full px-3 py-2.5 rounded-lg bg-secondary border border-border/50" placeholder="Q2 Wellness Push"/>
                </label>
                <label className="text-sm">
                  <span className="text-foreground block mb-2">Objective</span>
                  <select value={form.objective} onChange={(e) => setForm({ ...form, objective: e.target.value })} className="w-full px-3 py-2.5 rounded-lg bg-secondary border border-border/50">
                    <option>Brand Awareness</option>
                    <option>Lead Generation</option>
                    <option>Sales Conversion</option>
                    <option>App Installs</option>
                  </select>
                </label>
                <label className="text-sm">
                  <span className="text-foreground block mb-2">Budget Min (USD)</span>
                  <input type="number" value={form.budgetMin} onChange={(e) => setForm({ ...form, budgetMin: e.target.value })} className="w-full px-3 py-2.5 rounded-lg bg-secondary border border-border/50" placeholder="2000"/>
                </label>
                <label className="text-sm">
                  <span className="text-foreground block mb-2">Budget Max (USD)</span>
                  <input type="number" value={form.budgetMax} onChange={(e) => setForm({ ...form, budgetMax: e.target.value })} className="w-full px-3 py-2.5 rounded-lg bg-secondary border border-border/50" placeholder="6000"/>
                </label>
                <label className="text-sm">
                  <span className="text-foreground block mb-2">Target Audience</span>
                  <input value={form.audience} onChange={(e) => setForm({ ...form, audience: e.target.value })} className="w-full px-3 py-2.5 rounded-lg bg-secondary border border-border/50" placeholder="Women 24-34 in metro cities"/>
                </label>
                <label className="text-sm">
                  <span className="text-foreground block mb-2">Primary Platform</span>
                  <select value={form.platform} onChange={(e) => setForm({ ...form, platform: e.target.value })} className="w-full px-3 py-2.5 rounded-lg bg-secondary border border-border/50">
                    <option>Instagram</option>
                    <option>YouTube</option>
                    <option>TikTok</option>
                  </select>
                </label>
              </div>

              <label className="text-sm block">
                <span className="text-foreground block mb-2">Timeline</span>
                <input value={form.timeline} onChange={(e) => setForm({ ...form, timeline: e.target.value })} className="w-full px-3 py-2.5 rounded-lg bg-secondary border border-border/50" placeholder="June 5 - July 18, 2026"/>
              </label>

              <label className="text-sm block">
                <span className="text-foreground block mb-2">Deliverables</span>
                <textarea value={form.deliverables} onChange={(e) => setForm({ ...form, deliverables: e.target.value })} rows={3} className="w-full px-3 py-2.5 rounded-lg bg-secondary border border-border/50" placeholder="2 Reels, 3 stories, 1 static post"/>
              </label>

              <label className="text-sm block">
                <span className="text-foreground block mb-2">Brand Tone / Notes</span>
                <textarea value={form.tone} onChange={(e) => setForm({ ...form, tone: e.target.value })} rows={3} className="w-full px-3 py-2.5 rounded-lg bg-secondary border border-border/50" placeholder="Friendly, educational, optimistic tone. Avoid hard-sell language."/>
              </label>

              <div className="flex flex-wrap gap-2">
                <Button variant="accent" onClick={handleSave}>
                  <CheckCircle2 className="w-4 h-4" />
                  Save Brief
                </Button>
                <Button variant="outline" onClick={copySummary}>
                  <Copy className="w-4 h-4" />
                  Copy Summary
                </Button>
                <Button variant="outline" onClick={downloadText}>
                  <Download className="w-4 h-4" />
                  Download
                </Button>
                <Button variant="outline" onClick={() => window.print()}>
                  <Printer className="w-4 h-4" />
                  Print / Save PDF
                </Button>
              </div>
            </section>

            <aside className="space-y-6">
              <div className="bg-card rounded-2xl p-6 border border-border/60 shadow-card">
                <h2 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-accent" />
                  Live Summary
                </h2>
                <pre className="text-xs text-muted-foreground whitespace-pre-wrap bg-secondary/50 rounded-lg p-3 border border-border/50">
                  {summary}
                </pre>
              </div>

              <div className="bg-card rounded-2xl p-6 border border-border/60 shadow-card">
                <h2 className="font-semibold text-foreground mb-3">Saved Briefs</h2>
                {savedBriefs.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No saved briefs yet.</p>
                ) : (
                  <div className="space-y-2">
                    {savedBriefs.slice(0, 5).map((brief) => (
                      <div key={brief.id} className="p-3 rounded-lg bg-secondary/50 border border-border/50">
                        <p className="text-sm font-medium text-foreground">{brief.campaignName}</p>
                        <p className="text-xs text-muted-foreground">{brief.objective} • {brief.platform}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

