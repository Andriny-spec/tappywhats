"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Search, MessageCircle, HelpCircle } from "lucide-react";
import { Button } from "./button";

const faqCategories = [
  { id: "geral", label: "Geral" },
  { id: "recursos", label: "Recursos" },
  { id: "precos", label: "Preços" },
  { id: "integracao", label: "Integração" },
  { id: "suporte", label: "Suporte" }
];

const faqItems = [
  {
    id: 1,
    question: "O que é o TappyWhats?",
    answer: "O TappyWhats é uma plataforma completa para automatizar e gerenciar suas conversas no WhatsApp. Com ele, você pode programar mensagens, criar respostas automáticas, gerenciar múltiplos atendentes e muito mais, tudo através de uma interface simples e intuitiva.",
    category: "geral",
    featured: true
  },
  {
    id: 2,
    question: "Como funciona a integração com o WhatsApp?",
    answer: "A integração com o WhatsApp é feita através da API oficial do WhatsApp Business. Você só precisa escanear um QR code para conectar seu número e começar a usar. Toda a implementação é segura e em conformidade com os termos de serviço do WhatsApp.",
    category: "integracao",
    featured: true
  },
  {
    id: 3,
    question: "Posso cancelar minha assinatura a qualquer momento?",
    answer: "Sim, você pode cancelar sua assinatura a qualquer momento sem multas ou taxas adicionais. Sua conta permanecerá ativa até o final do período já pago.",
    category: "precos",
    featured: false
  },
  {
    id: 4,
    question: "Quantos atendentes posso adicionar à minha conta?",
    answer: "O número de atendentes depende do plano escolhido. O plano Básico permite até 3 atendentes, o Premium até 10, e o Empresarial oferece atendentes ilimitados.",
    category: "recursos",
    featured: true
  },
  {
    id: 5,
    question: "Como funciona o suporte técnico?",
    answer: "Oferecemos suporte por email para todos os planos. Para os planos Premium e Empresarial, disponibilizamos suporte prioritário e, no plano Empresarial, você tem um gerente de conta dedicado e suporte 24/7.",
    category: "suporte",
    featured: false
  },
  {
    id: 6,
    question: "É possível integrar o TappyWhats com outros sistemas?",
    answer: "Sim, o TappyWhats oferece APIs e webhooks que permitem integração com diversos sistemas como CRMs, ERPs e plataformas de e-commerce. No plano Empresarial, você tem acesso a uma API personalizada para necessidades específicas.",
    category: "integracao",
    featured: false
  },
  {
    id: 7,
    question: "Quais formas de pagamento são aceitas?",
    answer: "Aceitamos cartões de crédito de todas as bandeiras principais, PIX, boleto bancário e transferência bancária para planos empresariais.",
    category: "precos",
    featured: false
  },
  {
    id: 8,
    question: "O TappyWhats funciona em dispositivos móveis?",
    answer: "Sim, o TappyWhats é totalmente responsivo e funciona em qualquer dispositivo, seja desktop, tablet ou smartphone. Também oferecemos aplicativos nativos para Android e iOS para uma experiência ainda melhor.",
    category: "recursos",
    featured: false
  },
  {
    id: 9,
    question: "É possível usar o TappyWhats com números de WhatsApp internacionais?",
    answer: "Sim, você pode usar o TappyWhats com números de WhatsApp de qualquer país. Nossa plataforma é global e suporta múltiplos idiomas.",
    category: "recursos",
    featured: false
  },
  {
    id: 10,
    question: "Como funciona o chatbot com IA?",
    answer: "Nosso chatbot com IA utiliza tecnologia avançada de processamento de linguagem natural para entender e responder às mensagens dos seus clientes de forma inteligente. Você pode treinar o bot com suas próprias informações e personalizar seu comportamento.",
    category: "recursos",
    featured: true
  },
  {
    id: 11,
    question: "Quanto tempo leva para começar a usar o TappyWhats?",
    answer: "Você pode começar a usar o TappyWhats em minutos. Após a inscrição, basta conectar seu número de WhatsApp via QR code e configurar suas preferências iniciais. Nossa equipe oferece um onboarding completo para ajudar você a configurar tudo rapidamente.",
    category: "geral",
    featured: false
  },
  {
    id: 12,
    question: "O TappyWhats é seguro?",
    answer: "Absolutamente. Investimos em segurança de ponta a ponta, criptografia de dados e estamos em conformidade com a LGPD. Seus dados e conversas estão sempre protegidos em nossa plataforma.",
    category: "geral",
    featured: true
  },
];

type FAQItemProps = {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
  featured?: boolean;
};

const FAQItem: React.FC<FAQItemProps> = ({ question, answer, isOpen, onToggle, featured }) => {
  return (
    <motion.div 
      className={`border-b border-white/10 overflow-hidden ${featured ? 'bg-gradient-to-r from-[#1a1e3c]/30 via-[#42f587]/5 to-[#1a1e3c]/30 rounded-xl my-2 p-0.5' : ''}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      <div className={`${featured ? 'bg-slate-900/95 rounded-lg' : ''}`}>
        <button
          onClick={onToggle}
          className={`w-full flex items-center justify-between py-5 px-4 text-left transition-all duration-200 ${isOpen ? 'text-white' : 'text-white/80 hover:text-white'}`}
        >
          <div className="flex items-center">
            {featured && (
              <span className="mr-3 flex-shrink-0">
                <motion.div 
                  className="w-2 h-2 rounded-full bg-[#42f587]"
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </span>
            )}
            <h3 className={`text-lg font-medium ${featured ? 'text-white' : ''}`}>{question}</h3>
          </div>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="flex-shrink-0 ml-2"
          >
            <ChevronDown className={`w-5 h-5 ${isOpen ? 'text-[#42f587]' : 'text-white/50'}`} />
          </motion.div>
        </button>
        
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="p-5 pt-0 text-white/70 leading-relaxed">
                {answer}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export const FAQSection = () => {
  const [activeTab, setActiveTab] = useState<string>("geral");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [openFAQs, setOpenFAQs] = useState<number[]>([]);
  const [floatingQuestion, setFloatingQuestion] = useState<{x: number, y: number, question: string, delay: number}[]>([]);
  
  // Gerar questões flutuantes para efeito visual
  React.useEffect(() => {
    const questions = faqItems.map(item => item.question).slice(0, 15);
    
    const newFloatingQuestions = [];
    for (let i = 0; i < 10; i++) {
      newFloatingQuestions.push({
        x: Math.random() * 100,
        y: Math.random() * 100,
        question: questions[Math.floor(Math.random() * questions.length)],
        delay: Math.random() * 15
      });
    }
    
    setFloatingQuestion(newFloatingQuestions);
  }, []);
  
  const toggleFAQ = (id: number) => {
    if (openFAQs.includes(id)) {
      setOpenFAQs(openFAQs.filter(faqId => faqId !== id));
    } else {
      setOpenFAQs([...openFAQs, id]);
    }
  };

  const filteredFAQs = faqItems
    .filter(item => 
      (activeTab === "all" || item.category === activeTab) &&
      (searchTerm === "" || 
        item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchTerm.toLowerCase()))
    );

  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-gradient-to-b from-blue-950 to-slate-900">
      {/* Elementos de fundo decorativos */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#42f587] to-transparent opacity-30" />
      <div className="absolute inset-0 bg-dots [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,black,transparent)]" />
      
      {/* "Bolhas" de perguntas flutuantes para efeito visual */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {floatingQuestion.map((item, i) => (
          <motion.div
            key={i}
            className="absolute text-xs md:text-sm text-white/10 font-light max-w-[200px] truncate"
            style={{
              left: `${item.x}%`,
              top: `${item.y}%`,
            }}
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: [0, 0.2, 0],
              y: [0, -30],
              x: Math.random() > 0.5 ? [0, 10] : [0, -10]
            }}
            transition={{
              repeat: Infinity,
              duration: 10 + item.delay,
              delay: item.delay,
              ease: "easeInOut"
            }}
          >
            {item.question}
          </motion.div>
        ))}
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-block mb-4 px-4 py-2 rounded-full glass-green border border-[#42f587]/30 backdrop-blur-sm"
          >
            <p className="text-sm font-medium text-white flex items-center">
              <HelpCircle className="w-4 h-4 mr-2 text-[#42f587]" />
              Dúvidas frequentes
            </p>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6"
          >
            Tudo o que você precisa saber
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-white/70 mb-8 max-w-3xl mx-auto"
          >
            Encontre respostas para as perguntas mais comuns sobre o TappyWhats. 
            Se você não encontrar o que procura, entre em contato com nossa equipe.
          </motion.p>
          
          {/* Caixa de pesquisa */}
          <motion.div 
            className="relative max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-white/40" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-10 py-4 bg-slate-800/40 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#42f587]/50 backdrop-blur-sm"
                placeholder="Pesquisar pergunta ou resposta..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setSearchTerm("")}
                >
                  <span className="text-white/40 hover:text-white">Limpar</span>
                </button>
              )}
            </div>
            
            {/* Animação na borda quando pesquisando */}
            {searchTerm && (
              <motion.div 
                className="absolute inset-0 rounded-xl border-2 border-[#42f587]/30 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />
            )}
          </motion.div>
          
          {/* Tabs de categorias */}
          <motion.div 
            className="flex flex-wrap justify-center gap-2 mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <button
              onClick={() => setActiveTab("all")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeTab === "all" 
                  ? "bg-[#42f587] text-slate-900" 
                  : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"
              }`}
            >
              Todas
            </button>
            
            {faqCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveTab(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeTab === category.id 
                    ? "bg-[#42f587] text-slate-900" 
                    : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"
                }`}
              >
                {category.label}
              </button>
            ))}
          </motion.div>
        </div>
        
        {/* Lista de FAQs */}
        <div className="max-w-3xl mx-auto">
          {filteredFAQs.length > 0 ? (
            <div className="space-y-4">
              {filteredFAQs.map((faq) => (
                <FAQItem
                  key={faq.id}
                  question={faq.question}
                  answer={faq.answer}
                  isOpen={openFAQs.includes(faq.id)}
                  onToggle={() => toggleFAQ(faq.id)}
                  featured={faq.featured}
                />
              ))}
            </div>
          ) : (
            <motion.div 
              className="text-center py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/5 mb-4">
                <Search className="h-8 w-8 text-[#42f587]/50" />
              </div>
              <h3 className="text-xl font-medium text-white mb-2">Nenhum resultado encontrado</h3>
              <p className="text-white/60 mb-6">Tente pesquisar com outros termos ou entre em contato conosco.</p>
              <Button 
                className="bg-gradient-to-r from-[#42f587] to-[#2ed671] hover:from-[#3be078] hover:to-[#28d367] text-slate-900 font-semibold rounded-full"
              >
                Falar com suporte
              </Button>
            </motion.div>
          )}
        </div>
        
        {/* Área de contato adicional */}
        <motion.div 
          className="mt-20 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative p-8 md:p-12 rounded-2xl overflow-hidden">
            {/* Gradiente de fundo */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#1a1e3c] to-[#42f587]/10 rounded-2xl" />
            
            {/* Efeito vidro */}
            <div className="absolute inset-0 backdrop-blur-sm bg-slate-900/40 rounded-2xl" />
            
            {/* Conteúdo */}
            <div className="relative flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="md:w-2/3">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Ainda tem dúvidas?</h3>
                <p className="text-white/70 mb-0">
                  Nossa equipe está pronta para atender você e esclarecer qualquer questão. 
                  Entre em contato e descubra como o TappyWhats pode transformar seu atendimento.
                </p>
              </div>
              
              <div>
                <Button 
                  className="bg-gradient-to-r from-[#42f587] to-[#2ed671] hover:from-[#3be078] hover:to-[#28d367] text-slate-900 font-semibold rounded-full py-6 px-8 flex items-center gap-2"
                >
                  <MessageCircle className="h-5 w-5" />
                  Fale conosco
                </Button>
              </div>
            </div>
            
            {/* Círculos decorativos */}
            <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[#42f587]/10 blur-3xl" />
            <div className="absolute -bottom-20 -left-10 w-40 h-40 rounded-full bg-[#1a1e3c]/50 blur-3xl" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
