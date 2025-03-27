'use client';

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import { WhatsAppKanban } from "@/components/ui/WhatsAppKanban";
import { FeaturesFlowSection } from "@/components/ui/FeaturesFlowSection";
import AlternatingFeaturesSection from "@/components/ui/AlternatingFeaturesSection";
import PricingSection from "@/components/ui/PricingSection";
import FAQSection from "@/components/ui/FAQSection";
import { FloatingContact } from "@/components/ui/FloatingContact";
import { motion, useScroll, useTransform } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import Image from "next/image";
import {
  BarChart3,
  Calendar,
  Users,
  MessageSquare,
  Megaphone,
  FileText,
  Target,
  Clock,
  AlertTriangle,
  DollarSign,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useRef } from "react";
import { useState } from "react";
import { PaymentModal } from "@/components/ui/payment-modal";

export default function Home() {
  const featuresRef = useRef<HTMLDivElement>(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<{
    title: string;
    price: string;
    installments: string;
  } | null>(null);

  const scrollFeatures = (direction: 'left' | 'right') => {
    if (featuresRef.current) {
      const scrollAmount = 400;
      featuresRef.current.scrollTo({
        left: featuresRef.current.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount),
        behavior: 'smooth'
      });
    }
  };




  return (
    <>
      <Header />
      <main className="min-h-screen pt-20 bg-gradient-to-b from-slate-900 via-blue-950 to-slate-900">
        {/* Hero Section */}
        <section className="relative min-h-[90vh] flex items-center">
          {/* Padrão de fundo estilizado */}
          <div className="absolute inset-0 bg-grid-white bg-[size:40px_40px] -z-10" />
          
          {/* Elementos decorativos */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#42f587] to-transparent opacity-30" />
          <div className="absolute h-64 w-64 -top-32 -left-32 bg-[#1a1e3c]/30 rounded-full blur-3xl" />
          <div className="absolute h-64 w-64 top-1/2 right-0 bg-[#42f587]/20 rounded-full blur-3xl" />
          
          {/* Círculos animados no fundo */}
          <motion.div 
            className="absolute h-96 w-96 rounded-full border border-white/10"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.1 }}
            transition={{ duration: 10, repeat: Infinity, repeatType: 'reverse' }}
            style={{ top: '20%', left: '10%' }}
          />
          <motion.div 
            className="absolute h-64 w-64 rounded-full border border-[#42f587]/20"
            initial={{ scale: 1, opacity: 0 }}
            animate={{ scale: 1.2, opacity: 0.2 }}
            transition={{ duration: 8, repeat: Infinity, repeatType: 'reverse' }}
            style={{ bottom: '15%', right: '15%' }}
          />
          
          {/* Grade de pontos */}
          <div className="absolute inset-0 bg-dots [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,black,transparent)]" />
          <div className="absolute h-64 w-64 top-1/3 left-1/4 bg-[#42f587]/10 rounded-full blur-3xl" />
          <div className="absolute h-96 w-96 bottom-1/3 right-1/4 bg-[#1a1e3c]/60 rounded-full blur-3xl" />
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="inline-block mb-4 px-4 py-2 rounded-full glass-green border border-[#42f587]/30 backdrop-blur-sm">
                  <p className="text-sm font-medium text-white flex items-center">
                    <span className="inline-block w-2 h-2 bg-[#42f587] rounded-full mr-2 animate-pulse"></span>
                    O maior CRM de WhatsApp do Brasil
                  </p>
                </div>
                <div className="text-5xl lg:text-7xl font-bold mb-6">
                  <TypeAnimation
                    sequence={[
                      'Pare de perder vendas no WhatsApp',
                      2000,
                      'Automatize seu atendimento',
                      2000,
                      'Organize suas negociações',
                      2000,
                      'Aumente suas conversões',
                      2000,
                      'Controle todos os seus leads',
                      2000,
                      'Agende reuniões automaticamente',
                      2000,
                      'Conquiste mais clientes',
                      2000,
                    ]}
                    wrapper="h1"
                    speed={50}
                    repeat={Infinity}
                    className="block min-h-[1.5em] text-[#42f587]"
                    cursor={true}
                  />
                </div>
                <p className="text-xl text-white/70 mb-8 max-w-md">
                  Se no final do dia você percebe que várias conversas ficaram sem resposta,
                  gerando frustração e oportunidades perdidas, o TappyWhats é a solução
                  perfeita.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-[#42f587] to-[#2ed671] hover:from-[#2ed671] hover:to-[#2ed671] text-white rounded-full px-8 py-6 text-lg"
                  >
                    TESTE GRÁTIS AGORA
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="rounded-full px-8 py-6 text-lg border-[#42f587] text-[#42f587] hover:bg-[#1a1e3c]/40 hover:border-[#42f587] glass-blue"
                  >
                    Ver demonstração
                  </Button>
                </div>
                <p className="mt-4 text-sm text-[#42f587]/80">✨ Acesso imediato • Sem cartão de crédito</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="relative"
              >
                <div className="relative h-[500px] w-full">
                  <div className="absolute inset-0 glass-green rounded-3xl" />
                  <div className="relative w-full h-full p-4">
                    <WhatsAppKanban />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Seção de Funcionalidades */}
        <FeaturesFlowSection />
        
        {/* Seção de Recursos Alternados */}
        <AlternatingFeaturesSection />
        
        {/* Seção de Planos e Preços */}
        <PricingSection 
          onSelectPlan={(plan) => {
            setSelectedPlan(plan);
            setIsPaymentModalOpen(true);
          }}
        />
        
        {/* Seção de Perguntas Frequentes */}
        <FAQSection />
      
        {/* Payment Modal */}
        <PaymentModal
          isOpen={isPaymentModalOpen}
          onClose={() => {
            setIsPaymentModalOpen(false);
            setSelectedPlan(null);
          }}
          plan={selectedPlan}
        />

     
      </main>
      <Footer />
      <FloatingContact />
    </>
  );
}
