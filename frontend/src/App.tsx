import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PlanProvider } from "./contexts/PlanContext";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Companies from "./pages/Companies";
import Documents from "./pages/Documents";
import Requests from "./pages/Requests";
import Notifications from "./pages/Notifications";
import ClientPortal from "./pages/ClientPortal";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <PlanProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/empresas" element={<Companies />} />
            <Route path="/dashboard/documentos" element={<Documents />} />
            <Route path="/dashboard/pendencias" element={<Requests />} />
            <Route path="/dashboard/notificacoes" element={<Notifications />} />
            <Route path="/portal" element={<ClientPortal />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </PlanProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
