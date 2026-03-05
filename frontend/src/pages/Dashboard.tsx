import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { mockCompanies, mockDocuments, mockRequests } from "@/lib/mock-data";
import { Building2, FileText, AlertTriangle, CheckCircle2, Clock } from "lucide-react";
import { motion } from "framer-motion";

const stats = [
  {
    label: "Empresas",
    value: mockCompanies.length,
    icon: Building2,
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    label: "Docs. pendentes",
    value: mockCompanies.reduce((acc, c) => acc + c.pendingDocs, 0),
    icon: AlertTriangle,
    color: "text-warning",
    bg: "bg-warning/10",
  },
  {
    label: "Docs. recebidos (mês)",
    value: mockDocuments.filter((d) => d.month === "2026-03").length,
    icon: FileText,
    color: "text-accent",
    bg: "bg-accent/10",
  },
  {
    label: "Empresas em dia",
    value: mockCompanies.filter((c) => c.status === "em_dia").length,
    icon: CheckCircle2,
    color: "text-success",
    bg: "bg-success/10",
  },
];

const Dashboard = () => {
  const atrasadas = mockCompanies.filter((c) => c.status === "atrasado");

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Dashboard</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Visão geral do seu escritório contábil.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              className="rounded-xl border bg-card p-5 shadow-card"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="mt-1 text-3xl font-bold text-foreground">{stat.value}</p>
                </div>
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${stat.bg}`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Empresas atrasadas */}
          <div className="rounded-xl border bg-card p-6 shadow-card">
            <h2 className="font-display text-lg font-semibold text-foreground">
              Empresas atrasadas
            </h2>
            <p className="mb-4 text-sm text-muted-foreground">
              Clientes com documentos pendentes
            </p>
            {atrasadas.length === 0 ? (
              <p className="text-sm text-muted-foreground">Nenhuma empresa atrasada 🎉</p>
            ) : (
              <div className="space-y-3">
                {atrasadas.map((c) => (
                  <div key={c.id} className="flex items-center justify-between rounded-lg border bg-background p-3">
                    <div>
                      <p className="text-sm font-medium text-foreground">{c.name}</p>
                      <p className="text-xs text-muted-foreground">{c.contact}</p>
                    </div>
                    <span className="rounded-full bg-destructive/10 px-3 py-1 text-xs font-medium text-destructive">
                      {c.pendingDocs} pendências
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Últimas pendências */}
          <div className="rounded-xl border bg-card p-6 shadow-card">
            <h2 className="font-display text-lg font-semibold text-foreground">
              Últimas solicitações
            </h2>
            <p className="mb-4 text-sm text-muted-foreground">
              Documentos solicitados recentemente
            </p>
            <div className="space-y-3">
              {mockRequests.slice(0, 4).map((r) => (
                <div key={r.id} className="flex items-start gap-3 rounded-lg border bg-background p-3">
                  <Clock className="mt-0.5 h-4 w-4 shrink-0 text-warning" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{r.title}</p>
                    <p className="text-xs text-muted-foreground">{r.companyName}</p>
                  </div>
                  <span className="rounded-full bg-warning/10 px-2.5 py-0.5 text-xs font-medium text-warning">
                    {r.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
