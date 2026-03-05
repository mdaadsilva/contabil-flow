import { Button } from "@/components/ui/button";
import { FileText, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-lg">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-primary">
            <FileText className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="font-display text-xl font-bold text-foreground">
            ContabilFlow
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex">
          <a href="#funcionalidades" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Funcionalidades
          </a>
          <a href="#precos" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Preços
          </a>
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Button variant="ghost" asChild>
            <Link to="/login">Entrar</Link>
          </Button>
          <Button asChild className="gradient-primary border-0 text-primary-foreground hover:opacity-90">
            <Link to="/registro">Criar conta</Link>
          </Button>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t bg-background px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-3">
            <a href="#funcionalidades" className="text-sm font-medium text-muted-foreground" onClick={() => setMobileOpen(false)}>
              Funcionalidades
            </a>
            <a href="#precos" className="text-sm font-medium text-muted-foreground" onClick={() => setMobileOpen(false)}>
              Preços
            </a>
            <Button variant="ghost" asChild className="justify-start">
              <Link to="/login">Entrar</Link>
            </Button>
            <Button asChild className="gradient-primary border-0 text-primary-foreground">
              <Link to="/registro">Criar conta</Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
