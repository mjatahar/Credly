import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import InfluencerDashboard from "./pages/InfluencerDashboard";
import CampaignFitAnalysis from "./pages/CampaignFitAnalysis";
import BrandDashboard from "./pages/BrandDashboard";
import CreatorDiscovery from "./pages/CreatorDiscovery";
import Pricing from "./pages/Pricing";
import Demo from "./pages/Demo";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          
          {/* Influencer routes */}
          <Route path="/influencers" element={<InfluencerDashboard />} />
          <Route path="/influencers/campaigns" element={<CampaignFitAnalysis />} />
          <Route path="/influencers/history" element={<InfluencerDashboard />} />
          <Route path="/influencers/collaborations" element={<InfluencerDashboard />} />
          <Route path="/influencers/insights" element={<InfluencerDashboard />} />
          
          {/* Brand routes */}
          <Route path="/brands" element={<BrandDashboard />} />
          <Route path="/brands/discover" element={<CreatorDiscovery />} />
          
          {/* Common routes */}
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/demo" element={<Demo />} />
          <Route path="/login" element={<Login />} />
          
          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
