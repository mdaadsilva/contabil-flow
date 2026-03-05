import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Bell, FileText, AlertTriangle, CheckCircle2 } from "lucide-react";

const notifications = [
  { id: 1, icon: FileText, color: "text-primary", bg: "bg-primary/10", title: "Café & Sabor ME enviou documentos", desc: "NF-vendas-mar.pdf foi enviado", time: "Há 1 hora" },
  { id: 2, icon: AlertTriangle, color: "text-warning", bg: "bg-warning/10", title: "Construtora Horizonte com pendências", desc: "5 documentos pendentes há mais de 15 dias", time: "Há 3 horas" },
  { id: 3, icon: CheckCircle2, color: "text-success", bg: "bg-success/10", title: "Documentos aprovados", desc: "2 documentos da Tech Solutions foram aprovados", time: "Há 5 horas" },
  { id: 4, icon: AlertTriangle, color: "text-destructive", bg: "bg-destructive/10", title: "Restaurante Bom Prato atrasado", desc: "Sem envio de documentos há mais de 45 dias", time: "Ontem" },
  { id: 5, icon: FileText, color: "text-primary", bg: "bg-primary/10", title: "Farmácia Vida enviou documentos", desc: "NF-compras-mar.pdf aguardando aprovação", time: "Ontem" },
];

const Notifications = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Notificações</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Acompanhe as últimas atividades dos seus clientes.
          </p>
        </div>

        <div className="space-y-3">
          {notifications.map((n) => (
            <div key={n.id} className="flex items-start gap-4 rounded-xl border bg-card p-5 shadow-card">
              <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${n.bg}`}>
                <n.icon className={`h-5 w-5 ${n.color}`} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-foreground">{n.title}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{n.desc}</p>
              </div>
              <span className="shrink-0 text-xs text-muted-foreground">{n.time}</span>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Notifications;
