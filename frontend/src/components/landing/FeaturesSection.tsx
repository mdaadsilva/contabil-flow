import { motion } from "framer-motion";
import {
  Upload, FolderOpen, Bell, BarChart3, Users, FileSearch,
} from "lucide-react";

const features = [
  {
    icon: Upload,
    title: "Upload simplificado",
    description: "Seus clientes enviam documentos com drag & drop. Simples como arrastar um arquivo.",
  },
  {
    icon: FolderOpen,
    title: "Organização automática",
    description: "Documentos organizados por empresa, mês e tipo automaticamente.",
  },
  {
    icon: Bell,
    title: "Notificações inteligentes",
    description: "Lembretes automáticos para clientes que esqueceram de enviar documentos.",
  },
  {
    icon: BarChart3,
    title: "Dashboard completo",
    description: "Visão geral de pendências, documentos recebidos e status de cada cliente.",
  },
  {
    icon: Users,
    title: "Multi-cliente",
    description: "Gerencie dezenas ou centenas de empresas a partir de um único painel.",
  },
  {
    icon: FileSearch,
    title: "Controle de pendências",
    description: "Solicite documentos específicos e acompanhe o status em tempo real.",
  },
];

const FeaturesSection = () => {
  return (
    <section id="funcionalidades" className="bg-secondary/50 py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">
            Funcionalidades
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold text-foreground md:text-4xl">
            Tudo que seu escritório precisa
          </h2>
          <p className="mt-4 text-muted-foreground">
            Ferramentas pensadas para a rotina real de escritórios contábeis.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              className="group rounded-2xl border bg-card p-6 shadow-card transition-all hover:shadow-elevated"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/20">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-display text-lg font-semibold text-foreground">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
