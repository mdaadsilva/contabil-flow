import { mockCompanies, mockRequests } from "@/lib/mock-data";
import { Building2, FileText, AlertTriangle, Clock } from "lucide-react";
import { motion } from "framer-motion";

const StarterDashboard = () => {
  const atrasadas = mockCompanies.filter((c) => c.status === "atrasado");
  const totalEmpresas = mockCompanies.length;
  // Limite Starter = 10 empresas
  const isNearLimit = totalEmpresas >= 8;

  const stats = [
    {
      label: "Empresas cadastradas",
      value: `${totalEmpresas} / 10`,
      icon: Building2,
      color: isNearLimit ? "text-warning" : "text-primary",
      bg: isNearLimit ? "bg-warning/10" : "bg-primary/10",
      alert: isNearLimit ? "Próximo do limite do plano" : null,
    },
    {
      label: "Docs. pendentes",
      value: mockCompanies.reduce((acc, c) => acc + c.pendingDocs, 0),
      icon: AlertTriangle,
      color: "text-destructive",
      bg: "bg-destructive/10",
    },
    {
      label: "Solicitações abertas",
      value: mockRequests.filter(r => r.status === "pendente").length,
      icon: FileText,
      color: "text-accent",
      bg: "bg-accent/10",
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">Dashboard <span className="text-muted-foreground text-lg ml-2 font-medium">Starter</span></h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Visão essencial para o seu escritório.
        </p>
      </div>

      {/* Stats Simples */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            className="rounded-xl border bg-card p-5 shadow-card relative overflow-hidden"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <div className="mt-1 flex items-baseline gap-2">
                  <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                </div>
                {stat.alert && (
                  <p className="mt-1 flex items-center gap-1 text-xs font-medium text-warning">
                    <AlertTriangle className="h-3 w-3" /> {stat.alert}
                  </p>
                )}
              </div>
              <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${stat.bg}`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Últimas pendências - Foco principal do Starter */}
        <div className="rounded-xl border bg-card p-6 shadow-card">
          <h2 className="font-display text-lg font-semibold text-foreground">
            Solicitações recentes
          </h2>
          <p className="mb-4 text-sm text-muted-foreground">
            Acompanhe o que falta os clientes enviarem.
          </p>
          <div className="space-y-3">
            {mockRequests.slice(0, 5).map((r) => (
              <div key={r.id} className="flex items-start gap-3 rounded-lg border bg-background p-3 hover:border-primary/50 transition-colors">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-warning" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{r.title}</p>
                  <p className="text-xs text-muted-foreground">{r.companyName}</p>
                </div>
                <span className="rounded-full bg-warning/10 px-2.5 py-0.5 text-[10px] uppercase tracking-wider font-semibold text-warning">
                  {r.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Empresas atrasadas (Simplificado) */}
        <div className="rounded-xl border bg-card p-6 shadow-card">
          <h2 className="font-display text-lg font-semibold text-foreground">
            Atenção Necessária
          </h2>
          <p className="mb-4 text-sm text-muted-foreground">
            Empresas com atraso no envio.
          </p>
          {atrasadas.length === 0 ? (
            <p className="text-sm text-muted-foreground">Tudo em dia 🎉</p>
          ) : (
            <div className="space-y-3">
              {atrasadas.map((c) => (
                <div key={c.id} className="flex items-center justify-between rounded-lg border bg-background p-3">
                  <div>
                    <p className="text-sm font-medium text-foreground">{c.name}</p>
                  </div>
                  <span className="text-xs font-semibold text-destructive">
                    {c.pendingDocs} docs.
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StarterDashboard;
