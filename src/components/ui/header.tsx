'use client';

import { useState } from "react";
import { Button } from "./button";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, MessageCircle, Users, BarChart3, Network, Smartphone, Bot, Settings, PanelRight, Lock, Fingerprint, Bell } from "lucide-react";

export function Header() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const handleMouseEnter = (menuId: string) => {
    setOpenMenu(menuId);
  };

  const handleMouseLeave = () => {
    setOpenMenu(null);
  };

  // Definindo os menus e submenus
  const menuItems = [
    { 
      id: "funcionalidades",
      label: "Funcionalidades", 
      href: "#", 
      hasSubmenu: true,
      submenu: [
        { 
          icon: <MessageCircle className="w-5 h-5 text-[var(--primary-green)]" />,
          title: "Automação de Mensagens", 
          description: "Envie mensagens automatizadas com base em gatilhos.",
          href: "#funcionalidades"
        },
        { 
          icon: <Users className="w-5 h-5 text-[var(--primary-green)]" />,
          title: "Multiusuários", 
          description: "Gerencie múltiplos atendentes em uma única conta.",
          href: "#funcionalidades"
        },
        { 
          icon: <BarChart3 className="w-5 h-5 text-[var(--primary-green)]" />,
          title: "Análise de Desempenho", 
          description: "Métricas detalhadas em tempo real.",
          href: "#funcionalidades"
        },
      ]
    },
    { 
      id: "integracoes",
      label: "Integrações", 
      href: "#", 
      hasSubmenu: true,
      submenu: [
        { 
          icon: <Network className="w-5 h-5 text-[var(--primary-green)]" />,
          title: "API Aberta", 
          description: "Conecte com seus sistemas existentes.",
          href: "#funcionalidades"
        },
        { 
          icon: <Smartphone className="w-5 h-5 text-[var(--primary-green)]" />,
          title: "Multi-Plataforma", 
          description: "WhatsApp, Instagram, Facebook e outros.",
          href: "#funcionalidades"
        },
        { 
          icon: <Bot className="w-5 h-5 text-[var(--primary-green)]" />,
          title: "Chatbots Personalizados", 
          description: "Automatize respostas com IA avançada.",
          href: "#funcionalidades"
        },
      ]
    },
    { label: "Planos", href: "#precos", hasSubmenu: false },
    { label: "Dúvidas", href: "#duvidas", hasSubmenu: false },
  ];

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 border-b border-[var(--primary-green)]/10 bg-[#121728]/95 backdrop-blur supports-[backdrop-filter]:bg-[#121728]/60 z-50"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-28">
          <div className="flex items-center gap-8">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 relative group">
              <div className="absolute -inset-2 rounded-full bg-[var(--primary-green)]/5 opacity-0 group-hover:opacity-100 transition-opacity blur-xl" />
              <Image
                src="/TAPPY - HORIZONTAL - VERDE.svg"
                alt="TappyWhats"
                width={332}
                height={332}  
                className="w-36 h-24 relative z-10"
              />
            </Link>

            {/* Menu de navegação */}
            <nav className="hidden lg:flex items-center gap-6">
              {menuItems.map((item) => (
                <div 
                  key={item.id || item.label}
                  className="relative"
                  onMouseEnter={() => item.hasSubmenu && handleMouseEnter(item.id)}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link
                    href={item.href}
                    className="flex items-center gap-1 px-1 py-2 text-sm text-white hover:text-[var(--primary-green)] transition-colors"
                    onClick={(e) => item.hasSubmenu && e.preventDefault()}
                  >
                    <span>{item.label}</span>
                    {item.hasSubmenu && (
                      <ChevronDown className={`w-4 h-4 transition-transform ${openMenu === item.id ? 'rotate-180' : ''}`} />
                    )}
                  </Link>
                  
                  {/* Megamenu */}
                  {item.hasSubmenu && (
                    <AnimatePresence>
                      {openMenu === item.id && (
                        <motion.div 
                          className="absolute top-full left-0 mt-2 w-[450px] rounded-xl bg-[#1a1e3c]/95 backdrop-blur-lg border border-[var(--primary-green)]/10 shadow-lg overflow-hidden z-50"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="p-6 grid gap-5">
                            {item.submenu?.map((submenu, index) => (
                              <Link 
                                href={submenu.href} 
                                key={index}
                                className="flex items-start gap-4 p-3 rounded-lg hover:bg-[var(--primary-green)]/10 transition-colors group"
                              >
                                <div className="mt-1 w-10 h-10 rounded-full bg-[var(--primary-green)]/10 flex items-center justify-center group-hover:bg-[var(--primary-green)]/20 transition-colors">
                                  {submenu.icon}
                                </div>
                                <div>
                                  <h4 className="text-white font-medium mb-1 group-hover:text-[var(--primary-green)] transition-colors">{submenu.title}</h4>
                                  <p className="text-white/60 text-sm">{submenu.description}</p>
                                </div>
                              </Link>
                            ))}
                          </div>
                          
                          {/* Rodapé do menu */}
                          <div className="p-4 bg-[#121728]/40 border-t border-[var(--primary-green)]/10">
                            <Link href="#funcionalidades" className="text-[var(--primary-green)]/80 text-xs flex items-center justify-center">
                              <span className="inline-block w-1.5 h-1.5 bg-[var(--primary-green)] rounded-full mr-2 animate-pulse"></span>
                              Ver todas as funcionalidades
                            </Link>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              ))}
            </nav>
          </div>

          {/* Botões de ação */}
          <div className="flex items-center gap-4">
            <Link href="#contato" className="hidden lg:flex">
              <Button
                className="bg-gradient-to-r from-[#1a1e3c] to-[#121728] text-white hover:from-[#252a4e] hover:to-[#1a2036] border border-[#252a4e]/50 shadow-md"
              >
                Contratar
              </Button>
            </Link>
            <Link href="/experimentar">
              <Button className="bg-[var(--primary-green)] hover:bg-[var(--primary-green)]/90 text-[#121728] font-medium">
                Experimentar Grátis
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
