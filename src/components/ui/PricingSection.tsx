"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "./button";
import { Card } from "./card";
import { Check, Sparkles, Star, Shield, Clock, Users, MessageSquare } from "lucide-react";

interface PricingSectionProps {
  onSelectPlan?: (plan: {
    title: string;
    price: string;
    installments: string;
  }) => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onSelectPlan }) => {
  const [hoveredPlan, setHoveredPlan] = useState<number | null>(null);
  const [selectedInterval, setSelectedInterval] = useState<"monthly" | "yearly">("monthly");

  const plans = [
    {
      id: 1,
      name: "Básico",
      description: "Perfeito para pequenos negócios que estão começando",
      monthlyPrice: 97,
      yearlyPrice: 77,
      installments: "12x de R$8,08",
      icon: <Users className="w-5 h-5 text-[#42f587]"/>,
      features: [
        "Até 3 atendentes",
        "1.000 mensagens por mês",
        "Respostas automáticas",
        "Integração com WhatsApp",
        "Relatórios básicos",
        "Onboarding simplificado",
        "Templates prontos",
        "Suporte por email",
        "Atualizações regulares",
      ],
      isPopular: false,
      color: "from-[#42f587]/20 to-[#2ed671]/5",
      shadowColor: "#42f58730",
    },
    {
      id: 2,
      name: "Premium",
      description: "Ideal para empresas em crescimento",
      monthlyPrice: 197,
      yearlyPrice: 147,
      installments: "12x de R$16,42",
      icon: <Sparkles className="w-5 h-5 text-[#42f587]"/>,
      features: [
        "Até 10 atendentes",
        "5.000 mensagens por mês",
        "Respostas automáticas",
        "Integração com WhatsApp",
        "Agendamento automático",
        "Chatbot com IA",
        "Relatórios avançados",
        "Onboarding personalizado",
        "Suporte prioritário",
      ],
      isPopular: true,
      color: "from-[#42f587]/30 to-[#2ed671]/10",
      shadowColor: "#42f58760",
    },
    {
      id: 3,
      name: "Empresarial",
      description: "Para grandes negócios com alto volume de atendimento",
      monthlyPrice: 397,
      yearlyPrice: 297,
      installments: "12x de R$33,08",
      icon: <Shield className="w-5 h-5 text-[#42f587]"/>,
      features: [
        "Atendentes ilimitados",
        "Mensagens ilimitadas",
        "Respostas automáticas avançadas",
        "Integração multi-plataforma",
        "Agendamento automático",
        "Chatbot com IA avançada",
        "Relatórios personalizados",
        "API personalizada",
        "Gerente de conta dedicado",
        "Suporte 24/7",
      ],
      isPopular: false,
      color: "from-[#42f587]/20 to-[#2ed671]/5",
      shadowColor: "#42f58730",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const planVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 15
      },
    },
  };

  return (
    <section className="relative overflow-hidden py-20 md:py-32 bg-gradient-to-b from-slate-900 to-blue-950">
      {/* Elementos decorativos */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#42f587] to-transparent opacity-30" />
      <div className="absolute h-64 w-64 -top-32 -left-32 bg-[#1a1e3c]/30 rounded-full blur-3xl" />
      <div className="absolute h-64 w-64 bottom-20 right-10 bg-[#42f587]/10 rounded-full blur-3xl" />

      {/* Grade de pontos */}
      <div className="absolute inset-0 bg-dots [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,black,transparent)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-block mb-4 px-4 py-2 rounded-full glass-green border border-[#42f587]/30 backdrop-blur-sm"
          >
            <p className="text-sm font-medium text-white flex items-center">
              <span className="inline-block w-2 h-2 bg-[#42f587] rounded-full mr-2 animate-pulse"></span>
              Planos flexíveis
            </p>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6"
          >
            Escolha o plano perfeito para o seu negócio
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-white/70 mb-8"
          >
            Soluções flexíveis que crescem com sua empresa. Cancele a qualquer momento.
          </motion.p>

          {/* Seletor de Intervalo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="inline-flex items-center p-1 bg-slate-800/50 backdrop-blur-sm rounded-full border border-white/10 mb-8"
          >
            <button 
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                selectedInterval === "monthly"
                  ? "bg-[#42f587] text-slate-900 shadow-lg shadow-[#42f587]/20"
                  : "text-white/70 hover:text-white"
              }`}
              onClick={() => setSelectedInterval("monthly")}
            >
              Mensal
            </button>
            <button 
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                selectedInterval === "yearly"
                  ? "bg-[#42f587] text-slate-900 shadow-lg shadow-[#42f587]/20"
                  : "text-white/70 hover:text-white"
              }`}
              onClick={() => setSelectedInterval("yearly")}
            >
              <div className="flex items-center gap-1.5">
                Anual <span className="bg-indigo-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">-25%</span>
              </div>
            </button>
          </motion.div>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              variants={planVariants}
              onMouseEnter={() => setHoveredPlan(plan.id)}
              onMouseLeave={() => setHoveredPlan(null)}
              className="relative"
            >
              {plan.isPopular && (
                <div className="absolute -top-5 inset-x-0 flex justify-center z-10">
                  <div className="bg-gradient-to-r from-[#42f587] to-[#2ed671] text-slate-900 text-sm font-medium px-4 py-1 rounded-full shadow-lg shadow-[#42f587]/20">
                    Mais Popular
                  </div>
                </div>
              )}
              
              <Card className={`relative h-full rounded-[20px] overflow-hidden backdrop-blur-md bg-slate-900/60 border border-white/10 p-6 group transition-all duration-300 ${
                hoveredPlan === plan.id ? 'shadow-xl translate-y-[-4px]' : 'shadow-md'
              }`}>
                <div className="absolute inset-0 bg-gradient-to-b opacity-[0.08] pointer-events-none" />
                
                {plan.isPopular && (
                  <div className="absolute top-0 right-0">
                    <div className="w-20 h-20 bg-[#42f587]/10 rounded-bl-[40px] flex items-center justify-center">
                      <Star className="w-6 h-6 text-[#42f587]" fill="#42f587" />
                    </div>
                  </div>
                )}
                
                <div className={`absolute -top-10 -left-10 w-40 h-40 rounded-full bg-gradient-to-br ${plan.color} blur-3xl opacity-30 transition-opacity duration-500 ${
                  hoveredPlan === plan.id ? 'opacity-50' : 'opacity-30'
                }`} />
                
                {/* Cabeçalho do plano */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-full bg-[#1a1e3c] flex items-center justify-center">
                      {plan.icon}
                    </div>
                    <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                  </div>
                  <p className="text-white/60 text-sm">{plan.description}</p>
                </div>
                
                {/* Preço */}
                <div className="mb-6">
                  <div className="flex items-end">
                    <span className="text-4xl font-bold text-white">
                      {selectedInterval === "monthly" 
                        ? `R$${plan.monthlyPrice}` 
                        : `R$${plan.yearlyPrice}`}
                    </span>
                    <span className="text-white/60 ml-2 mb-1">/mês</span>
                  </div>
                  <div className="text-white/60 text-sm mt-1">
                    {selectedInterval === "monthly" ? plan.installments : `ou R$${plan.yearlyPrice * 12} anual`}
                  </div>
                  {selectedInterval === "yearly" && (
                    <div className="text-[#42f587] text-sm mt-1">
                      Economize R${(plan.monthlyPrice - plan.yearlyPrice) * 12} por ano
                    </div>
                  )}
                </div>
                
                {/* Lista de recursos */}
                <div className="mb-6 space-y-3">
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-start">
                      <div className="mr-3 mt-0.5">
                        <Check className="h-5 w-5 text-[#42f587]" />
                      </div>
                      <span className="text-white/80 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
                
                {/* Botão */}
                <div className="mt-auto pt-6">
                  <Button 
                    onClick={() => onSelectPlan && onSelectPlan({
                      title: plan.name,
                      price: selectedInterval === "monthly" ? `R$${plan.monthlyPrice}` : `R$${plan.yearlyPrice * 12}`,
                      installments: selectedInterval === "monthly" ? plan.installments : `À vista`
                    })}
                    className={`w-full rounded-full py-6 transition-all duration-300 ${
                      plan.isPopular 
                        ? 'bg-gradient-to-r from-[#42f587] to-[#2ed671] hover:from-[#3be078] hover:to-[#28d367] text-slate-900 font-semibold shadow-lg' 
                        : 'bg-white/10 hover:bg-white/20 text-white border border-white/10'
                    }`}
                  >
                    Começar {plan.isPopular && <Sparkles className="ml-2 h-4 w-4" />}
                  </Button>
                  <div className="flex items-center justify-center gap-1.5 text-white/40 text-xs mt-3">
                    <Clock className="w-3 h-3" />
                    <p>Ativação em até 24h</p>
                  </div>
                </div>
                
                {/* Borda animada */}
                {hoveredPlan === plan.id && (
                  <div className="absolute inset-0 rounded-[20px] border border-[#42f587]/30 pointer-events-none" />
                )}
              </Card>
            </motion.div>
          ))}
        </motion.div>
        
        {/* CTA final */}
        <div className="text-center mt-16">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-white/70 mb-4"
          >
            Precisa de um plano personalizado para sua empresa?
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Button 
              className="rounded-full px-8 py-6 bg-gradient-to-r from-[#42f587] to-[#2ed671] hover:from-[#3be078] hover:to-[#28d367] text-slate-900 font-semibold shadow-md"
            >
              Entre em contato
            </Button>
          </motion.div>
        </div>
        
        {/* Marcas e badges */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="flex flex-col items-center justify-center text-center p-6 rounded-[20px] bg-white/5 border border-white/10">
            <div className="text-3xl font-bold text-white mb-1">9.8/10</div>
            <div className="text-white/60 text-sm">Satisfação do cliente</div>
          </div>
          <div className="flex flex-col items-center justify-center text-center p-6 rounded-[20px] bg-white/5 border border-white/10">
            <div className="text-3xl font-bold text-white mb-1">+500</div>
            <div className="text-white/60 text-sm">Empresas atendidas</div>
          </div>
          <div className="flex flex-col items-center justify-center text-center p-6 rounded-[20px] bg-white/5 border border-white/10">
            <div className="text-3xl font-bold text-white mb-1">99.9%</div>
            <div className="text-white/60 text-sm">Tempo de atividade</div>
          </div>
          <div className="flex flex-col items-center justify-center text-center p-6 rounded-[20px] bg-white/5 border border-white/10">
            <div className="text-3xl font-bold text-white mb-1">+2M</div>
            <div className="text-white/60 text-sm">Mensagens mensais</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
