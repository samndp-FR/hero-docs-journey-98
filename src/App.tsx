import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PremiumProvider } from "@/contexts/PremiumContext";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import DashboardScore from "./pages/DashboardScore";
import DashboardForm from "./pages/DashboardForm";
import DashboardDocuments from "./pages/DashboardDocuments";
import DashboardComplete from "./pages/DashboardComplete";
import ApplicationForm from "./pages/ApplicationForm";
import CRSAssessment from "./pages/CRSAssessment";
import CRSCalculator from "./pages/CRSCalculator";
import Onboarding from "./pages/Onboarding";
import Upgrade from "./pages/Upgrade";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <PremiumProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/score" element={<DashboardScore />} />
            <Route path="/dashboard/form" element={<DashboardForm />} />
            <Route path="/dashboard/documents" element={<DashboardDocuments />} />
            <Route path="/dashboard/complete" element={<DashboardComplete />} />
            <Route path="/application-form" element={<ApplicationForm />} />
            <Route path="/crs-assessment" element={<CRSAssessment />} />
            <Route path="/crs-calculator" element={<CRSCalculator />} />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/upgrade" element={<Upgrade />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </PremiumProvider>
  </QueryClientProvider>
);

export default App;
