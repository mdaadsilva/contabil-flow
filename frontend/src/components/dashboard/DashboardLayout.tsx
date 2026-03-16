import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard, Users, FileText, Bell, ClipboardList, LogOut, Menu, X, ChevronLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePlan, PlanType } from "@/contexts/PlanContext";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
  { icon: Users, label: "Empresas", path: "/dashboard/empresas" },
  { icon: FileText, label: "Documentos", path: "/dashboard/documentos" },
  { icon: ClipboardList, label: "Pendências", path: "/dashboard/pendencias" },
  { icon: Bell, label: "Notificações", path: "/dashboard/notificacoes" },
];

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { activePlan, setActivePlan } = usePlan();

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex flex-col border-r bg-sidebar transition-all duration-300 ${
          collapsed ? "w-16" : "w-64"
        } ${mobileOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        {/* Logo */}
        <div className="flex h-16 items-center justify-between border-b border-sidebar-border px-4">
          {!collapsed && (
            <Link to="/dashboard" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-primary">
                <FileText className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="font-display text-lg font-bold text-sidebar-foreground">
                ContabilFlow
              </span>
            </Link>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden rounded-md p-1 text-sidebar-foreground/60 hover:bg-sidebar-accent lg:block"
          >
            <ChevronLeft className={`h-4 w-4 transition-transform ${collapsed ? "rotate-180" : ""}`} />
          </button>
          <button className="lg:hidden text-sidebar-foreground" onClick={() => setMobileOpen(false)}>
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 space-y-1 p-3">
          {navItems.map((item) => {
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  active
                    ? "bg-sidebar-accent text-sidebar-primary"
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                } ${collapsed ? "justify-center" : ""}`}
              >
                <item.icon className="h-5 w-5 shrink-0" />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-sidebar-border p-3">
          <button
            onClick={() => navigate("/")}
            className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground transition-colors ${
              collapsed ? "justify-center" : ""
            }`}
          >
            <LogOut className="h-5 w-5 shrink-0" />
            {!collapsed && <span>Sair</span>}
          </button>
        </div>
      </aside>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-30 bg-foreground/20 backdrop-blur-sm lg:hidden" onClick={() => setMobileOpen(false)} />
      )}

      {/* Main */}
      <div className={`flex flex-1 flex-col transition-all duration-300 ${collapsed ? "lg:ml-16" : "lg:ml-64"}`}>
        {/* Top bar */}
        <header className="sticky top-0 z-20 flex h-16 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-lg lg:px-8">
          <button className="lg:hidden" onClick={() => setMobileOpen(true)}>
            <Menu className="h-5 w-5" />
          </button>
          
          <div className="flex-1" />

          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
              JS
            </div>
            <span className="hidden text-sm font-medium text-foreground sm:block">João Silva</span>
          </div>
        </header>

        <main className="flex-1 p-4 lg:p-8">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
