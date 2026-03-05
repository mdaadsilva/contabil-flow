import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FileText, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Demo: route based on email
    if (email.includes("contador")) {
      navigate("/dashboard");
    } else {
      navigate("/portal");
    }
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
            Bem-vindo de volta
          </h2>
          <p className="mt-4 text-primary-foreground/70">
            Acesse sua conta para gerenciar documentos e acompanhar pendências do seu escritório.
          </p>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex w-full items-center justify-center bg-background px-4 lg:w-1/2">
        <div className="w-full max-w-md">
          <Link to="/" className="mb-8 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Voltar ao site
          </Link>

          <div className="flex items-center gap-2 lg:hidden mb-6">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-primary">
              <FileText className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-display text-xl font-bold text-foreground">ContabilFlow</span>
          </div>

          <h1 className="font-display text-2xl font-bold text-foreground">Entrar</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Entre com suas credenciais para acessar a plataforma.
          </p>

          <form onSubmit={handleLogin} className="mt-8 space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full gradient-primary border-0 text-primary-foreground hover:opacity-90">
              Entrar
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Não tem uma conta?{" "}
            <Link to="/registro" className="font-medium text-primary hover:underline">
              Criar conta
            </Link>
          </p>

          <div className="mt-4 rounded-lg border bg-muted/50 p-3 text-xs text-muted-foreground">
            <strong>Demo:</strong> Use um e-mail com "contador" para acessar o painel do contador, ou qualquer outro para o portal do cliente.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
