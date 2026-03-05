import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { mockRequests, mockCompanies } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Clock } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const statusStyle: Record<string, { label: string; className: string }> = {
  pendente: { label: "Pendente", className: "bg-warning/10 text-warning" },
  enviado: { label: "Enviado", className: "bg-primary/10 text-primary" },
  aprovado: { label: "Aprovado", className: "bg-success/10 text-success" },
};

const Requests = () => {
  const [filter, setFilter] = useState("all");

  const filtered = filter === "all" ? mockRequests : mockRequests.filter((r) => r.status === filter);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground">Pendências</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Solicitações de documentos para seus clientes.
            </p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="gradient-primary border-0 text-primary-foreground hover:opacity-90">
                <Plus className="mr-2 h-4 w-4" />
                Nova solicitação
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Solicitar documento</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label>Empresa</Label>
                  <Select>
                    <SelectTrigger><SelectValue placeholder="Selecione a empresa" /></SelectTrigger>
                    <SelectContent>
                      {mockCompanies.map((c) => (
                        <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Título</Label>
                  <Input placeholder="Ex: Notas fiscais de março" />
                </div>
                <div className="space-y-2">
                  <Label>Descrição</Label>
                  <Textarea placeholder="Descreva quais documentos são necessários..." />
                </div>
                <div className="space-y-2">
                  <Label>Mês de referência</Label>
                  <Input type="month" />
                </div>
                <Button className="w-full gradient-primary border-0 text-primary-foreground hover:opacity-90">
                  Enviar solicitação
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="flex gap-2">
          {[
            { value: "all", label: "Todas" },
            { value: "pendente", label: "Pendentes" },
            { value: "enviado", label: "Enviadas" },
            { value: "aprovado", label: "Aprovadas" },
          ].map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                filter === f.value
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="space-y-3">
          {filtered.map((r) => (
            <div key={r.id} className="flex items-start gap-4 rounded-xl border bg-card p-5 shadow-card">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-warning/10">
                <Clock className="h-5 w-5 text-warning" />
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-sm font-semibold text-foreground">{r.title}</p>
                    <p className="text-xs text-muted-foreground">{r.companyName} • {r.month}</p>
                  </div>
                  <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${statusStyle[r.status].className}`}>
                    {statusStyle[r.status].label}
                  </span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{r.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Requests;
