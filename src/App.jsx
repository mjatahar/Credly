import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { useEffect } from "react";
import Index from "./pages/Index";
import InfluencerDashboard from "./pages/InfluencerDashboard";
import CampaignFitAnalysis from "./pages/CampaignFitAnalysis";
import BrandDashboard from "./pages/BrandDashboard";
import CreatorDiscovery from "./pages/CreatorDiscovery";
import CreatorProfileDetail from "./pages/CreatorProfileDetail";
import CampaignBriefBuilder from "./pages/CampaignBriefBuilder";
import Pricing from "./pages/Pricing";
import Demo from "./pages/Demo";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { getThemePreference } from "@/lib/appState";
const queryClient = new QueryClient();
const App = () => {
  useEffect(() => {
    const savedTheme = getThemePreference();
    document.documentElement.classList.toggle("dark", savedTheme === "dark");
  }, []);
  return (<ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />}/>

          {/* Influencer routes */}
          <Route path="/influencers" element={<ProtectedRoute allowedRoles={["influencer"]}><InfluencerDashboard /></ProtectedRoute>}/>
          <Route path="/influencers/campaigns" element={<ProtectedRoute allowedRoles={["influencer"]}><CampaignFitAnalysis /></ProtectedRoute>}/>
          <Route path="/influencers/history" element={<ProtectedRoute allowedRoles={["influencer"]}><InfluencerDashboard /></ProtectedRoute>}/>
          <Route path="/influencers/collaborations" element={<ProtectedRoute allowedRoles={["influencer"]}><InfluencerDashboard /></ProtectedRoute>}/>
          <Route path="/influencers/insights" element={<ProtectedRoute allowedRoles={["influencer"]}><InfluencerDashboard /></ProtectedRoute>}/>

          {/* Brand routes */}
          <Route path="/brands" element={<ProtectedRoute allowedRoles={["brand"]}><BrandDashboard /></ProtectedRoute>}/>
          <Route path="/brands/discover" element={<ProtectedRoute allowedRoles={["brand"]}><CreatorDiscovery /></ProtectedRoute>}/>
          <Route path="/brands/creator/:creatorId" element={<ProtectedRoute allowedRoles={["brand"]}><CreatorProfileDetail /></ProtectedRoute>}/>
          <Route path="/brands/brief-builder" element={<ProtectedRoute allowedRoles={["brand"]}><CampaignBriefBuilder /></ProtectedRoute>}/>

          {/* Common routes */}
          <Route path="/pricing" element={<Pricing />}/>
          <Route path="/demo" element={<Demo />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/dashboard" element={<Navigate to="/login" replace />} />

          {/* Catch-all */}
          <Route path="*" element={<NotFound />}/>
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
</ThemeProvider>);
};
export default App;
