import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FileText, ArrowLeft, CheckCircle2 } from "lucide-react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";
import { usePlan, PlanType } from "@/contexts/PlanContext";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [officeName, setOfficeName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { setActivePlan } = usePlan();

  const defaultPlan = (searchParams.get("plan") || "professional") as PlanType;
  const [selectedPlan, setSelectedPlan] = useState<PlanType>(defaultPlan);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setActivePlan(selectedPlan);
    navigate("/dashboard");
  };

  return (
    <div className="flex min-h-screen">
      {/* Left panel */}
      <div className="hidden w-1/2 items-center justify-center gradient-primary lg:flex">
        <div className="max-w-md px-8 text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-foreground/10">
            <FileText className="h-8 w-8 text-primary-foreground" />
          </div>
          <h2 className="font-display text-3xl font-bold text-primary-foreground">
            Comece a organizar
          </h2>
          <p className="mt-4 text-primary-foreground/70">
            Crie sua conta e tenha controle total sobre os documentos dos seus clientes.
          </p>
        </div>
      </div>

      <div className="flex w-full items-center justify-center bg-background px-4 lg:w-1/2">
        <div className="w-full max-w-md">
          <Link to="/" className="mb-8 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Voltar ao site
          </Link>

          <h1 className="font-display text-2xl font-bold text-foreground">Criar conta</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Cadastre seu escritório contábil na plataforma.
          </p>

          <div className="mt-6 space-y-3">
            <Label>Escolha seu plano</Label>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {[
                { id: "starter", name: "Starter", price: "R$ 59" },
                { id: "professional", name: "Professional", price: "R$ 129" },
                { id: "business", name: "Business", price: "R$ 299" },
              ].map((plan) => (
                <button
                  key={plan.id}
                  type="button"
                  onClick={() => setSelectedPlan(plan.id as PlanType)}
                  className={`relative flex flex-col items-center justify-center rounded-lg border p-3 text-center transition-all ${
                    selectedPlan === plan.id
                      ? "border-primary bg-primary/5 ring-1 ring-primary"
                      : "border-border bg-card hover:bg-muted"
                  }`}
                >
                  {selectedPlan === plan.id && (
                    <div className="absolute top-2 right-2 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      <CheckCircle2 className="h-3 w-3" />
                    </div>
                  )}
                  <span className="text-sm font-semibold">{plan.name}</span>
                  <span className="mt-1 text-xs font-medium text-muted-foreground">{plan.price}/mês</span>
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleRegister} className="mt-8 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Seu nome</Label>
              <Input id="name" placeholder="João Silva" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="officeName">Nome do escritório</Label>
              <Input id="officeName" placeholder="Silva Contabilidade" value={officeName} onChange={(e) => setOfficeName(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="regEmail">E-mail</Label>
              <Input id="regEmail" type="email" placeholder="seu@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="regPassword">Senha</Label>
              <Input id="regPassword" type="password" placeholder="Mínimo 8 caracteres" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <Button type="submit" className="w-full gradient-primary border-0 text-primary-foreground hover:opacity-90">
              Criar minha conta
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Já tem uma conta?{" "}
            <Link to="/login" className="font-medium text-primary hover:underline">
              Entrar
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
