"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquareText, Users, HelpCircle, X, MessageCircle } from "lucide-react";

export const FloatingContact = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Botão flutuante de WhatsApp */}
      <motion.div
        className="fixed bottom-8 right-8 z-50"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <motion.button
          onClick={toggleModal}
          className="w-16 h-16 rounded-full bg-[var(--primary-green)] flex items-center justify-center shadow-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          animate={{
            boxShadow: [
              "0 0 0 rgba(181, 255, 0, 0.4)",
              "0 0 20px rgba(181, 255, 0, 0.7)",
              "0 0 0 rgba(181, 255, 0, 0.4)",
            ],
          }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{
              repeat: Infinity,
              repeatDelay: 4,
              duration: 1.2,
              type: "spring",
            }}
          >
            <MessageCircle className="w-8 h-8 text-[#121728]" />
          </motion.div>
        </motion.button>
      </motion.div>

      {/* Modal de contato */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleModal}
            />

            {/* Modal */}
            <motion.div
              className="fixed bottom-28 right-8 w-80 md:w-96 bg-[#121728]/90 backdrop-blur-xl rounded-2xl overflow-hidden z-50 border border-[var(--primary-green)]/20 shadow-[0_0_30px_rgba(181,255,0,0.15)]"
              initial={{ y: 50, opacity: 0, scale: 0.9 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 50, opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              {/* Cabeçalho do modal */}
              <div className="relative p-5 border-b border-[var(--primary-green)]/10 flex justify-between items-center bg-gradient-to-r from-[#1a1e3c] to-[#121728]">
                <h3 className="text-white text-lg font-semibold">Contratar</h3>
                <motion.button
                  onClick={toggleModal}
                  className="w-8 h-8 rounded-full flex items-center justify-center bg-[var(--primary-green)]/10 hover:bg-[var(--primary-green)]/20 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-4 h-4 text-white" />
                </motion.button>
                
                {/* Elemento decorativo */}
                <div className="absolute -top-10 -right-10 w-20 h-20 rounded-full bg-[var(--primary-green)]/20 blur-xl" />
              </div>

              {/* Conteúdo do modal */}
              <div className="p-5 space-y-4">
                <motion.div
                  className="relative overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <ContactOption
                    icon={<Users className="w-5 h-5 text-[var(--primary-green)]" />}
                    title="Atendimento Humanizado"
                    description="Fale diretamente com um de nossos atendentes especializados."
                  />
                </motion.div>

                <motion.div
                  className="relative overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <ContactOption
                    icon={<MessageSquareText className="w-5 h-5 text-[var(--primary-green)]" />}
                    title="Atendimento Guiado"
                    description="Deixe-nos te guiar através das soluções com nosso assistente virtual."
                  />
                </motion.div>

                <motion.div
                  className="relative overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <ContactOption
                    icon={<HelpCircle className="w-5 h-5 text-[var(--primary-green)]" />}
                    title="Central de Ajuda"
                    description="Encontre respostas para as perguntas mais frequentes."
                  />
                </motion.div>
              </div>

              {/* Rodapé do modal */}
              <div className="p-4 bg-[#1a1e3c]/50 border-t border-[var(--primary-green)]/10">
                <motion.div
                  className="text-[var(--primary-green)]/80 text-xs text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <span className="inline-block w-2 h-2 bg-[var(--primary-green)] rounded-full mr-2 animate-pulse"></span>
                  Estamos online e prontos para ajudar
                </motion.div>
              </div>

              {/* Elementos decorativos */}
              <div className="absolute top-1/2 left-0 w-40 h-40 rounded-full bg-[var(--primary-green)]/5 blur-3xl -z-10" />
              <div className="absolute bottom-0 right-1/4 w-20 h-20 rounded-full bg-[var(--primary-green)]/10 blur-xl -z-10" />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

// Componente de opção de contato
interface ContactOptionProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const ContactOption: React.FC<ContactOptionProps> = ({ icon, title, description }) => {
  return (
    <motion.div
      className="p-4 rounded-xl bg-[#1a1e3c]/50 border border-[var(--primary-green)]/10 hover:bg-[#1a1e3c]/80 transition-colors cursor-pointer group"
      whileHover={{ y: -2, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex items-start">
        <div className="mt-1 w-10 h-10 rounded-full bg-[var(--primary-green)]/10 flex items-center justify-center group-hover:bg-[var(--primary-green)]/20 transition-colors">
          {icon}
        </div>
        <div className="ml-3">
          <h4 className="text-white font-medium mb-1">{title}</h4>
          <p className="text-white/60 text-sm">{description}</p>
        </div>
      </div>
      
      <motion.div 
        className="w-full flex justify-end mt-2"
        initial={{ opacity: 0, x: -10 }}
        whileHover={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.2 }}
      >
        <div className="text-[var(--primary-green)] text-xs font-medium">
          Iniciar conversa →
        </div>
      </motion.div>
    </motion.div>
  );
};
