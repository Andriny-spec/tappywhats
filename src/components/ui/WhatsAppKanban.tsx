import { motion } from 'framer-motion';
import React from 'react';

export function WhatsAppKanban() {
  // Cores do tema glassmorphism
  const blueColor = "#1a1e3c";
  const greenColor = "#42f587";
  
  return (
    <div className="w-full h-full flex items-center justify-center">
      <svg
        viewBox="0 0 500 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Fundo do Kanban */}
        <rect width="500" height="400" rx="15" fill={blueColor} fillOpacity="0.2" />
        
        {/* Colunas do Kanban */}
        <g>
          {/* Coluna 1 - Novos Contatos */}
          <rect x="20" y="50" width="140" height="320" rx="10" fill={blueColor} fillOpacity="0.3" />
          <text x="40" y="30" fill="white" fontSize="14" fontWeight="bold">
            Novos Contatos
          </text>
          
          {/* Cartões da Coluna 1 */}
          <motion.g
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <rect x="30" y="60" width="120" height="70" rx="8" fill={greenColor} fillOpacity="0.1" stroke={greenColor} strokeOpacity="0.3" />
            <circle cx="50" cy="80" r="12" fill={greenColor} fillOpacity="0.2" />
            {/* Ícone WhatsApp */}
            <path d="M50 75 a5 5 0 0 0 -5 5 a5 5 0 0 0 5 5 a5 5 0 0 0 5 -5 a5 5 0 0 0 -5 -5 m0 0.8 a4.2 4.2 0 0 1 4.2 4.2 a4.2 4.2 0 0 1 -4.2 4.2 a4.2 4.2 0 0 1 -4.2 -4.2 a4.2 4.2 0 0 1 4.2 -4.2 m0.1 6.4 c0.55 0 1 -0.27 1.1 -0.65 l-0.66 -0.32 c-0.07 0.15 -0.28 0.27 -0.44 0.27 c-0.18 0 -0.36 -0.15 -0.36 -0.35 v-1.46 h0.87 v-0.65 h-0.87 v-0.8 h-0.65 v0.8 h-0.45 v0.66 h0.45 v1.46 c0 0.56 0.45 1.05 1.02 1.05 z" fill="white" />
            <rect x="70" y="75" width="70" height="10" rx="2" fill="white" fillOpacity="0.5" />
            <rect x="70" y="90" width="50" height="6" rx="2" fill="white" fillOpacity="0.3" />
            <rect x="70" y="100" width="60" height="6" rx="2" fill="white" fillOpacity="0.3" />
          </motion.g>
          
          <motion.g
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <rect x="30" y="140" width="120" height="70" rx="8" fill={greenColor} fillOpacity="0.1" stroke={greenColor} strokeOpacity="0.3" />
            <circle cx="50" cy="160" r="12" fill={greenColor} fillOpacity="0.2" />
            {/* Ícone WhatsApp */}
            <path d="M50 155 a5 5 0 0 0 -5 5 a5 5 0 0 0 5 5 a5 5 0 0 0 5 -5 a5 5 0 0 0 -5 -5 m0 0.8 a4.2 4.2 0 0 1 4.2 4.2 a4.2 4.2 0 0 1 -4.2 4.2 a4.2 4.2 0 0 1 -4.2 -4.2 a4.2 4.2 0 0 1 4.2 -4.2 m0.1 6.4 c0.55 0 1 -0.27 1.1 -0.65 l-0.66 -0.32 c-0.07 0.15 -0.28 0.27 -0.44 0.27 c-0.18 0 -0.36 -0.15 -0.36 -0.35 v-1.46 h0.87 v-0.65 h-0.87 v-0.8 h-0.65 v0.8 h-0.45 v0.66 h0.45 v1.46 c0 0.56 0.45 1.05 1.02 1.05 z" fill="white" />
            <rect x="70" y="155" width="70" height="10" rx="2" fill="white" fillOpacity="0.5" />
            <rect x="70" y="170" width="50" height="6" rx="2" fill="white" fillOpacity="0.3" />
            <rect x="70" y="180" width="60" height="6" rx="2" fill="white" fillOpacity="0.3" />
          </motion.g>
        </g>
        
        {/* Coluna 2 - Em Negociação */}
        <g>
          <rect x="180" y="50" width="140" height="320" rx="10" fill={blueColor} fillOpacity="0.3" />
          <text x="200" y="30" fill="white" fontSize="14" fontWeight="bold">
            Em Negociação
          </text>
          
          {/* Cartões da Coluna 2 */}
          <motion.g
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <rect x="190" y="60" width="120" height="70" rx="8" fill={greenColor} fillOpacity="0.2" stroke={greenColor} strokeOpacity="0.4" />
            <circle cx="210" cy="80" r="12" fill={greenColor} fillOpacity="0.3" />
            {/* Ícone WhatsApp */}
            <path d="M210 75 a5 5 0 0 0 -5 5 a5 5 0 0 0 5 5 a5 5 0 0 0 5 -5 a5 5 0 0 0 -5 -5 m0 0.8 a4.2 4.2 0 0 1 4.2 4.2 a4.2 4.2 0 0 1 -4.2 4.2 a4.2 4.2 0 0 1 -4.2 -4.2 a4.2 4.2 0 0 1 4.2 -4.2 m0.1 6.4 c0.55 0 1 -0.27 1.1 -0.65 l-0.66 -0.32 c-0.07 0.15 -0.28 0.27 -0.44 0.27 c-0.18 0 -0.36 -0.15 -0.36 -0.35 v-1.46 h0.87 v-0.65 h-0.87 v-0.8 h-0.65 v0.8 h-0.45 v0.66 h0.45 v1.46 c0 0.56 0.45 1.05 1.02 1.05 z" fill="white" />
            <rect x="230" y="75" width="70" height="10" rx="2" fill="white" fillOpacity="0.7" />
            <rect x="230" y="90" width="50" height="6" rx="2" fill="white" fillOpacity="0.4" />
            <rect x="230" y="100" width="60" height="6" rx="2" fill="white" fillOpacity="0.4" />
          </motion.g>
          
          <motion.g
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity, 
              repeatType: "reverse", 
              repeatDelay: 2,
              delay: 1.2
            }}
          >
            <rect x="190" y="140" width="120" height="70" rx="8" fill={greenColor} fillOpacity="0.15" stroke={greenColor} strokeOpacity="0.5" />
            <circle cx="210" cy="160" r="12" fill={greenColor} fillOpacity="0.3" />
            {/* Ícone WhatsApp */}
            <path d="M210 155 a5 5 0 0 0 -5 5 a5 5 0 0 0 5 5 a5 5 0 0 0 5 -5 a5 5 0 0 0 -5 -5 m0 0.8 a4.2 4.2 0 0 1 4.2 4.2 a4.2 4.2 0 0 1 -4.2 4.2 a4.2 4.2 0 0 1 -4.2 -4.2 a4.2 4.2 0 0 1 4.2 -4.2 m0.1 6.4 c0.55 0 1 -0.27 1.1 -0.65 l-0.66 -0.32 c-0.07 0.15 -0.28 0.27 -0.44 0.27 c-0.18 0 -0.36 -0.15 -0.36 -0.35 v-1.46 h0.87 v-0.65 h-0.87 v-0.8 h-0.65 v0.8 h-0.45 v0.66 h0.45 v1.46 c0 0.56 0.45 1.05 1.02 1.05 z" fill="white" />
            <rect x="230" y="155" width="70" height="10" rx="2" fill="white" fillOpacity="0.6" />
            <rect x="230" y="170" width="50" height="6" rx="2" fill="white" fillOpacity="0.4" />
            <rect x="230" y="180" width="60" height="6" rx="2" fill="white" fillOpacity="0.4" />
          </motion.g>
        </g>
        
        {/* Coluna 3 - Fechados */}
        <g>
          <rect x="340" y="50" width="140" height="320" rx="10" fill={blueColor} fillOpacity="0.3" />
          <text x="380" y="30" fill="white" fontSize="14" fontWeight="bold">
            Fechados
          </text>
          
          {/* Cartões da Coluna 3 com notificação */}
          <motion.g
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            <rect x="350" y="60" width="120" height="70" rx="8" fill={greenColor} fillOpacity="0.3" stroke={greenColor} strokeOpacity="0.6" />
            <circle cx="370" cy="80" r="12" fill={greenColor} fillOpacity="0.5" />
            {/* Ícone WhatsApp */}
            <path d="M370 75 a5 5 0 0 0 -5 5 a5 5 0 0 0 5 5 a5 5 0 0 0 5 -5 a5 5 0 0 0 -5 -5 m0 0.8 a4.2 4.2 0 0 1 4.2 4.2 a4.2 4.2 0 0 1 -4.2 4.2 a4.2 4.2 0 0 1 -4.2 -4.2 a4.2 4.2 0 0 1 4.2 -4.2 m0.1 6.4 c0.55 0 1 -0.27 1.1 -0.65 l-0.66 -0.32 c-0.07 0.15 -0.28 0.27 -0.44 0.27 c-0.18 0 -0.36 -0.15 -0.36 -0.35 v-1.46 h0.87 v-0.65 h-0.87 v-0.8 h-0.65 v0.8 h-0.45 v0.66 h0.45 v1.46 c0 0.56 0.45 1.05 1.02 1.05 z" fill="white" />
            <rect x="390" y="75" width="70" height="10" rx="2" fill="white" fillOpacity="0.8" />
            <rect x="390" y="90" width="50" height="6" rx="2" fill="white" fillOpacity="0.5" />
            <rect x="390" y="100" width="60" height="6" rx="2" fill="white" fillOpacity="0.5" />
            
            {/* Notificação pulsante */}
            <motion.circle 
              cx="455" 
              cy="70" 
              r="8" 
              fill={greenColor}
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.7, 1, 0.7]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatType: "loop" 
              }}
            />
            <text x="452" y="74" fill="white" fontSize="10" fontWeight="bold">
              3
            </text>
          </motion.g>
        </g>
        
        {/* Animação de card se movendo entre colunas */}
        <motion.g
          initial={{ x: 30, y: 220 }}
          animate={{ x: [30, 190, 350], y: [220, 220, 220] }}
          transition={{ 
            duration: 4,
            times: [0, 0.4, 1],
            repeat: Infinity,
            repeatDelay: 2,
            repeatType: "loop"
          }}
        >
          <rect width="120" height="70" rx="8" fill={greenColor} fillOpacity="0.25" stroke={greenColor} strokeWidth="1.5" />
          <circle cx="20" cy="20" r="12" fill={greenColor} fillOpacity="0.4" />
          {/* Ícone WhatsApp */}
          <path d="M20 15 a5 5 0 0 0 -5 5 a5 5 0 0 0 5 5 a5 5 0 0 0 5 -5 a5 5 0 0 0 -5 -5 m0 0.8 a4.2 4.2 0 0 1 4.2 4.2 a4.2 4.2 0 0 1 -4.2 4.2 a4.2 4.2 0 0 1 -4.2 -4.2 a4.2 4.2 0 0 1 4.2 -4.2 m0.1 6.4 c0.55 0 1 -0.27 1.1 -0.65 l-0.66 -0.32 c-0.07 0.15 -0.28 0.27 -0.44 0.27 c-0.18 0 -0.36 -0.15 -0.36 -0.35 v-1.46 h0.87 v-0.65 h-0.87 v-0.8 h-0.65 v0.8 h-0.45 v0.66 h0.45 v1.46 c0 0.56 0.45 1.05 1.02 1.05 z" fill="white" />
          <rect x="40" y="15" width="70" height="10" rx="2" fill="white" fillOpacity="0.9" />
          <rect x="40" y="30" width="50" height="6" rx="2" fill="white" fillOpacity="0.6" />
          <rect x="40" y="40" width="60" height="6" rx="2" fill="white" fillOpacity="0.6" />
          
          {/* Ícones de chat animados */}
          <motion.path 
            d="M95 50 L105 50 L105 55 L100 52 L95 55 Z" 
            fill={greenColor}
            animate={{ y: [0, -3, 0], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1, repeat: Infinity, repeatType: "loop", delay: 1 }}
          />
          <motion.path 
            d="M80 50 L90 50 L90 55 L85 52 L80 55 Z" 
            fill="white"
            animate={{ y: [0, -3, 0], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1, repeat: Infinity, repeatType: "loop", delay: 1.2 }}
          />
        </motion.g>
      </svg>
    </div>
  );
}
