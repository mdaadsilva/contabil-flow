import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { FileText, Upload, Clock, CheckCircle2, LogOut, CloudUpload } from "lucide-react";
import { Link } from "react-router-dom";
import { mockRequests, mockDocuments } from "@/lib/mock-data";
import { motion } from "framer-motion";

const ClientPortal = () => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);

  const companyRequests = mockRequests.filter((r) => r.companyId === "1");
  const companyDocs = mockDocuments.filter((d) => d.companyId === "1");

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    else if (e.type === "dragleave") setDragActive(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const files = Array.from(e.dataTransfer.files).map((f) => f.name);
    setUploadedFiles((prev) => [...prev, ...files]);
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files).map((f) => f.name);
      setUploadedFiles((prev) => [...prev, ...files]);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-lg">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-primary">
              <FileText className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-display text-lg font-bold text-foreground">ContabilFlow</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">Tech Solutions Ltda</span>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/"><LogOut className="h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground">Olá, Maria!</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Envie seus documentos e acompanhe as solicitações do seu contador.
            </p>
          </div>

          {/* Upload area */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className={`relative rounded-2xl border-2 border-dashed p-10 text-center transition-colors ${
              dragActive
                ? "border-primary bg-primary/5"
                : "border-border bg-card hover:border-primary/40"
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <CloudUpload className={`mx-auto h-12 w-12 ${dragActive ? "text-primary" : "text-muted-foreground"}`} />
            <p className="mt-4 text-lg font-semibold text-foreground">
              Arraste seus documentos aqui
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              ou clique para selecionar arquivos (PDF, imagens, planilhas)
            </p>
            <input
              type="file"
              multiple
              onChange={handleFileSelect}
              className="absolute inset-0 cursor-pointer opacity-0"
              accept=".pdf,.png,.jpg,.jpeg,.xlsx,.xls,.csv"
            />
            <Button className="mt-4 gradient-primary border-0 text-primary-foreground hover:opacity-90">
              <Upload className="mr-2 h-4 w-4" />
              Selecionar arquivos
            </Button>
          </motion.div>

          {uploadedFiles.length > 0 && (
            <div className="rounded-xl border bg-card p-5 shadow-card">
              <h3 className="text-sm font-semibold text-foreground mb-3">Arquivos selecionados</h3>
              <div className="space-y-2">
                {uploadedFiles.map((f, i) => (
                  <div key={i} className="flex items-center gap-2 rounded-lg bg-success/5 px-3 py-2 text-sm text-foreground">
                    <CheckCircle2 className="h-4 w-4 text-success" />
                    {f}
                  </div>
                ))}
              </div>
              <Button className="mt-4 gradient-primary border-0 text-primary-foreground hover:opacity-90">
                Enviar documentos
              </Button>
            </div>
          )}

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Pendências */}
            <div className="rounded-xl border bg-card p-6 shadow-card">
              <h2 className="font-display text-lg font-semibold text-foreground">
                Pendências do contador
              </h2>
              <p className="mb-4 text-sm text-muted-foreground">
                Documentos solicitados pelo seu escritório
              </p>
              {companyRequests.length === 0 ? (
                <p className="text-sm text-muted-foreground">Nenhuma pendência 🎉</p>
              ) : (
                <div className="space-y-3">
                  {companyRequests.map((r) => (
                    <div key={r.id} className="flex items-start gap-3 rounded-lg border bg-background p-3">
                      <Clock className="mt-0.5 h-4 w-4 shrink-0 text-warning" />
                      <div>
                        <p className="text-sm font-medium text-foreground">{r.title}</p>
                        <p className="text-xs text-muted-foreground">{r.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Docs enviados */}
            <div className="rounded-xl border bg-card p-6 shadow-card">
              <h2 className="font-display text-lg font-semibold text-foreground">
                Documentos enviados
              </h2>
              <p className="mb-4 text-sm text-muted-foreground">
                Seus últimos envios
              </p>
              <div className="space-y-3">
                {companyDocs.map((d) => (
                  <div key={d.id} className="flex items-center gap-3 rounded-lg border bg-background p-3">
                    <FileText className="h-4 w-4 shrink-0 text-primary" />
                    <div className="flex-1 min-w-0">
                      <p className="truncate text-sm font-medium text-foreground">{d.fileName}</p>
                      <p className="text-xs text-muted-foreground">{d.month}</p>
                    </div>
                    <span className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${
                      d.status === "aprovado" ? "bg-success/10 text-success" : "bg-warning/10 text-warning"
                    }`}>
                      {d.status === "aprovado" ? "Aprovado" : "Pendente"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ClientPortal;
