import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { usePlan } from "@/contexts/PlanContext";
import StarterDashboard from "@/components/dashboard/StarterDashboard";
import ProfessionalDashboard from "@/components/dashboard/ProfessionalDashboard";
import BusinessDashboard from "@/components/dashboard/BusinessDashboard";

const Dashboard = () => {
  const { activePlan } = usePlan();

  return (
    <DashboardLayout>
      {activePlan === "starter" && <StarterDashboard />}
      {activePlan === "professional" && <ProfessionalDashboard />}
      {activePlan === "business" && <BusinessDashboard />}
    </DashboardLayout>
  );
};

export default Dashboard;
