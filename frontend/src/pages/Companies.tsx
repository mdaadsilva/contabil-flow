import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { mockCompanies } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, ShieldAlert } from "lucide-react";
import { useState } from "react";
import { usePlan } from "@/contexts/PlanContext";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

const statusLabel: Record<string, { label: string; className: string }> = {
  em_dia: { label: "Em dia", className: "bg-success/10 text-success" },
  pendente: { label: "Pendente", className: "bg-warning/10 text-warning" },
  atrasado: { label: "Atrasado", className: "bg-destructive/10 text-destructive" },
};

const planLimits = {
  starter: 10,
  professional: 50,
  business: Infinity,
};

const Companies = () => {
  const { activePlan } = usePlan();
  const [search, setSearch] = useState("");
  
  const filtered = mockCompanies.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  const currentLimit = planLimits[activePlan];
  const totalCompanies = mockCompanies.length;
  const isLimitReached = totalCompanies >= currentLimit;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground">Empresas</h1>
            <p className="mt-1 text-sm text-muted-foreground flex items-center gap-2">
              Gerencie os clientes do seu escritório. 
              <span className="font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full text-xs">
                {totalCompanies} / {currentLimit === Infinity ? "Ilimitado" : currentLimit}
              </span>
            </p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button disabled={isLimitReached} className="gradient-primary border-0 text-primary-foreground hover:opacity-90">
                <Plus className="mr-2 h-4 w-4" />
                Nova empresa
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Cadastrar empresa</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label>Nome da empresa</Label>
                  <Input placeholder="Ex: Empresa XYZ Ltda" />
                </div>
                <div className="space-y-2">
                  <Label>CNPJ</Label>
                  <Input placeholder="00.000.000/0000-00" />
                </div>
                <div className="space-y-2">
                  <Label>Contato</Label>
                  <Input placeholder="Nome do responsável" />
                </div>
                <div className="space-y-2">
                  <Label>E-mail do cliente</Label>
                  <Input type="email" placeholder="email@empresa.com" />
                </div>
                <Button className="w-full gradient-primary border-0 text-primary-foreground hover:opacity-90">
                  Cadastrar
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar empresa..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-xl border bg-card shadow-card">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Empresa</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground hidden sm:table-cell">CNPJ</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground hidden md:table-cell">Contato</th>
                  <th className="px-4 py-3 text-center font-medium text-muted-foreground">Pendências</th>
                  <th className="px-4 py-3 text-center font-medium text-muted-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((c) => (
                  <tr key={c.id} className="border-b last:border-0 hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3 font-medium text-foreground">{c.name}</td>
                    <td className="px-4 py-3 text-muted-foreground hidden sm:table-cell">{c.cnpj}</td>
                    <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">{c.contact}</td>
                    <td className="px-4 py-3 text-center">
                      <span className={`text-sm font-semibold ${c.pendingDocs > 0 ? "text-warning" : "text-success"}`}>
                        {c.pendingDocs}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${statusLabel[c.status].className}`}>
                        {statusLabel[c.status].label}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Companies;
