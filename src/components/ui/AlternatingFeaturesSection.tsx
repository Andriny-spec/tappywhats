"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue, AnimatePresence } from "framer-motion";
import { Button } from "./button";

// Dados para as seções alternadas
const sections = [
  {
    id: 1,
    title: "Automatize seu atendimento",
    description:
      "Economize tempo e recursos automatizando respostas para as perguntas mais frequentes dos seus clientes. Aumente a produtividade da sua equipe e melhore a satisfação do cliente.",
    buttonText: "Saiba mais",
    buttonLink: "#",
    isReversed: false,
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="#42f587" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M2 17L12 22L22 17" stroke="#42f587" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M2 12L12 17L22 12" stroke="#42f587" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: 2,
    title: "Análise de desempenho em tempo real",
    description:
      "Monitore métricas importantes como tempo de resposta, taxa de resolução e satisfação do cliente. Tome decisões baseadas em dados para melhorar continuamente seu atendimento.",
    buttonText: "Ver demonstração",
    buttonLink: "#",
    isReversed: true,
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M21 8V20.5C21 20.8978 20.8412 21.2794 20.5607 21.5607C20.2802 21.842 19.898 22 19.5 22H4.5C4.10218 22 3.72064 21.842 3.43934 21.5607C3.15804 21.2794 3 20.8978 3 20.5V8M10 12V17M14 12V17M1 4H23M17 4V2H7V4" stroke="#42f587" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: 3,
    title: "Integração com múltiplas plataformas",
    description:
      "Conecte-se a diferentes plataformas e centralize todas as suas conversas. Gerencie WhatsApp, Instagram, Facebook e muitos outros, tudo em um único lugar.",
    buttonText: "Ver integrações",
    buttonLink: "#",
    isReversed: false,
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M17 2H7C4.23858 2 2 4.23858 2 7V17C2 19.7614 4.23858 22 7 22H17C19.7614 22 22 19.7614 22 17V7C22 4.23858 19.7614 2 17 2Z" stroke="#42f587" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9 22V16C9 14.8954 9.89543 14 11 14H13C14.1046 14 15 14.8954 15 16V22" stroke="#42f587" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M3 9H21" stroke="#42f587" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
];

// Hook personalizado para animações baseadas em rolagem
function useParallax(value: MotionValue<number>, distance: number) {
  return useTransform(value, [0, 1], [-distance, distance]);
}

// Animação 1: Disparo de mensagens WhatsApp
const MessageBroadcastAnimation: React.FC<{
  isReversed: boolean;
  scrollYProgress: MotionValue<number>;
}> = ({ isReversed, scrollYProgress }) => {
  const color = "#42f587";
  
  // Estados para controlar as mensagens animadas
  const [messages] = React.useState([
    { id: 1, text: "Olá! Como posso ajudar?", position: { x: 20, y: 70 }, delay: 0.5 },
    { id: 2, text: "Temos uma promoção especial!", position: { x: -10, y: 30 }, delay: 1.0 },
    { id: 3, text: "Obrigado pelo contato", position: { x: 5, y: 80 }, delay: 1.5 },
    { id: 4, text: "Atendimento 24h", position: { x: -20, y: 50 }, delay: 2.0 },
    { id: 5, text: "Gostaria de agendar uma reunião?", position: { x: 15, y: 20 }, delay: 2.5 },
  ]);
  
  return (
    <div className="relative w-full h-full min-h-[400px] flex items-center justify-center">
      <motion.div
        className="relative w-full h-full"
      >
        {/* Telefone simulando WhatsApp */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div 
            className="relative w-72 h-[500px] rounded-3xl bg-[#121728] border-4 border-[#1a1e3c] overflow-hidden shadow-2xl"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, type: "spring" }}
          >
            {/* Barra superior do telefone */}
            <div className="h-6 w-full bg-[#42f587]/10 flex items-center justify-between px-4">
              <div className="w-16 h-1 bg-white/50 rounded-full"></div>
              <div className="w-2 h-2 bg-[#42f587] rounded-full"></div>
            </div>
            
            {/* Header do WhatsApp */}
            <div className="h-14 w-full bg-[#1a1e3c] flex items-center px-4">
              <motion.div 
                className="w-10 h-10 rounded-full bg-gradient-to-r from-[#42f587] to-[#2ed671] flex items-center justify-center text-white font-bold text-xl"
                animate={{ 
                  scale: [1, 1.05, 1],
                  boxShadow: [
                    '0 0 0 rgba(66, 245, 135, 0.4)',
                    '0 0 10px rgba(66, 245, 135, 0.6)',
                    '0 0 0 rgba(66, 245, 135, 0.4)'
                  ]
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 2
                }}
              >
                T
              </motion.div>
              <div className="ml-4">
                <div className="text-white font-semibold text-sm">TappyWhats</div>
                <div className="text-white/50 text-xs">Disparo automático</div>
              </div>
            </div>
            
            {/* Área de mensagens */}
            <div className="h-[calc(100%-6rem)] w-full relative bg-[url('/whatsapp-bg.png')] bg-cover bg-center">
              <div className="absolute inset-0 bg-[#121728]/95"></div>
              
              {/* Container central para o botão de disparo */}
              <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                <motion.div
                  className="w-20 h-20 rounded-full bg-[#42f587] flex items-center justify-center shadow-lg cursor-pointer pointer-events-auto"
                  whileHover={{ scale: 1.05 }}
                  animate={{
                    boxShadow: [
                      '0 0 0 rgba(66, 245, 135, 0.4)',
                      '0 0 30px rgba(66, 245, 135, 0.8)',
                      '0 0 0 rgba(66, 245, 135, 0.4)'
                    ]
                  }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22 2L11 13" stroke="#121728" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="#121728" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </motion.div>
              </div>
              
              {/* Mensagens disparadas */}
              {messages.map((message) => (
                <MessageBubble 
                  key={message.id} 
                  text={message.text} 
                  position={message.position} 
                  delay={message.delay} 
                />
              ))}
              
              {/* Efeito de partículas saindo do centro */}
              <ParticleEffect />
            </div>
            
            {/* Rodapé do app */}
            <div className="absolute bottom-0 h-12 w-full bg-[#1a1e3c] flex items-center justify-between px-4">
              <div className="flex-1 h-8 bg-[#121728] rounded-full px-3 flex items-center">
                <div className="text-white/50 text-xs">Mensagem auto...</div>
              </div>
              <div className="w-10 h-10 rounded-full bg-[#42f587] ml-2 flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 12C2 8.22876 2 6.34315 3.17157 5.17157C4.34315 4 6.22876 4 10 4H14C17.7712 4 19.6569 4 20.8284 5.17157C22 6.34315 22 8.22876 22 12C22 15.7712 22 17.6569 20.8284 18.8284C19.6569 20 17.7712 20 14 20H10C6.22876 20 4.34315 20 3.17157 18.8284C2 17.6569 2 15.7712 2 12Z" stroke="#121728" strokeWidth="2"/>
                  <path d="M9 16L15 12L9 8V16Z" fill="#121728"/>
                </svg>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

// Componente de bolha de mensagem
const MessageBubble: React.FC<{
  text: string;
  position: { x: number; y: number };
  delay: number;
}> = ({ text, position, delay }) => {
  return (
    <motion.div
      className="absolute z-10 max-w-[200px]"
      style={{ 
        left: `calc(50% + ${position.x}%)`, 
        top: `calc(50% + ${position.y}px)`,
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ 
        scale: [0, 1.1, 1],
        opacity: [0, 1, 0.9],
        y: [0, -15, -40]
      }}
      transition={{ 
        duration: 3,
        delay: delay,
        repeat: Infinity,
        repeatDelay: 3,
      }}
    >
      <div className="bg-[#0d3d23] text-white px-3 py-2 rounded-2xl rounded-bl-none text-sm shadow-lg">
        {text}
        <div className="text-[10px] text-white/70 text-right mt-1">12:34</div>
      </div>
    </motion.div>
  );
};

// Efeito de partículas
const ParticleEffect: React.FC = () => {
  // Gerar partículas em posições aleatórias
  const particles = [...Array(12)].map((_, idx) => ({
    id: idx,
    size: Math.random() * 4 + 2,
    angle: Math.random() * 360,
    distance: Math.random() * 120 + 40,
    duration: Math.random() * 2 + 1,
    delay: Math.random() * 2
  }));
  
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-[#42f587]"
          style={{ 
            width: `${particle.size}px`, 
            height: `${particle.size}px`,
          }}
          initial={{ 
            x: 0, 
            y: 0, 
            opacity: 0.8,
          }}
          animate={{
            x: Math.cos(particle.angle * Math.PI / 180) * particle.distance,
            y: Math.sin(particle.angle * Math.PI / 180) * particle.distance,
            opacity: [0.8, 0],
          }}
          transition={{ 
            duration: particle.duration, 
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeOut",
            repeatDelay: 1
          }}
        />
      ))}
    </div>
  );
};

// Animação 2: Calendário de agendamento 
const CalendarAnimation: React.FC<{
  isReversed: boolean;
  scrollYProgress: MotionValue<number>;
}> = ({ isReversed, scrollYProgress }) => {
  const color = "#42f587";
  
  // Simular dias do mês (1-31) com status aleatório
  const currentDate = new Date();
  const totalDays = 31;
  const startDay = 1; // Domingo = 0, Segunda = 1, etc.
  
  // Dias com agendamentos
  const [scheduledDays] = React.useState([
    { day: 4, time: "14:30", name: "Reunião Equipe Marketing" },
    { day: 8, time: "10:00", name: "Apresentação Nova Campanha" },
    { day: 15, time: "15:45", name: "Treinamento TappyWhats" },
    { day: 19, time: "09:15", name: "Atendimento Premium" },
    { day: 23, time: "16:00", name: "Discussão Estratégica" },
    { day: 27, time: "11:30", name: "Reunião Online" },
  ]);
  
  // Dias da semana em português
  const weekdays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
  const monthName = "Março"; // Nome do mês em português
  
  // Verificar se um dia tem agendamento
  const getScheduleForDay = (day: number) => {
    return scheduledDays.find(schedule => schedule.day === day);
  };
  
  // Controle do dia selecionado
  const [selectedDay, setSelectedDay] = React.useState<number | null>(currentDate.getDate());
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [activeSchedule, setActiveSchedule] = React.useState<{day: number, time: string, name: string} | null>(null);
  
  // Efeito para animar a seleção de dias com agendamento
  React.useEffect(() => {
    const scheduledDay = scheduledDays.find(s => s.day === selectedDay);
    if (scheduledDay) {
      setActiveSchedule(scheduledDay);
      setIsModalOpen(true);
    } else {
      setIsModalOpen(false);
      setActiveSchedule(null);
    }
  }, [selectedDay, scheduledDays]);
  
  // Gerar grade do calendário
  const calendarDays = [];
  for (let i = 0; i < totalDays; i++) {
    const day = i + 1;
    const hasSchedule = getScheduleForDay(day) !== undefined;
    calendarDays.push({ day, hasSchedule });
  }
  
  // Calcula o número inicial de slots vazios no calendário (baseado no dia da semana do primeiro dia)
  const emptySlots = [];
  for (let i = 0; i < startDay; i++) {
    emptySlots.push(i);
  }
  
  return (
    <div className="relative w-full h-full min-h-[400px] flex items-center justify-center">
      <motion.div
        className="relative w-full h-full"
      >
        {/* Container do calendário */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div 
            className="relative w-80 rounded-3xl bg-[#121728] border-4 border-[#1a1e3c] overflow-hidden shadow-2xl"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, type: "spring" }}
          >
            {/* Cabeçalho do calendário */}
            <div className="bg-gradient-to-r from-[#1a1e3c] to-[#252d4d] px-4 py-5 text-white relative overflow-hidden">
              <div className="relative z-10">
                <div className="flex justify-between items-center mb-2">
                  <motion.h3 
                    className="font-bold text-2xl"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    {monthName}
                  </motion.h3>
                  <motion.div 
                    className="flex space-x-2"
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <button className="w-8 h-8 rounded-full flex items-center justify-center bg-[#42f587]/10 hover:bg-[#42f587]/20 transition-colors">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15 18L9 12L15 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                    <button className="w-8 h-8 rounded-full flex items-center justify-center bg-[#42f587]/10 hover:bg-[#42f587]/20 transition-colors">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 6L15 12L9 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </motion.div>
                </div>
                <motion.div 
                  className="flex justify-between"
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  {weekdays.map((day, index) => (
                    <span key={index} className="text-xs font-medium w-9 text-center">{day}</span>
                  ))}
                </motion.div>
              </div>
              
              {/* Elementos decorativos no fundo */}
              <motion.div 
                className="absolute right-0 top-0 w-20 h-20 rounded-full bg-[#42f587]/10 filter blur-xl"
                animate={{ 
                  x: [0, 10, 0], 
                  y: [0, -10, 0],
                  opacity: [0.5, 0.8, 0.5] 
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 5,
                  ease: "easeInOut"
                }}
              />
              <motion.div 
                className="absolute left-10 bottom-0 w-16 h-16 rounded-full bg-[#42f587]/5 filter blur-lg"
                animate={{ 
                  x: [0, -10, 0], 
                  y: [0, 5, 0],
                  opacity: [0.3, 0.6, 0.3] 
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 4,
                  ease: "easeInOut"
                }}
              />
            </div>
            
            {/* Grade do calendário */}
            <div className="p-3 grid grid-cols-7 gap-1">
              {/* Slots vazios para alinhar com o dia da semana inicial */}
              {emptySlots.map((index) => (
                <div key={`empty-${index}`} className="w-9 h-9"></div>
              ))}
              
              {/* Dias do calendário */}
              {calendarDays.map(({ day, hasSchedule }) => (
                <motion.button
                  key={day}
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-sm relative ${selectedDay === day ? 'text-[#121728]' : 'text-white'}`}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ 
                    scale: 1, 
                    opacity: 1,
                    backgroundColor: selectedDay === day ? '#42f587' : 'transparent'
                  }}
                  transition={{ 
                    delay: day * 0.01,
                    duration: 0.2 
                  }}
                  onClick={() => setSelectedDay(day)}
                  whileHover={{ scale: 1.1 }}
                >
                  {day}
                  
                  {/* Indicador de agendamento */}
                  {hasSchedule && (
                    <motion.div 
                      className={`absolute -bottom-1 w-1.5 h-1.5 rounded-full ${selectedDay === day ? 'bg-[#121728]' : 'bg-[#42f587]'}`}
                      animate={{
                        scale: [1, 1.2, 1],
                      }}
                      transition={{ 
                        repeat: Infinity, 
                        duration: 2
                      }}
                    />
                  )}
                </motion.button>
              ))}
            </div>
            
            {/* Seção de agendamentos do dia */}
            <div className="p-4 border-t border-[#1a1e3c]">
              <div className="flex justify-between items-center mb-3">
                <h4 className="text-white font-medium text-sm">Agendamentos</h4>
                <button className="bg-[#42f587] text-xs rounded-full px-3 py-1 text-[#121728] font-medium hover:bg-[#42f587]/80 transition-colors">
                  + Novo
                </button>
              </div>
              
              {/* Modal de agendamento */}
              <AnimatePresence>
                {isModalOpen && activeSchedule && (
                  <motion.div 
                    className="bg-[#1a1e3c] rounded-lg p-3 mb-3"
                    initial={{ opacity: 0, y: 20, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: 'auto' }}
                    exit={{ opacity: 0, y: 10, height: 0 }}
                    transition={{ type: "spring", bounce: 0.3 }}
                  >
                    <div className="flex justify-between mb-1">
                      <span className="text-white font-medium text-sm">{activeSchedule.name}</span>
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 rounded-full bg-[#42f587]"></div>
                        <span className="text-[#42f587] text-xs">Confirmado</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 text-white/70 text-xs">
                      <div className="flex items-center">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-1">
                          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/>
                          <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                        </svg>
                        {activeSchedule.time}
                      </div>
                      <div className="flex items-center">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-1">
                          <rect x="4" y="5" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                          <path d="M16 3V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                          <path d="M8 3V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                          <path d="M4 11H20" stroke="currentColor" strokeWidth="1.5"/>
                        </svg>
                        {`${activeSchedule.day} de ${monthName}`}
                      </div>
                    </div>
                    <div className="flex justify-end space-x-2 mt-3">
                      <button className="text-xs text-white/70 px-2 py-1 hover:text-white">
                        Reagendar
                      </button>
                      <button className="text-xs bg-[#42f587]/10 text-[#42f587] px-2 py-1 rounded hover:bg-[#42f587]/20 transition-colors">
                        Detalhes
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              
              {/* Próximos agendamentos */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                {scheduledDays.slice(0, 2).map((schedule) => (
                  <div 
                    key={schedule.day} 
                    className="flex items-center py-2 border-b border-[#1a1e3c] last:border-b-0"
                    onClick={() => setSelectedDay(schedule.day)}
                  >
                    <div className="w-10 h-10 rounded-lg bg-[#1a1e3c] flex items-center justify-center mr-3">
                      <div className="text-white text-xs">
                        <div className="font-bold">{schedule.day}</div>
                        <div className="text-[10px] opacity-70">{weekdays[(startDay + schedule.day - 1) % 7]}</div>
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="text-white text-xs font-medium">{schedule.name}</div>
                      <div className="text-white/50 text-[10px]">{schedule.time}</div>
                    </div>
                    <div className="w-2 h-2 rounded-full bg-[#42f587]"></div>
                  </div>
                ))}
                <div className="mt-2 text-center">
                  <button className="text-xs text-[#42f587] hover:text-[#42f587]/80 transition-colors">
                    Ver todos os agendamentos
                  </button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

// Animação 3: Inteligência Artificial
const AIAnalyticsAnimation: React.FC<{
  isReversed: boolean;
  scrollYProgress: MotionValue<number>;
}> = ({ isReversed, scrollYProgress }) => {
  const color = "#42f587";
  
  // Estado para simular dados de análise e atividade do bot
  const [analytics] = React.useState([
    { id: 1, label: "Mensagens Enviadas", value: 3624, growth: 12.8, color: "#42f587" },
    { id: 2, label: "Mensagens Respondidas", value: 2871, growth: 8.5, color: "#3cbaff" },
    { id: 3, label: "Taxa de Conversão", value: 23.4, growth: -2.1, color: "#f5a442" },
    { id: 4, label: "Tempo de Resposta", value: 1.8, growth: 5.2, color: "#e74cdb" },
  ]);
  
  // Dados de perguntas frequentes
  const [faqs] = React.useState([
    { id: 1, question: "Qual o horário de atendimento?", frequency: 85 },
    { id: 2, question: "Como posso comprar o produto?", frequency: 72 },
    { id: 3, question: "Quanto tempo dura a entrega?", frequency: 65 },
    { id: 4, question: "Aceitam pagamento por PIX?", frequency: 58 },
    { id: 5, question: "Qual a garantia do produto?", frequency: 43 },
  ]);
  
  // Dados para o gráfico
  const chartData = [
    { day: "Seg", value: 45 },
    { day: "Ter", value: 63 },
    { day: "Qua", value: 58 },
    { day: "Qui", value: 80 },
    { day: "Sex", value: 70 },
    { day: "Sab", value: 55 },
    { day: "Dom", value: 35 },
  ];
  
  // Estado para animação de digitação
  const [currentQueryIndex, setCurrentQueryIndex] = React.useState(0);
  const [currentResponse, setCurrentResponse] = React.useState("");
  const [isTyping, setIsTyping] = React.useState(false);
  const [showResponse, setShowResponse] = React.useState(false);
  
  // Animação de digitação da resposta automatizada
  React.useEffect(() => {
    const query = faqs[currentQueryIndex]?.question;
    if (isTyping && query) {
      // Simula resposta para cada pergunta
      let responseText = "";
      switch(currentQueryIndex) {
        case 0:
          responseText = "Nosso horário de atendimento é de segunda a sexta das 8h às 18h e aos sábados das 9h às 13h.";
          break;
        case 1:
          responseText = "Você pode comprar pelo nosso site, WhatsApp ou em uma de nossas lojas físicas.";
          break;
        case 2:
          responseText = "A entrega leva de 2 a 5 dias úteis, dependendo da sua localização.";
          break;
        case 3:
          responseText = "Sim, aceitamos pagamento via PIX, cartão de crédito, boleto e transferência.";
          break;
        case 4:
          responseText = "Todos os nossos produtos têm garantia de 12 meses contra defeitos de fabricação.";
          break;
        default:
          responseText = "Obrigado por entrar em contato. Como posso ajudar?";
      }
      
      let currentText = "";
      let charIndex = 0;
      
      const typingInterval = setInterval(() => {
        if (charIndex < responseText.length) {
          currentText += responseText.charAt(charIndex);
          setCurrentResponse(currentText);
          charIndex++;
        } else {
          clearInterval(typingInterval);
          setIsTyping(false);
          setShowResponse(true);
          
          // Prepara próxima pergunta após um tempo
          setTimeout(() => {
            setShowResponse(false);
            setTimeout(() => {
              setCurrentQueryIndex((prev) => (prev + 1) % faqs.length);
              setCurrentResponse("");
              setIsTyping(true);
            }, 500);
          }, 3000);
        }
      }, 50); // Velocidade da digitação
      
      return () => {
        clearInterval(typingInterval);
      };
    }
  }, [isTyping, currentQueryIndex, faqs]);
  
  // Inicia o ciclo de digitação quando o componente carrega
  React.useEffect(() => {
    setIsTyping(true);
  }, []);
  
  return (
    <div className="relative w-full h-full min-h-[400px] flex items-center justify-center">
      <motion.div
        className="relative w-full h-full"
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div 
            className="relative w-[380px] h-[500px] rounded-3xl bg-[#121728] border-4 border-[#1a1e3c] overflow-hidden shadow-2xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, type: "spring" }}
          >
            {/* Cabeçalho do dashboard */}
            <div className="bg-gradient-to-r from-[#1a1e3c] to-[#252d4d] px-4 py-3 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-lg bg-[#42f587] flex items-center justify-center text-[#121728] font-bold text-sm mr-2">
                    AI
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">TappyWhats AI</h3>
                    <p className="text-xs text-white/60">Dashboard de Analytics</p>
                  </div>
                </div>
                <div className="flex space-x-1">
                  {["#42f587", "#3cbaff", "#f5a442"].map((bgColor, idx) => (
                    <motion.div 
                      key={idx}
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: bgColor }}
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ 
                        repeat: Infinity, 
                        duration: 1.5,
                        delay: idx * 0.2,
                        repeatDelay: 0.5
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
            
            {/* Painel principal */}
            <div className="p-4 space-y-4">
              {/* Seção de métricas */}
              <div className="grid grid-cols-2 gap-2">
                {analytics.slice(0, 2).map((metric) => (
                  <motion.div 
                    key={metric.id}
                    className="bg-[#1a1e3c] rounded-lg p-2"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: metric.id * 0.1 }}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="text-xs text-white/70 mb-1">{metric.label}</div>
                        <div className="text-white font-bold text-xl">
                          {metric.value.toLocaleString()}
                        </div>
                      </div>
                      <div 
                        className={`text-xs font-medium px-1.5 py-0.5 rounded-full flex items-center ${metric.growth >= 0 ? 'bg-[#42f587]/20 text-[#42f587]' : 'bg-red-500/20 text-red-400'}`}
                      >
                        {metric.growth >= 0 ? '↑' : '↓'} {Math.abs(metric.growth)}%
                      </div>
                    </div>
                    <div className="mt-2 w-full h-1.5 bg-[#121728] rounded-full overflow-hidden">
                      <motion.div 
                        className="h-full rounded-full"
                        style={{ backgroundColor: metric.color }}
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min(80, 30 + Math.random() * 50)}%` }}
                        transition={{ delay: 0.3, duration: 1 }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
              
              {/* Gráfico de atividade */}
              <motion.div 
                className="bg-[#1a1e3c] rounded-lg p-3"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-white text-xs font-medium">Atividade semanal</h4>
                  <div className="text-[#42f587] text-[10px] font-medium">
                    +12% esta semana
                  </div>
                </div>
                
                {/* Gráfico de barras simples */}
                <div className="flex items-end justify-between h-24 mt-2">
                  {chartData.map((item, idx) => (
                    <div key={idx} className="flex flex-col items-center">
                      <motion.div 
                        className="w-5 rounded-t-sm bg-gradient-to-t from-[#42f587] to-[#42f587]/50"
                        style={{ height: 0 }}
                        animate={{ height: `${item.value}%` }}
                        transition={{ delay: 0.5 + idx * 0.1, duration: 1, type: "spring" }}
                      />
                      <div className="text-white/60 text-[9px] mt-1">{item.day}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
              
              {/* Chatbot de IA */}
              <motion.div 
                className="bg-[#1a1e3c] rounded-lg overflow-hidden"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <div className="bg-[#252d4d] py-2 px-3 flex items-center justify-between">
                  <h4 className="text-white text-xs font-medium flex items-center">
                    <span className="w-2 h-2 rounded-full bg-[#42f587] mr-1.5"></span>
                    IA Atendente
                  </h4>
                  <div className="text-white/60 text-[10px]">Online agora</div>
                </div>
                
                <div className="p-3 h-[100px] overflow-hidden relative">
                  {/* Pergunta do usuário */}
                  <AnimatePresence>
                    {faqs[currentQueryIndex] && (
                      <motion.div
                        key={`q-${currentQueryIndex}`}
                        className="flex justify-end mb-2"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="max-w-[75%] bg-[#42f587]/10 text-white text-xs px-3 py-1.5 rounded-xl rounded-tr-none">
                          {faqs[currentQueryIndex].question}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  
                  {/* Resposta da IA */}
                  <AnimatePresence>
                    {(isTyping || showResponse) && (
                      <motion.div
                        key={`r-${currentQueryIndex}`}
                        className="flex mb-2"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="flex items-start">
                          <div className="w-5 h-5 rounded-full bg-[#42f587] flex items-center justify-center text-[#121728] text-[8px] font-bold mr-1.5">
                            AI
                          </div>
                          <div className="max-w-[75%] bg-[#252d4d] text-white text-xs px-3 py-1.5 rounded-xl rounded-tl-none">
                            {currentResponse}
                            {isTyping && <span className="inline-block w-1.5 h-3 ml-0.5 bg-[#42f587] animate-pulse"></span>}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  
                  {/* Botão de input */}
                  <div className="absolute bottom-0 left-0 right-0 h-10 flex items-center px-3 border-t border-[#252d4d]">
                    <div className="flex-1 h-6 bg-[#252d4d] rounded-full px-3 flex items-center text-white/30 text-[10px]">
                      Digite sua pergunta...
                    </div>
                    <button className="ml-2 w-6 h-6 rounded-full bg-[#42f587] flex items-center justify-center">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22 2L11 13" stroke="#121728" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="#121728" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </motion.div>
              
              {/* Perguntas Frequentes */}
              <motion.div 
                className="bg-[#1a1e3c] rounded-lg p-3"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                <h4 className="text-white text-xs font-medium mb-2">Top Perguntas</h4>
                <div className="space-y-2">
                  {faqs.slice(0, 3).map((faq, idx) => (
                    <div key={faq.id} className="flex items-center justify-between">
                      <div className="text-white/80 text-[10px]">{faq.question}</div>
                      <div className="flex items-center">
                        <div 
                          className="h-1.5 rounded-full bg-[#42f587]" 
                          style={{ width: `${(faq.frequency / 100) * 40}px` }}
                        ></div>
                        <span className="text-[10px] text-white/60 ml-1.5">{faq.frequency}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

// Componente que seleciona a animação correta com base no índice
const FeatureAnimation: React.FC<{
  isReversed: boolean;
  scrollYProgress: MotionValue<number>;
  index: number;
}> = ({ isReversed, scrollYProgress, index }) => {
  // Selecionar a animação com base no índice
  switch (index) {
    case 0:
      return <MessageBroadcastAnimation isReversed={isReversed} scrollYProgress={scrollYProgress} />;
    case 1:
      return <CalendarAnimation isReversed={isReversed} scrollYProgress={scrollYProgress} />;
    case 2:
      return <AIAnalyticsAnimation isReversed={isReversed} scrollYProgress={scrollYProgress} />;
    default:
      return <MessageBroadcastAnimation isReversed={isReversed} scrollYProgress={scrollYProgress} />;
  }
};

// Componente de Seção Alternada
const AlternatingFeatureSection: React.FC<{
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  isReversed: boolean;
  icon: React.ReactNode;
  index: number;
}> = ({ 
  title, 
  description, 
  buttonText, 
  buttonLink, 
  isReversed,
  icon, 
  index
}) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  return (
    <div ref={ref} className="py-16 md:py-24">
      <div className="container mx-auto">
        <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center`}>
          <motion.div
            className={`order-2 ${isReversed ? 'md:order-1' : 'md:order-2'}`}
            style={{ 
              opacity: useTransform(scrollYProgress, [0.1, 0.3], [0, 1]),
            }}
          >
            <FeatureAnimation 
              isReversed={isReversed}
              scrollYProgress={scrollYProgress}
              index={index}
            />
          </motion.div>
          
          <motion.div
            className={`order-1 ${isReversed ? 'md:order-2' : 'md:order-1'}`}
            style={{ 
              opacity: useTransform(scrollYProgress, [0.1, 0.3], [0, 1]),
              x: useTransform(
                scrollYProgress, 
                [0.1, 0.3], 
                [isReversed ? 100 : -100, 0]
              )
            }}
          >
            <div className="text-left">
              <div className="inline-block mb-4 px-4 py-2 rounded-full glass-green border border-[#42f587]/30 backdrop-blur-sm">
                <p className="text-sm font-medium text-white flex items-center">
                  <span className="inline-block w-2 h-2 bg-[#42f587] rounded-full mr-2 animate-pulse"></span>
                  {icon}
                </p>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                {title}
              </h2>
              <p className="text-xl text-white/70 mb-8">
                {description}
              </p>
              <Button
                size="lg"
                className="bg-gradient-to-r from-[#42f587] to-[#2ed671] hover:from-[#2ed671] hover:to-[#2ed671] text-white rounded-full px-8 py-6 text-lg"
              >
                {buttonText}
              </Button>
              <p className="mt-4 text-sm text-[#42f587]/80">✨ Comece agora mesmo • Sem complicações</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

// Componente principal que agrupa todas as seções
const AlternatingFeaturesSection: React.FC = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Fundo com grade e glassmorphism */}
      <div className="absolute inset-0 bg-grid-white bg-[size:40px_40px] -z-10 opacity-5" />
      <div className="absolute inset-0 bg-[#1a1e3c] -z-20" />
      
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
      
      {/* Bolhas decorativas */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, index) => (
          <motion.div
            key={index}
            className="absolute rounded-full bg-white/5"
            style={{
              width: `${Math.random() * 300 + 100}px`,
              height: `${Math.random() * 300 + 100}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 150}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0],
              scale: [1, Math.random() * 0.2 + 0.9, 1],
            }}
            transition={{
              repeat: Infinity,
              duration: Math.random() * 10 + 10,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
      
      {/* Conteúdo principal */}
      <div className="container mx-auto px-4 relative z-10">
        {sections.map((section, index) => (
          <div 
            key={section.id}
            className={section.id === 2 ? 'py-[100px]' : ''}
          >
            <AlternatingFeatureSection
              title={section.title}
              description={section.description}
              buttonText={section.buttonText}
              buttonLink={section.buttonLink}
              isReversed={section.isReversed}
              icon={section.icon}
              index={index}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default AlternatingFeaturesSection;
