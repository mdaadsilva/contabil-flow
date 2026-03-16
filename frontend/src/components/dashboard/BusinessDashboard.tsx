import { mockCompanies } from "@/lib/mock-data";
import { 
  Building2, 
  FileText, 
  AlertTriangle, 
  Database,
  InfinityIcon,
  Zap,
  LineChart,
  RefreshCcw
} from "lucide-react";
import { motion } from "framer-motion";

const BusinessDashboard = () => {
  const atrasadas = mockCompanies.filter((c) => c.status === "atrasado");

  const stats = [
    {
      label: "Empresas",
      value: `${mockCompanies.length}`,
      subtext: "Ilimitado",
      icon: InfinityIcon,
      color: "text-primary",
      bg: "bg-primary/10",
    },
    {
      label: "Integrações Ativas",
      value: "3",
      subtext: "Sistemas contábeis",
      icon: Database,
      color: "text-secondary",
      bg: "bg-secondary/10",
    },
    {
      label: "Automações rodando",
      value: "12",
      subtext: "Regras de negócio",
      icon: Zap,
      color: "text-accent",
      bg: "bg-accent/10",
    },
    {
      label: "Docs. pendentes globais",
      value: mockCompanies.reduce((acc, c) => acc + c.pendingDocs, 0),
      subtext: "Prioridade alta",
      icon: AlertTriangle,
      color: "text-destructive",
      bg: "bg-destructive/10",
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground flex items-center gap-2">
            Dashboard <span className="gradient-primary bg-clip-text text-transparent text-lg font-bold uppercase tracking-wider">Business</span>
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Escala máxima, relatórios completos e integrações do seu escritório.
          </p>
        </div>
        <button className="flex items-center gap-2 text-sm text-primary font-medium hover:underline">
          <FileText className="h-4 w-4" /> Exportar Relatório Consolidado
        </button>
      </div>

      {/* Stats Avançados */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            className="rounded-xl border bg-card p-5 shadow-card group hover:border-primary/50 transition-colors cursor-pointer"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                <h3 className="mt-2 text-3xl font-bold text-foreground">{stat.value}</h3>
                <p className="text-xs text-muted-foreground mt-1">{stat.subtext}</p>
              </div>
              <div className={`flex h-12 w-12 items-center justify-center rounded-xl transition-transform group-hover:scale-110 ${stat.bg}`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Status das Integrações */}
         <div className="rounded-xl border bg-card p-6 shadow-card flex flex-col">
          <h2 className="font-display text-lg font-semibold text-foreground flex items-center gap-2">
            <RefreshCcw className="h-5 w-5 text-muted-foreground" /> Sync de Integrações
          </h2>
          <div className="mt-6 space-y-4 flex-1">
            {[
              { name: "Domínio Sistemas", status: "Sincronizado", time: "Há 5 min", color: "text-success", dot: "bg-success" },
              { name: "ContaAzul", status: "Sincronizado", time: "Há 12 min", color: "text-success", dot: "bg-success" },
              { name: "Google Drive (Backup)", status: "Erro parcial", time: "Há 1 hora", color: "text-warning", dot: "bg-warning" }
            ].map((integ, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg border bg-background">
                <div className="flex items-center gap-3">
                  <div className={`h-2 w-2 rounded-full ${integ.dot}`} />
                  <div>
                    <p className="text-sm font-medium text-foreground">{integ.name}</p>
                    <p className="text-xs text-muted-foreground">{integ.time}</p>
                  </div>
                </div>
                <span className={`text-xs font-semibold ${integ.color}`}>{integ.status}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Empresas com maior gargalo */}
        <div className="lg:col-span-2 rounded-xl border bg-card p-6 shadow-card flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="font-display text-lg font-semibold text-foreground">
                Gargalos Operacionais
              </h2>
              <p className="text-sm text-muted-foreground">
                Clientes que mais impactam a produtividade da equipe.
              </p>
            </div>
            <LineChart className="h-6 w-6 text-muted-foreground/50" />
          </div>
          
          <div className="flex-1 overflow-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-muted-foreground uppercase bg-muted/50">
                <tr>
                  <th className="px-4 py-3 rounded-tl-lg">Empresa</th>
                  <th className="px-4 py-3 text-center">Tempo Médio Resposta</th>
                  <th className="px-4 py-3 text-center">Docs. Pendentes</th>
                  <th className="px-4 py-3 text-right rounded-tr-lg">Risco</th>
                </tr>
              </thead>
              <tbody>
                {atrasadas.map((c, i) => (
                  <tr key={c.id} className="border-b last:border-0 hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3 font-medium text-foreground">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                          {c.name.substring(0,2).toUpperCase()}
                        </div>
                        {c.name}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center text-muted-foreground">
                      {3 + i * 2} dias úteis
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className="inline-flex rounded-full bg-destructive/10 px-2.5 py-1 text-xs font-semibold text-destructive">
                        {c.pendingDocs} docs
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span className={`text-xs font-bold uppercase ${c.pendingDocs > 4 ? "text-destructive" : "text-warning"}`}>
                        {c.pendingDocs > 4 ? "Alto" : "Médio"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessDashboard;
