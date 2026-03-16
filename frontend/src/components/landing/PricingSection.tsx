import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";

const plans = [
  {
    name: "Starter",
    price: "R$ 59",
    description: "Para escritórios pequenos.",
    limit: "Até 10 empresas",
    features: [
      "Envio de documentos",
      "Criação de pendências",
      "Usuários básicos",
      "Dashboard simples",
    ],
    popular: false,
  },
  {
    name: "Professional",
    price: "R$ 129",
    description: "Para escritórios médios.",
    limit: "Até 50 empresas",
    features: [
      "Tudo do Starter",
      "Notificações automáticas",
      "Lembretes de pendências",
      "Histórico de documentos",
      "Múltiplos usuários do escritório",
      "Dashboard avançado",
    ],
    popular: true,
  },
  {
    name: "Business",
    price: "R$ 299",
    description: "Para escritórios grandes.",
    limit: "Empresas ilimitadas",
    features: [
      "Tudo do Professional",
      "Integração com sistemas contábeis",
      "Armazenamento maior",
      "Relatórios completos",
      "Suporte prioritário",
      "Automações",
    ],
    popular: false,
  },
];

const PricingSection = () => {
  return (
    <section id="precos" className="bg-background py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">
            Planos
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold text-foreground md:text-4xl">
            Escolha o plano ideal para seu escritório
          </h2>
          <p className="mt-4 text-muted-foreground">
            Sem taxas ocultas. Cancele quando quiser.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              className={`relative rounded-2xl border p-8 ${
                plan.popular
                  ? "border-primary bg-card shadow-elevated ring-1 ring-primary/20"
                  : "bg-card shadow-card"
              }`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full gradient-primary px-4 py-1 text-xs font-semibold text-primary-foreground">
                  Mais popular
                </span>
              )}
              <h3 className="font-display text-xl font-bold text-foreground">
                {plan.name}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">{plan.description}</p>
              <div className="mt-6">
                <span className="text-3xl font-bold tracking-tight text-foreground">{plan.price}</span>
                <span className="text-muted-foreground">/mês</span>
              </div>
              <p className="mt-2 text-sm font-medium text-primary">{plan.limit}</p>

              <ul className="mt-8 space-y-3">
                {plan.features.map((feature, j) => (
                  <li key={j} className="flex items-center gap-2 text-sm text-foreground">
                    <Check className="h-4 w-4 shrink-0 text-accent" />
                    {feature}
                  </li>
                ))}
              </ul>

              <Button
                asChild
                className={`mt-8 w-full ${
                  plan.popular
                    ? "gradient-primary border-0 text-primary-foreground hover:opacity-90"
                    : ""
                }`}
                variant={plan.popular ? "default" : "outline"}
              >
                <Link to={`/registro?plan=${plan.name.toLowerCase()}`}>Começar agora</Link>
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
