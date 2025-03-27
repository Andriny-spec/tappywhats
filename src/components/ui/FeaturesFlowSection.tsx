'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const featuresList = [
  {
    id: 1,
    title: "Automação de Mensagens",
    description: "Envie mensagens automatizadas com base em gatilhos e ações dos seus clientes.",
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="feature-icon">
        <path d="M33.333 6.667H6.667C5.747 6.667 5 7.413 5 8.333V28.333C5 29.253 5.747 30 6.667 30H16.667L20 33.333L23.333 30H33.333C34.253 30 35 29.253 35 28.333V8.333C35 7.413 34.253 6.667 33.333 6.667Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M20 18.333C20 18.333 20.833 16.667 23.333 16.667C25.833 16.667 27.5 18.333 27.5 20.833C27.5 24.167 20 26.667 20 26.667" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="15" cy="16.667" r="1.667" strokeWidth="2" />
      </svg>
    )
  },
  {
    id: 2,
    title: "CRM Integrado",
    description: "Gerencie leads, oportunidades e vendas em um único lugar com visões personalizáveis.",
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="feature-icon">
        <path d="M30 13.333H10C8.159 13.333 6.667 14.825 6.667 16.667V30C6.667 31.841 8.159 33.333 10 33.333H30C31.841 33.333 33.333 31.841 33.333 30V16.667C33.333 14.825 31.841 13.333 30 13.333Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M26.667 33.333V10C26.667 8.895 26.315 7.836 25.69 6.982C25.065 6.129 24.203 5.533 23.214 5.297C22.224 5.061 21.185 5.2 20.286 5.691C19.387 6.183 18.687 6.991 18.333 7.95L13.333 13.333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M15 23.333L18.333 26.667L25 20" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  },
  {
    id: 3,
    title: "Atendimento Multicanal",
    description: "Tenha todos os seus canais de comunicação integrados em uma única plataforma.",
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="feature-icon">
        <path d="M15 25C17.761 25 20 22.761 20 20C20 17.239 17.761 15 15 15C12.239 15 10 17.239 10 20C10 22.761 12.239 25 15 25Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M25 35C27.761 35 30 32.761 30 30C30 27.239 27.761 25 25 25C22.239 25 20 27.239 20 30C20 32.761 22.239 35 25 35Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M25 15C27.761 15 30 12.761 30 10C30 7.239 27.761 5 25 5C22.239 5 20 7.239 20 10C20 12.761 22.239 15 25 15Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M19.5 11.667L15.833 18.333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M15.833 21.667L19.5 28.333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  },
  {
    id: 4,
    title: "Sequências Automatizadas",
    description: "Crie fluxos de comunicação personalizados por segmento de cliente e comportamento.",
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="feature-icon">
        <path d="M10 8.333H20V11.667L28.333 5L20 -1.667V1.667H6.667V15H10V8.333Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M30 31.667H20V28.333L11.667 35L20 41.667V38.333H33.333V25H30V31.667Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="5" y="15" width="10" height="10" rx="1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="25" y="15" width="10" height="10" rx="1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  },
  {
    id: 5,
    title: "Análise de Desempenho",
    description: "Métricas e relatórios detalhados sobre engajamento, conversão e ROI das suas campanhas.",
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="feature-icon">
        <path d="M35 33.333H5V6.667" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M16.667 15L10 21.667L16.667 28.333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M10 21.667H31.667" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  },
  {
    id: 6,
    title: "Integração com APIs",
    description: "Conecte-se facilmente com outras ferramentas e sistemas que sua empresa já utiliza.",
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="feature-icon">
        <path d="M16.667 28.333H10C9.291 28.333 8.602 28.070 8.07 27.596C7.538 27.123 7.209 26.475 7.141 25.779L6.667 21.667C6.613 21.14 6.686 20.608 6.881 20.118C7.076 19.627 7.386 19.192 7.784 18.85L12.5 15L15.833 19.167V28.333H16.667Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M23.333 28.333H30C30.709 28.333 31.398 28.07 31.93 27.596C32.462 27.123 32.791 26.475 32.859 25.779L33.333 21.667C33.387 21.14 33.314 20.608 33.119 20.118C32.924 19.627 32.614 19.192 32.216 18.85L27.5 15L24.167 19.167V28.333H23.333Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M16.667 28.333V33.333H23.333V28.333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M15.833 11.667L20 6.667L24.167 11.667" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M20 6.667V19.167" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  }
];

export function FeaturesFlowSection() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const pathLength = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  return (
    <section ref={sectionRef} className="py-24 relative overflow-hidden">
      {/* Fundo com grade e glassmorphism */}
      <div className="absolute inset-0 bg-grid-white bg-[size:40px_40px] -z-10 opacity-5" />
      <div className="absolute inset-0 bg-[#1a1e3c] -z-20" />
      
      {/* Linha curva de conexão melhorada */}
      <div className="absolute top-0 left-0 right-0 -mt-32 h-32 overflow-visible">
        <svg width="100%" height="100%" viewBox="0 0 1440 128" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <motion.path 
            d="M0,128 C480,0 960,0 1440,128" 
            stroke="#42f587" 
            strokeWidth="2"
            strokeDasharray="6,3"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 0.6 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5 }}
            style={{ filter: 'drop-shadow(0 0 4px rgba(66, 245, 135, 0.5))' }}
          />
        </svg>
      </div>
      
      {/* Linha vertical central que desce do ícone de seta até o início do fluxograma */}
      <div className="absolute top-[23rem] left-1/2 transform -translate-x-1/2 h-32 overflow-visible">
        <svg width="40" height="128" viewBox="0 0 40 128" fill="none" xmlns="http://www.w3.org/2000/svg">
          <motion.path 
            d="M20,0 C20,64 20,64 20,128" 
            stroke="#42f587" 
            strokeWidth="2"
            strokeDasharray="6,3"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 0.6 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.5 }}
            style={{ filter: 'drop-shadow(0 0 4px rgba(66, 245, 135, 0.5))' }}
          />
          <motion.circle 
            cx="20" cy="128" r="6" 
            fill="#42f587" 
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 1.7 }}
            style={{ filter: 'drop-shadow(0 0 6px rgba(66, 245, 135, 0.8))' }}
          />
        </svg>
      </div>

      <div className="container mx-auto px-4">
        {/* Título da seção */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="inline-block mb-4 px-4 py-2 rounded-full glass-green border border-[#42f587]/30">
            <p className="text-sm font-medium text-white flex items-center">
              <span className="inline-block w-2 h-2 bg-[#42f587] rounded-full mr-2 animate-pulse"></span>
              Tudo em um só lugar
            </p>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">Funcionalidades poderosas</h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto mb-8">
            Conheça as principais funcionalidades que fazem do TappyWhats a melhor plataforma para gerenciamento de WhatsApp do mercado.
          </p>
          
          {/* Ícone animado de seta para baixo */}
          <motion.div 
            className="flex justify-center mb-8"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.5 }}
          >
            <motion.div
              className="w-12 h-12 rounded-full flex items-center justify-center bg-[#1a1e3c] border border-[#42f587]/30 p-2"
              animate={{ 
                y: [0, 8, 0],
                boxShadow: [
                  '0 0 0 rgba(66, 245, 135, 0.2)',
                  '0 0 20px rgba(66, 245, 135, 0.5)',
                  '0 0 0 rgba(66, 245, 135, 0.2)'
                ]
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 2.5,
                ease: "easeInOut" 
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path 
                  d="M12 5L12 19M12 19L19 12M12 19L5 12" 
                  stroke="#42f587" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Grade de funcionalidades com linhas de fluxo */}
        <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 lg:gap-24 pt-10">
          {/* Linhas de fluxograma */}
          <div className="absolute inset-0 -z-10 overflow-visible">
            <svg width="100%" height="100%" viewBox="0 0 1200 800" preserveAspectRatio="none" className="absolute inset-0">
              {/* Linha principal vertical */}
              <motion.path
                d="M 600,0 L 600,800"
                stroke="#42f587"
                strokeWidth="3"
                strokeDasharray="10,6"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 0.6 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5 }}
                style={{ filter: 'drop-shadow(0 0 5px rgba(66, 245, 135, 0.6))' }}
              />
              
              {/* Linhas horizontais para cada card */}
              <motion.path
                d="M 600,120 L 250,120"
                stroke="#42f587"
                strokeWidth="3"
                strokeDasharray="10,6"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 0.6 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: 0.2 }}
                style={{ filter: 'drop-shadow(0 0 5px rgba(66, 245, 135, 0.6))' }}
              />
              
              <motion.path
                d="M 600,120 L 950,120"
                stroke="#42f587"
                strokeWidth="3"
                strokeDasharray="10,6"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 0.6 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: 0.3 }}
                style={{ filter: 'drop-shadow(0 0 5px rgba(66, 245, 135, 0.6))' }}
              />
              
              <motion.path
                d="M 600,400 L 250,400"
                stroke="#42f587"
                strokeWidth="3"
                strokeDasharray="10,6"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 0.6 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: 0.4 }}
                style={{ filter: 'drop-shadow(0 0 5px rgba(66, 245, 135, 0.6))' }}
              />
              
              <motion.path
                d="M 600,400 L 950,400"
                stroke="#42f587"
                strokeWidth="3"
                strokeDasharray="10,6"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 0.6 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: 0.5 }}
                style={{ filter: 'drop-shadow(0 0 5px rgba(66, 245, 135, 0.6))' }}
              />
              
              {/* Linhas verticais para cada coluna */}
              <motion.path
                d="M 250,120 L 250,680"
                stroke="#42f587"
                strokeWidth="2"
                strokeDasharray="10,6"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 0.4 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: 0.6 }}
                style={{ filter: 'drop-shadow(0 0 5px rgba(66, 245, 135, 0.6))' }}
              />
              
              <motion.path
                d="M 950,120 L 950,680"
                stroke="#42f587"
                strokeWidth="2"
                strokeDasharray="10,6"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 0.4 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: 0.7 }}
                style={{ filter: 'drop-shadow(0 0 5px rgba(66, 245, 135, 0.6))' }}
              />
              
              {/* Linhas horizontais adicionais */}
              <motion.path
                d="M 250,680 L 950,680"
                stroke="#42f587"
                strokeWidth="2"
                strokeDasharray="10,6"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 0.4 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: 0.8 }}
                style={{ filter: 'drop-shadow(0 0 5px rgba(66, 245, 135, 0.6))' }}
              />
              
              {/* Pequenos círculos nas interseções */}
              <motion.circle 
                cx="600" cy="120" r="6" 
                fill="#42f587" 
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 1.5 }}
                style={{ filter: 'drop-shadow(0 0 5px rgba(66, 245, 135, 0.8))' }}
              />
              
              <motion.circle 
                cx="600" cy="400" r="6" 
                fill="#42f587" 
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 1.7 }}
                style={{ filter: 'drop-shadow(0 0 5px rgba(66, 245, 135, 0.8))' }}
              />
              
              <motion.circle 
                cx="250" cy="120" r="4" 
                fill="#42f587" 
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 1.9 }}
                style={{ filter: 'drop-shadow(0 0 5px rgba(66, 245, 135, 0.8))' }}
              />
              
              <motion.circle 
                cx="950" cy="120" r="4" 
                fill="#42f587" 
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 2.0 }}
                style={{ filter: 'drop-shadow(0 0 5px rgba(66, 245, 135, 0.8))' }}
              />
              
              <motion.circle 
                cx="250" cy="400" r="4" 
                fill="#42f587" 
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 2.1 }}
                style={{ filter: 'drop-shadow(0 0 5px rgba(66, 245, 135, 0.8))' }}
              />
              
              <motion.circle 
                cx="950" cy="400" r="4" 
                fill="#42f587" 
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 2.2 }}
                style={{ filter: 'drop-shadow(0 0 5px rgba(66, 245, 135, 0.8))' }}
              />
            </svg>
          </div>
          {/* Caminhos em formato L que conectam os cards */}
          {[
            // Caminhos da linha superior (cards 0-1-2)
            { startX: '16.66%', startY: 'calc(25% - 10px)', endX: '33.33%', endY: 'calc(25% - 10px)', delay: 1.0, order: 1 },
            { startX: '33.33%', startY: 'calc(25% - 10px)', endX: '50%', endY: 'calc(25% - 10px)', delay: 1.2, order: 2 },
            { startX: '50%', startY: 'calc(25% - 10px)', endX: '66.66%', endY: 'calc(25% - 10px)', delay: 1.4, order: 3 },
            { startX: '66.66%', startY: 'calc(25% - 10px)', endX: '83.33%', endY: 'calc(25% - 10px)', delay: 1.6, order: 4 },
            
            // Caminho vertical descendo do card 2 para o 5
            { startX: '83.33%', startY: 'calc(25% - 10px)', endX: '83.33%', endY: 'calc(75% - 10px)', delay: 1.8, order: 5 },
            
            // Caminhos da linha inferior (cards 5-4-3) - da direita para esquerda
            { startX: '83.33%', startY: 'calc(75% - 10px)', endX: '66.66%', endY: 'calc(75% - 10px)', delay: 2.0, order: 6 },
            { startX: '66.66%', startY: 'calc(75% - 10px)', endX: '50%', endY: 'calc(75% - 10px)', delay: 2.2, order: 7 },
            { startX: '50%', startY: 'calc(75% - 10px)', endX: '33.33%', endY: 'calc(75% - 10px)', delay: 2.4, order: 8 },
            { startX: '33.33%', startY: 'calc(75% - 10px)', endX: '16.66%', endY: 'calc(75% - 10px)', delay: 2.6, order: 9 },
            
            // Caminho vertical descendo do card 0 para o 3
            { startX: '16.66%', startY: 'calc(25% - 10px)', endX: '16.66%', endY: 'calc(75% - 10px)', delay: 2.8, order: 10 },
          ].map((path, index) => (
            <div key={`path-${index}`} className="absolute hidden md:block" 
                 style={{
                   top: path.startY,
                   left: path.startX,
                   width: path.startX === path.endX ? '3px' : `calc(${path.endX} - ${path.startX})`,
                   height: path.startY === path.endY ? '3px' : `calc(${path.endY} - ${path.startY})`,
                   backgroundColor: 'transparent',
                 }}
            >
              <motion.div 
                className="w-full h-full bg-[#42f587]"
                initial={{ scaleX: path.startX === path.endX ? 1 : 0, scaleY: path.startY === path.endY ? 1 : 0, opacity: 0 }}
                whileInView={{
                  scaleX: 1, 
                  scaleY: 1, 
                  opacity: 0.6
                }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: path.delay }}
                style={{ 
                  transformOrigin: `top left`,
                  boxShadow: '0 0 8px rgba(66, 245, 135, 0.6)'
                }}
              />
            </div>
          ))}
          
          {/* Pontos de conexão animados nos cruzamentos */}
          {[
            { x: '16.66%', y: 'calc(25% - 10px)', delay: 1.1, size: 6 },
            { x: '33.33%', y: 'calc(25% - 10px)', delay: 1.3, size: 6 },
            { x: '50%', y: 'calc(25% - 10px)', delay: 1.5, size: 6 },
            { x: '66.66%', y: 'calc(25% - 10px)', delay: 1.7, size: 6 },
            { x: '83.33%', y: 'calc(25% - 10px)', delay: 1.9, size: 6 },
            { x: '83.33%', y: 'calc(75% - 10px)', delay: 2.1, size: 6 },
            { x: '66.66%', y: 'calc(75% - 10px)', delay: 2.3, size: 6 },
            { x: '50%', y: 'calc(75% - 10px)', delay: 2.5, size: 6 },
            { x: '33.33%', y: 'calc(75% - 10px)', delay: 2.7, size: 6 },
            { x: '16.66%', y: 'calc(75% - 10px)', delay: 2.9, size: 6 },
          ].map((point, index) => (
            <div key={`point-${index}`} className="absolute hidden md:block" 
                 style={{
                   top: point.y,
                   left: point.x,
                   transform: 'translate(-50%, -50%)',
                 }}
            >
              <motion.div 
                className="rounded-full bg-[#42f587]"
                style={{
                  width: `${point.size}px`,
                  height: `${point.size}px`,
                  boxShadow: '0 0 10px rgba(66, 245, 135, 0.8)'
                }}
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: point.delay }}
              />
            </div>
          ))}
          
          {featuresList.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group z-10"
            >
              <div className="glass-blue rounded-2xl p-8 md:p-10 border border-white/5 h-full relative overflow-hidden transition-all duration-300 hover:border-[#42f587]/30 group-hover:shadow-[0_0_40px_rgba(66,245,135,0.15)]">
                {/* Conector para o fluxograma */}
                <div className="absolute w-3 h-3 rounded-full bg-[#42f587]/50 top-1/2 -left-1.5 transform -translate-y-1/2 transition-all duration-500 group-hover:bg-[#42f587] group-hover:w-5 group-hover:-left-2.5 group-hover:shadow-[0_0_10px_rgba(66,245,135,0.8)]"></div>
                {/* Conector lado direito */}
                {(index === 0 || index === 1 || index === 3 || index === 4) && (
                  <div className="absolute hidden md:block w-3 h-3 rounded-full bg-[#42f587]/50 top-1/2 -right-1.5 transform -translate-y-1/2 transition-all duration-500 group-hover:bg-[#42f587] group-hover:w-5 group-hover:-right-2.5 group-hover:shadow-[0_0_10px_rgba(66,245,135,0.8)]"></div>
                )}
                {/* Círculo decorativo de fundo */}
                <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-[#42f587]/5 blur-2xl group-hover:bg-[#42f587]/10 transition-all duration-500" />
                <div className="absolute -bottom-24 -left-24 w-48 h-48 rounded-full bg-[#42f587]/5 blur-3xl group-hover:bg-[#42f587]/10 transition-all duration-700" />
                
                {/* Ícone */}
                <div className="relative bg-[#1a1e3c]/70 rounded-xl w-16 h-16 flex items-center justify-center mb-5 border border-white/5 group-hover:border-[#42f587]/20 transition-all duration-300">
                  <motion.div 
                    initial={{ rotate: 0 }}
                    whileHover={{ rotate: [0, -5, 5, -5, 0] }}
                    transition={{ duration: 0.5 }}
                    className="text-[#42f587]"
                  >
                    {React.cloneElement(feature.icon, { 
                      stroke: "#42f587",
                      className: "transition-all duration-300 group-hover:stroke-[#42f587]" 
                    })}
                  </motion.div>
                </div>
                
                {/* Conteúdo */}
                <motion.h3 
                  className="text-xl font-bold text-white mb-3 group-hover:text-[#42f587] transition-colors duration-300"
                >
                  {feature.title}
                </motion.h3>
                <p className="text-white/70 group-hover:text-white/90 transition-colors duration-300">
                  {feature.description}
                </p>
                
                {/* Seta indicativa */}
                <motion.div 
                  initial={{ x: 0, opacity: 0 }}
                  whileHover={{ x: 5, opacity: 1 }}
                  className="absolute bottom-8 right-8 h-6 w-6 text-[#42f587] opacity-0 group-hover:opacity-100 transition-all duration-300"
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="24" height="24" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="#42f587" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14"></path>
                    <path d="m12 5 7 7-7 7"></path>
                  </svg>
                </motion.div>
                
                {/* Linha decorativa */}
                <div className="absolute bottom-0 left-8 right-8 h-[1px] bg-gradient-to-r from-transparent via-[#42f587]/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Linha de conexão para a próxima seção */}
      <div className="absolute bottom-0 left-0 right-0 -mb-24 h-24 overflow-hidden">
        <svg width="100%" height="100%" viewBox="0 0 1440 96" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <motion.path 
            d="M0,0 C480,96 960,96 1440,0" 
            stroke="#42f587" 
            strokeWidth="2"
            strokeDasharray="1"
            strokeDashoffset="1"
            style={{ pathLength }}
            className="glow"
          />
        </svg>
      </div>
      
      {/* Estilo para glow */}
      <style jsx global>{`
        .feature-icon {
          filter: drop-shadow(0 0 8px rgba(66, 245, 135, 0.4));
          transition: all 0.3s ease;
        }
        
        .glass-blue {
          background: rgba(26, 30, 60, 0.6);
          backdrop-filter: blur(12px);
          transition: all 0.3s ease;
        }
        
        .glass-green {
          background: rgba(66, 245, 135, 0.1);
          backdrop-filter: blur(12px);
        }
        
        .glow {
          filter: drop-shadow(0 0 5px rgba(66, 245, 135, 0.6));
        }
      `}</style>
    </section>
  );
}
