import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, FileCheck, Shield, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-background pt-20 pb-32">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute top-60 -left-40 h-80 w-80 rounded-full bg-accent/5 blur-3xl" />
      </div>

      <div className="container relative mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary">
              <Zap className="h-3.5 w-3.5" />
              Gestão documental simplificada
            </span>
          </motion.div>

          <motion.h1
            className="mt-6 font-display text-5xl font-800 leading-tight tracking-tight text-foreground md:text-7xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Pare de receber{" "}
            <span className="gradient-primary bg-clip-text text-transparent">
              documentos
            </span>{" "}
            pelo WhatsApp
          </motion.h1>

          <motion.p
            className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            O ContabilFlow centraliza o envio de documentos entre seu escritório
            contábil e seus clientes. Sem mais documentos perdidos, sem mais
            atrasos.
          </motion.p>

          <motion.div
            className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Button asChild size="lg" className="gradient-primary border-0 px-8 text-base font-semibold text-primary-foreground shadow-lg hover:opacity-90 transition-opacity">
              <Link to="/registro">
                Começar agora
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="px-8 text-base">
              <a href="#funcionalidades">Ver funcionalidades</a>
            </Button>
          </motion.div>

          <motion.div
            className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-3"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            {[
              { icon: FileCheck, label: "Documentos organizados", desc: "Tudo em um só lugar" },
              { icon: Shield, label: "100% seguro", desc: "Dados criptografados" },
              { icon: Zap, label: "Rápido e simples", desc: "Seus clientes vão adorar" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 rounded-xl border bg-card p-4 shadow-card">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <item.icon className="h-5 w-5 text-primary" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-semibold text-foreground">{item.label}</p>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
