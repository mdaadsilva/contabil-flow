import { createContext, useContext, useState, ReactNode } from "react";

export type PlanType = "starter" | "professional" | "business";

interface PlanContextType {
  activePlan: PlanType;
  setActivePlan: (plan: PlanType) => void;
}

const PlanContext = createContext<PlanContextType | undefined>(undefined);

export const PlanProvider = ({ children }: { children: ReactNode }) => {
  const [activePlan, setActivePlan] = useState<PlanType>("professional");

  return (
    <PlanContext.Provider value={{ activePlan, setActivePlan }}>
      {children}
    </PlanContext.Provider>
  );
};

export const usePlan = () => {
  const context = useContext(PlanContext);
  if (context === undefined) {
    throw new Error("usePlan must be used within a PlanProvider");
  }
  return context;
};
