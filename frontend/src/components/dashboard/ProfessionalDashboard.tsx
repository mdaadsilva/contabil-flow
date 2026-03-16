import { mockCompanies, mockDocuments, mockRequests } from "@/lib/mock-data";
import { Building2, FileText, AlertTriangle, CheckCircle2, Clock, Send } from "lucide-react";
import { motion } from "framer-motion";

const ProfessionalDashboard = () => {
  const atrasadas = mockCompanies.filter((c) => c.status === "atrasado");
  const limit = 50;

  const stats = [
    {
      label: "Empresas",
      value: `${mockCompanies.length} / ${limit}`,
      icon: Building2,
      color: "text-primary",
      bg: "bg-primary/10",
    },
    {
      label: "Docs. pendentes",
      value: mockCompanies.reduce((acc, c) => acc + c.pendingDocs, 0),
      icon: AlertTriangle,
      color: "text-destructive",
      bg: "bg-destructive/10",
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

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">Dashboard <span className="text-primary text-lg ml-2 font-semibold">Pro</span></h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Gestão completa e histórico detalhado para o seu escritório.
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

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Lembretes / Notificações (Feature do PRO) */}
        <div className="lg:col-span-1 space-y-6">
          <div className="rounded-xl border bg-primary/5 p-6 border-primary/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Send className="w-24 h-24 text-primary" />
            </div>
            <h3 className="font-semibold text-primary flex items-center gap-2">
              <Send className="w-4 h-4" /> Disparos do dia
            </h3>
            <div className="mt-4">
              <span className="text-4xl font-bold text-foreground">24</span>
              <p className="text-sm text-muted-foreground mt-1">Lembretes automáticos enviados por email/WhatsApp aos clientes.</p>
            </div>
          </div>

          <div className="rounded-xl border bg-card p-6 shadow-card flex-1">
             <h2 className="font-display text-lg font-semibold text-foreground">
              Últimas solicitações
            </h2>
            <div className="mt-4 space-y-3">
              {mockRequests.slice(0, 4).map((r) => (
                <div key={r.id} className="flex flex-col gap-1 rounded-lg border bg-background p-3">
                  <div className="flex justify-between items-center">
                    <p className="text-sm font-medium text-foreground line-clamp-1">{r.title}</p>
                    <span className="rounded-full bg-warning/10 px-2 py-0.5 text-[10px] tracking-wider uppercase font-semibold text-warning">
                      {r.status}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">{r.companyName}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Empresas atrasadas (Completo) */}
        <div className="lg:col-span-2 rounded-xl border bg-card p-6 shadow-card flex flex-col">
          <h2 className="font-display text-lg font-semibold text-foreground">
            Empresas atrasadas (Radar)
          </h2>
          <p className="mb-4 text-sm text-muted-foreground">
            Acompanhe métricas detalhadas de pendências dos clientes.
          </p>
          
          <div className="flex-1 overflow-auto">
            {atrasadas.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-8 border-2 border-dashed rounded-xl">
                <CheckCircle2 className="h-12 w-12 text-success/50 mb-4" />
                <p className="text-foreground font-medium">Nenhuma empresa atrasada!</p>
                <p className="text-sm text-muted-foreground">Bom trabalho nas cobranças.</p>
              </div>
            ) : (
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-muted-foreground uppercase bg-muted/50">
                  <tr>
                    <th className="px-4 py-3 rounded-tl-lg">Empresa</th>
                    <th className="px-4 py-3">Contato</th>
                    <th className="px-4 py-3 text-center">Docs. Pendentes</th>
                    <th className="px-4 py-3 rounded-tr-lg">Último Envio</th>
                  </tr>
                </thead>
                <tbody>
                  {atrasadas.map((c) => (
                    <tr key={c.id} className="border-b last:border-0 hover:bg-muted/30 transition-colors">
                      <td className="px-4 py-3 font-medium text-foreground">{c.name}</td>
                      <td className="px-4 py-3 text-muted-foreground">{c.contact}</td>
                      <td className="px-4 py-3 text-center">
                        <span className="inline-flex rounded-full bg-destructive/10 px-2.5 py-1 text-xs font-semibold text-destructive">
                          {c.pendingDocs}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {c.lastUpload ? new Date(c.lastUpload).toLocaleDateString("pt-BR") : "--"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalDashboard;
