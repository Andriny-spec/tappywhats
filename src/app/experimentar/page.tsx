'use client';

import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Chrome, MessageSquare, Bot, Zap, Download, Check, Clock, ArrowRight, BarChart3, Kanban, Users, Smartphone, Laptop, Tablet } from "lucide-react";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { FloatingContact } from "@/components/ui/FloatingContact";
import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";

export default function ExperimentarPage() {
  const [kanbanStep, setKanbanStep] = useState(0);
  const kanbanContainerRef = useRef<HTMLDivElement>(null);
  
  const kanbanSteps = [
    { title: "Lead", color: "#f97316", count: 12 },
    { title: "Em atendimento", color: "var(--primary-green)", count: 8 },
    { title: "Negociação", color: "#3b82f6", count: 5 },
    { title: "Fechamento", color: "#8b5cf6", count: 3 },
    { title: "Concluído", color: "#22c55e", count: 20 }
  ];

  const cards = [
    { name: "Maria Silva", message: "Olá, gostaria de saber mais sobre o produto", time: "10:45", status: 0 },
    { name: "João Oliveira", message: "Poderia me enviar o catálogo?", time: "09:30", status: 0 },
    { name: "Ana Costa", message: "Qual o prazo de entrega?", time: "Ontem", status: 1 },
    { name: "Carlos Pereira", message: "Vou fazer o pagamento hoje", time: "15:20", status: 2 },
    { name: "Fernanda Lima", message: "Confirmando a compra do pacote premium", time: "Agora", status: 3 }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setKanbanStep((prev) => (prev === cards.length - 1 ? 0 : prev + 1));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const benefits = [
    "Aumente suas vendas com atendimento de qualidade",
    "Organize conversas por etapas do funil de vendas",
    "Automatize mensagens de boas-vindas e follow-up",
    "Categorize clientes e priorize atendimentos",
    "Integre com suas ferramentas favoritas",
    "Acompanhe métricas e resultados em tempo real"
  ];

  return (
    <main className="min-h-screen">
      <Header />
      {/* Background Pattern */}
      <div className="fixed inset-0 bg-[#121728] -z-10 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          {Array.from({ length: 50 }).map((_, i) => (
            <div 
              key={i}
              className="absolute rounded-full bg-[var(--primary-green)]/30 blur-xl"
              style={{
                width: `${Math.random() * 10 + 5}rem`,
                height: `${Math.random() * 10 + 5}rem`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.3 + 0.1,
              }}
            />
          ))}
        </div>
        <div className="absolute inset-0 bg-[#121728]/80"></div>
      </div>

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
                Transforme seu <span className="text-[var(--primary-green)]">WhatsApp</span> em um <span className="text-[var(--primary-green)]">CRM Kanban</span>
              </h1>
              <p className="text-xl text-white/70 mb-8 max-w-3xl mx-auto">
                Organize seus leads, automatize mensagens e maximize suas vendas com nossa extensão exclusiva para Chrome que transforma seu WhatsApp Web em um sistema de vendas completo.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
            >
              <Button 
                size="lg" 
                className="bg-[var(--primary-green)] hover:bg-[var(--primary-green)]/90 h-14 px-8 text-lg text-black font-medium"
                onClick={() => {
                  // URL da Chrome Web Store (quando publicada)
                  const extensionUrl = process.env.NEXT_PUBLIC_EXTENSION_URL || 'chrome://extensions';
                  window.open(extensionUrl, '_blank');
                }}
              >
                <Chrome className="w-5 h-5 mr-2" />
                Instalar Extensão
              </Button>
              <Button 
                size="lg" 
                className="bg-blue-600/30 border border-blue-500/30 backdrop-blur-sm text-white hover:bg-blue-600/50 h-14 px-8 text-lg shadow-lg"
                onClick={() => {
                  // Scroll para a seção de benefícios
                  document.getElementById('kanban-demo')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Ver Como Funciona
              </Button>
            </motion.div>
          </div>

          {/* Kanban Animation */}
          <motion.div
            id="kanban-demo"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="max-w-5xl mx-auto relative bg-[#1A1E3C]/50 p-6 rounded-xl border border-white/10 backdrop-blur-sm shadow-2xl"
            ref={kanbanContainerRef}
          >
            {/* Cabeçalho do Kanban */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-[var(--primary-green)]/20 flex items-center justify-center">
                  <Kanban className="h-5 w-5 text-[var(--primary-green)]" />
                </div>
                <h3 className="text-xl font-medium text-white">Kanban WhatsApp</h3>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center">
                  <Users className="h-4 w-4 text-white/70" />
                </div>
                <div className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center">
                  <BarChart3 className="h-4 w-4 text-white/70" />
                </div>
              </div>
            </div>

            {/* Colunas do Kanban */}
            <div className="grid grid-cols-5 gap-4 overflow-x-auto pb-4">
              {kanbanSteps.map((step, index) => (
                <div key={index} className="min-w-[200px]">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full" style={{ backgroundColor: step.color }}></div>
                      <h4 className="text-sm font-medium text-white">{step.title}</h4>
                    </div>
                    <span className="text-xs text-white/50 bg-white/5 px-2 py-1 rounded">{step.count}</span>
                  </div>
                  
                  {/* Cards */}
                  <div className="space-y-3">
                    {cards.filter(card => card.status === index).map((card, cardIndex) => (
                      <motion.div 
                        key={cardIndex}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * cardIndex }}
                        className={`p-3 rounded-lg bg-white/5 border border-white/10 hover:border-[${step.color}]/50 transition-all cursor-pointer ${
                          kanbanStep === cardIndex ? 'ring-2 ring-[var(--primary-green)]/70' : ''
                        }`}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h5 className="text-sm font-medium text-white">{card.name}</h5>
                          <span className="text-xs text-white/40 flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {card.time}
                          </span>
                        </div>
                        <p className="text-xs text-white/60 mb-2">{card.message}</p>
                        <div className="flex justify-end">
                          <div className="flex items-center gap-1 text-xs text-[var(--primary-green)] hover:underline cursor-pointer">
                            Responder <ArrowRight className="h-3 w-3" />
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-white">
            Benefícios do <span className="text-[var(--primary-green)]">TappyWhats</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[{
              icon: Kanban,
              title: "Kanban de Conversas",
              description: "Organize seus atendimentos com um quadro Kanban completo, movendo clientes entre as etapas da sua jornada de vendas."
            }, {
              icon: Bot,
              title: "Automação Inteligente",
              description: "Automatize mensagens de boas-vindas, follow-up e respostas frequentes com nossa tecnologia de IA."
            }, {
              icon: MessageSquare,
              title: "Atendimento Multicanal",
              description: "Centralize conversas e atenda seus clientes de maneira unificada e profissional."
            }, {
              icon: BarChart3,
              title: "Análise de Desempenho",
              description: "Acompanhe métricas importantes como tempo de resposta, taxa de conversão e eficiência da sua equipe."
            }, {
              icon: Users,
              title: "Múltiplos Atendentes",
              description: "Distribua atendimentos entre diversos membros da sua equipe sem conflitos ou perda de informações."
            }, {
              icon: Zap,
              title: "Respostas Rápidas",
              description: "Use atalhos para enviar respostas padronizadas e agilizar seu atendimento."
            }].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.5 }}
                className="p-6 rounded-xl bg-white/5 border border-white/10 hover:border-[var(--primary-green)]/30 transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-[var(--primary-green)]/20 flex items-center justify-center mb-5">
                  <feature.icon className="w-6 h-6 text-[var(--primary-green)]" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white">{feature.title}</h3>
                <p className="text-white/60">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Checklist Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-[var(--primary-green)]/10 blur-[100px] -z-10"></div>
        
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="w-full lg:w-1/2 relative">
              {/* Animação de dispositivos */}
              <div className="relative h-[500px] w-full">
                <motion.div 
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30"
                  animate={{ 
                    scale: [1, 1.05, 1],
                    rotate: [0, 2, 0, -2, 0],
                  }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 5,
                    ease: "easeInOut" 
                  }}
                >
                  {/* Smartphone no centro */}
                  <div className="relative w-[220px] h-[400px] bg-[#1A1E3C] rounded-3xl border-4 border-[#252a4e] shadow-xl overflow-hidden p-2">
                    <div className="absolute top-[50%] left-[50%] w-[30px] h-[4px] -translate-x-1/2 -translate-y-[170px] bg-[#353e6c] rounded-full"></div>
                    <div className="h-full w-full bg-[#121728] rounded-2xl overflow-hidden relative">
                      {/* Interface do WhatsApp na tela */}
                      <div className="p-3">
                        <div className="h-10 bg-[var(--primary-green)]/90 rounded-t-lg flex items-center px-3">
                          <div className="w-8 h-8 rounded-full bg-white/20 mr-2"></div>
                          <div className="flex-1">
                            <div className="h-3 w-24 bg-white/60 rounded-full"></div>
                            <div className="h-2 w-16 bg-white/30 rounded-full mt-1"></div>
                          </div>
                        </div>
                        <div className="bg-[#0d1117]/80 h-[300px] p-2 flex flex-col">
                          {/* Mensagens animadas */}
                          <motion.div 
                            className="self-start max-w-[80%] bg-[#1a1e3c] p-2 rounded-lg mb-2"
                            initial={{ x: -50, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.5, duration: 0.5 }}
                          >
                            <div className="h-2 w-28 bg-white/60 rounded-full mb-1"></div>
                            <div className="h-2 w-20 bg-white/60 rounded-full"></div>
                          </motion.div>
                          
                          <motion.div 
                            className="self-end max-w-[80%] bg-[var(--primary-green)]/20 p-2 rounded-lg mb-2"
                            initial={{ x: 50, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 1.0, duration: 0.5 }}
                          >
                            <div className="h-2 w-32 bg-[var(--primary-green)]/60 rounded-full mb-1"></div>
                            <div className="h-2 w-24 bg-[var(--primary-green)]/60 rounded-full"></div>
                          </motion.div>
                          
                          <motion.div 
                            className="self-start max-w-[80%] bg-[#1a1e3c] p-2 rounded-lg"
                            initial={{ x: -50, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 1.5, duration: 0.5 }}
                          >
                            <div className="h-2 w-24 bg-white/60 rounded-full mb-1"></div>
                            <div className="h-2 w-32 bg-white/60 rounded-full"></div>
                          </motion.div>
                        </div>
                        <div className="h-12 bg-[#0d1117] flex items-center px-3 gap-2">
                          <div className="w-8 h-8 rounded-full bg-[#1a1e3c] flex items-center justify-center">
                            <div className="w-4 h-4 rounded-full bg-[var(--primary-green)]/50"></div>
                          </div>
                          <div className="flex-1 h-8 bg-[#1a1e3c] rounded-full"></div>
                          <div className="w-8 h-8 rounded-full bg-[var(--primary-green)]/20 flex items-center justify-center">
                            <div className="w-3 h-3 rounded-full bg-[var(--primary-green)]/70"></div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Elemento flutuante da TappyWhats */}
                      <motion.div 
                        className="absolute top-20 right-4 bg-[var(--primary-green)] rounded-lg p-2 shadow-lg shadow-[var(--primary-green)]/30"
                        animate={{ 
                          y: [0, -10, 0],
                          opacity: [0.8, 1, 0.8],
                        }}
                        transition={{ 
                          repeat: Infinity,
                          duration: 3,
                          ease: "easeInOut"
                        }}
                      >
                        <div className="flex items-center">                           
                          <div className="h-2 w-14 bg-white/70 rounded-full"></div>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
                
                {/* Elementos flutuantes ao redor */}
                <motion.div 
                  className="absolute top-[20%] left-[10%] transform -rotate-12"
                  animate={{ 
                    y: [0, -15, 0],
                    x: [0, 10, 0],
                    rotate: [-12, -8, -12]
                  }}
                  transition={{ 
                    repeat: Infinity,
                    duration: 7,
                    ease: "easeInOut"
                  }}
                >
                  <div className="w-24 h-24 rounded-xl bg-[var(--primary-green)]/10 backdrop-blur-sm border border-[var(--primary-green)]/20 flex items-center justify-center">
                    <Kanban className="w-12 h-12 text-[var(--primary-green)]/70" />
                  </div>
                </motion.div>
                
                <motion.div 
                  className="absolute bottom-[15%] right-[15%] transform rotate-12"
                  animate={{ 
                    y: [0, 15, 0],
                    x: [0, -10, 0],
                    rotate: [12, 8, 12]
                  }}
                  transition={{ 
                    repeat: Infinity,
                    duration: 8,
                    ease: "easeInOut"
                  }}
                >
                  <div className="w-20 h-20 rounded-xl bg-[#1a1e3c]/80 backdrop-blur-sm border border-white/10 flex items-center justify-center">
                    <Bot className="w-10 h-10 text-[var(--primary-green)]/70" />
                  </div>
                </motion.div>
                
                <motion.div 
                  className="absolute bottom-[30%] left-[5%] transform -rotate-6"
                  animate={{ 
                    y: [0, 10, 0],
                    x: [0, 5, 0],
                    rotate: [-6, -10, -6]
                  }}
                  transition={{ 
                    repeat: Infinity,
                    duration: 6,
                    ease: "easeInOut"
                  }}
                >
                  <div className="w-16 h-16 rounded-xl bg-[#1a1e3c]/70 backdrop-blur-sm border border-white/10 flex items-center justify-center">
                    <MessageSquare className="w-8 h-8 text-[var(--primary-green)]/70" />
                  </div>
                </motion.div>
              </div>
            </div>
            
            <div className="w-full lg:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-white">
                Por que escolher o <span className="text-[var(--primary-green)]">TappyWhats</span>?
              </h2>
              
              <div className="space-y-5">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index, duration: 0.5 }}
                    className="flex items-start gap-4"
                  >
                    <div className="w-6 h-6 rounded-full bg-[var(--primary-green)]/20 flex items-center justify-center flex-shrink-0 mt-1">
                      <Check className="w-4 h-4 text-[var(--primary-green)]" />
                    </div>
                    <span className="text-lg text-white/80">{benefit}</span>
                  </motion.div>
                ))}
              </div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="mt-10"
              >
                <Button
                  size="lg"
                  className="bg-[var(--primary-green)] hover:bg-[var(--primary-green)]/90 h-14 px-8 text-lg text-black font-medium"
                  onClick={() => {
                    const extensionUrl = process.env.NEXT_PUBLIC_EXTENSION_URL || 'chrome://extensions';
                    window.open(extensionUrl, '_blank');
                  }}
                >
                  <Download className="w-5 h-5 mr-2" />
                  Instalar no Chrome
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-[#1a1e3c] to-[#252a4e] rounded-2xl p-12 md:p-20 border border-white/10 relative overflow-hidden">
            <div className="absolute inset-0 overflow-hidden opacity-20">
              {Array.from({ length: 20 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute rounded-full bg-[var(--primary-green)]/30 blur-xl"
                  style={{
                    width: `${Math.random() * 15 + 5}rem`,
                    height: `${Math.random() * 15 + 5}rem`,
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    opacity: Math.random() * 0.5,
                  }}
                />
              ))}
            </div>
            
            <div className="relative z-10 text-center">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                Comece a usar <span className="text-[var(--primary-green)]">agora mesmo</span>
              </h2>
              <p className="text-xl mb-12 text-white/70 max-w-2xl mx-auto">
                Instale nossa extensão para Chrome gratuitamente e transforme seu WhatsApp
                em uma ferramenta profissional de vendas e atendimento
              </p>
              <Button 
                size="lg" 
                className="bg-[var(--primary-green)] hover:bg-[var(--primary-green)]/90 h-14 px-8 text-lg text-black font-medium"
                onClick={() => {
                  const extensionUrl = process.env.NEXT_PUBLIC_EXTENSION_URL || 'chrome://extensions';
                  window.open(extensionUrl, '_blank');
                }}
              >
                <Chrome className="w-5 h-5 mr-2" />
                Instalar Extensão Grátis
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Contact Button */}
      <FloatingContact />
      <Footer />
    </main>
  );
}
