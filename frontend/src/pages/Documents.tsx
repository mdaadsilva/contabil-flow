import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { mockDocuments } from "@/lib/mock-data";
import { Input } from "@/components/ui/input";
import { Search, FileText, Download, Eye } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const statusStyle: Record<string, { label: string; className: string }> = {
  pendente: { label: "Pendente", className: "bg-warning/10 text-warning" },
  enviado: { label: "Enviado", className: "bg-primary/10 text-primary" },
  aprovado: { label: "Aprovado", className: "bg-success/10 text-success" },
};

const Documents = () => {
  const [search, setSearch] = useState("");
  const filtered = mockDocuments.filter(
    (d) =>
      d.fileName.toLowerCase().includes(search.toLowerCase()) ||
      d.companyName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Documentos</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Todos os documentos recebidos dos seus clientes.
          </p>
        </div>

        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar documento ou empresa..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((doc) => (
            <div key={doc.id} className="rounded-xl border bg-card p-5 shadow-card hover:shadow-elevated transition-shadow">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-foreground">{doc.fileName}</p>
                  <p className="text-xs text-muted-foreground">{doc.companyName}</p>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">{doc.type}</span>
                  <span className="text-xs text-muted-foreground">•</span>
                  <span className="text-xs text-muted-foreground">{doc.month}</span>
                </div>
                <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${statusStyle[doc.status].className}`}>
                  {statusStyle[doc.status].label}
                </span>
              </div>
              <div className="mt-4 flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Eye className="mr-1.5 h-3.5 w-3.5" />
                  Ver
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Download className="mr-1.5 h-3.5 w-3.5" />
                  Baixar
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Documents;
