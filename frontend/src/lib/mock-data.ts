export interface Company {
  id: string;
  name: string;
  cnpj: string;
  contact: string;
  email: string;
  pendingDocs: number;
  totalDocs: number;
  lastUpload: string | null;
  status: "em_dia" | "pendente" | "atrasado";
}

export interface Document {
  id: string;
  companyId: string;
  companyName: string;
  fileName: string;
  type: string;
  month: string;
  uploadedAt: string;
  status: "pendente" | "enviado" | "aprovado";
  uploadedBy: "cliente" | "contador";
}

export interface DocumentRequest {
  id: string;
  companyId: string;
  companyName: string;
  title: string;
  description: string;
  month: string;
  status: "pendente" | "enviado" | "aprovado";
  createdAt: string;
}

export const mockCompanies: Company[] = [
  { id: "1", name: "Tech Solutions Ltda", cnpj: "12.345.678/0001-01", contact: "Maria Santos", email: "maria@techsolutions.com", pendingDocs: 3, totalDocs: 24, lastUpload: "2026-03-01", status: "pendente" },
  { id: "2", name: "Café & Sabor ME", cnpj: "98.765.432/0001-02", contact: "Pedro Lima", email: "pedro@cafesabor.com", pendingDocs: 0, totalDocs: 18, lastUpload: "2026-03-04", status: "em_dia" },
  { id: "3", name: "Construtora Horizonte", cnpj: "11.222.333/0001-03", contact: "Ana Costa", email: "ana@horizonte.com", pendingDocs: 5, totalDocs: 31, lastUpload: "2026-02-15", status: "atrasado" },
  { id: "4", name: "Farmácia Vida", cnpj: "44.555.666/0001-04", contact: "Carlos Souza", email: "carlos@farmaciavida.com", pendingDocs: 1, totalDocs: 12, lastUpload: "2026-03-03", status: "pendente" },
  { id: "5", name: "Auto Peças Central", cnpj: "77.888.999/0001-05", contact: "Roberto Alves", email: "roberto@autocentral.com", pendingDocs: 0, totalDocs: 20, lastUpload: "2026-03-05", status: "em_dia" },
  { id: "6", name: "Restaurante Bom Prato", cnpj: "22.333.444/0001-06", contact: "Lucia Ferreira", email: "lucia@bomprato.com", pendingDocs: 4, totalDocs: 8, lastUpload: "2026-01-20", status: "atrasado" },
];

export const mockDocuments: Document[] = [
  { id: "d1", companyId: "1", companyName: "Tech Solutions Ltda", fileName: "NF-001-mar2026.pdf", type: "Nota Fiscal", month: "2026-03", uploadedAt: "2026-03-01T10:30:00", status: "aprovado", uploadedBy: "cliente" },
  { id: "d2", companyId: "1", companyName: "Tech Solutions Ltda", fileName: "Extrato-bancario-fev.pdf", type: "Extrato", month: "2026-02", uploadedAt: "2026-02-28T14:00:00", status: "aprovado", uploadedBy: "cliente" },
  { id: "d3", companyId: "2", companyName: "Café & Sabor ME", fileName: "NF-vendas-mar.pdf", type: "Nota Fiscal", month: "2026-03", uploadedAt: "2026-03-04T09:15:00", status: "enviado", uploadedBy: "cliente" },
  { id: "d4", companyId: "3", companyName: "Construtora Horizonte", fileName: "Folha-pagamento-fev.xlsx", type: "Folha", month: "2026-02", uploadedAt: "2026-02-15T16:45:00", status: "aprovado", uploadedBy: "cliente" },
  { id: "d5", companyId: "4", companyName: "Farmácia Vida", fileName: "NF-compras-mar.pdf", type: "Nota Fiscal", month: "2026-03", uploadedAt: "2026-03-03T11:20:00", status: "pendente", uploadedBy: "cliente" },
];

export const mockRequests: DocumentRequest[] = [
  { id: "r1", companyId: "1", companyName: "Tech Solutions Ltda", title: "Notas fiscais de serviço - Março", description: "Enviar todas as NFs de serviço prestado em março/2026", month: "2026-03", status: "pendente", createdAt: "2026-03-01" },
  { id: "r2", companyId: "1", companyName: "Tech Solutions Ltda", title: "Extrato bancário - Março", description: "Extrato completo da conta PJ", month: "2026-03", status: "pendente", createdAt: "2026-03-01" },
  { id: "r3", companyId: "3", companyName: "Construtora Horizonte", title: "Guias de INSS - Fevereiro", description: "Enviar guias de recolhimento do INSS", month: "2026-02", status: "pendente", createdAt: "2026-02-10" },
  { id: "r4", companyId: "3", companyName: "Construtora Horizonte", title: "Contratos novos", description: "Enviar cópias dos novos contratos de obra", month: "2026-03", status: "pendente", createdAt: "2026-03-02" },
  { id: "r5", companyId: "6", companyName: "Restaurante Bom Prato", title: "Notas fiscais - Janeiro a Março", description: "Todas as notas fiscais dos últimos 3 meses", month: "2026-03", status: "pendente", createdAt: "2026-03-01" },
];
