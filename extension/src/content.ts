console.log('TappyWhats: Content script carregado');

// Interfaces
interface Config {
  language: string;
  darkMode: boolean;
  theme: string;
}

interface Feature {
  id: string;
  name: string;
  enabled: boolean;
}

interface Contact {
  phone: string;
  name: string;
}

interface StorageData {
  config: Config;
  features: Record<string, boolean>;
  contacts: Contact[];
  notifications: {
    inbox: any[];
    updates: { title: string; content: string; }[];
    pending: any[];
  };
  whatsappChats: any[];
}

interface Icon {
  name: string;
  icon: string;
  onClick?: () => void;
}

// Interfaces para o WhatsApp
interface WhatsAppChat {
  id: string;
  title: string;
  number: string;
  lastMessage: string;
  time: string;
  status: string;
}

// Ícones da sidebar
const icons: Icon[] = [
  {
    name: 'CRM',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>',
    onClick: () => {
      // Abrir em uma nova aba em vez de redirecionar a atual
      const crmUrl = chrome.runtime.getURL('crm/src/index.html');
      chrome.runtime.sendMessage({
        action: 'openCrm',
        url: crmUrl
      });
    }
  },
  {
    name: 'Envio em Massa',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"></path></svg>',
    onClick: () => {
      const modal = createBulkSendModal();
      document.body.appendChild(modal);
    }
  },
  {
    name: 'Central de Agendamentos',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>',
    onClick: () => {
      const modal = createScheduleModal();
      document.body.appendChild(modal);
    }
  },
  {
    name: 'Auto Atendimento',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>',
    onClick: () => {
      const modal = createAutoAttendModal();
      document.body.appendChild(modal);
    }
  },
  {
    name: 'Follow Up',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg>',
    onClick: () => {
      const modal = createFollowUpModal();
      document.body.appendChild(modal);
    }
  },
  {
    name: 'Status',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>',
    onClick: () => {
      const modal = createStatusModal();
      document.body.appendChild(modal);
    }
  },
  {
    name: 'API',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>',
    onClick: () => {
      const modal = createApiModal();
      document.body.appendChild(modal);
    }
  },
  {
    name: 'Webhook',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 7h2a5 5 0 0 0 0 10h-2m-6 0H7A5 5 0 0 1 7 7h2"></path><line x1="8" y1="12" x2="16" y2="12"></line></svg>',
    onClick: () => {
      const modal = createWebhookModal();
      document.body.appendChild(modal);
    }
  },
  {
    name: 'Atalhos Google',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>'
  },
  {
    name: 'Tutoriais',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>'
  },
  {
    name: 'Logar',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path><polyline points="10 17 15 12 10 7"></polyline><line x1="15" y1="12" x2="3" y2="12"></line></svg>'
  },
  {
    name: 'Configurações',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>',
    onClick: () => {
      const modal = createConfigModal();
      document.body.appendChild(modal);
    }
  },
  {
    name: 'Notificações',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>',
    onClick: () => {
      const modal = createNotificationsModal();
      document.body.appendChild(modal);
    }
  },
  {
    name: 'Funcionalidades',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>',
    onClick: () => {
      const modal = createFeaturesModal();
      document.body.appendChild(modal);
    }
  },
  {
    name: 'Iniciar Conversa',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>',
    onClick: () => {
      const modal = createStartChatModal();
      document.body.appendChild(modal);
    }
  },
  {
    name: 'Gerador de Links',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>',
    onClick: () => {
      const modal = createLinksModal();
      document.body.appendChild(modal);
    }
  }
];

// Storage
const storage = {
  async get<T>(key: keyof StorageData): Promise<T | null> {
    return new Promise((resolve) => {
      chrome.storage.local.get(key, (result) => {
        resolve(result[key] as T || null);
      });
    });
  },
  async set<T>(key: keyof StorageData, value: T): Promise<void> {
    return new Promise((resolve) => {
      chrome.storage.local.set({ [key]: value }, () => resolve());
    });
  }
};

// Configurações
const handleConfigChange = async (key: keyof Config, value: string | boolean) => {
  const config = await storage.get<Config>('config') || {
    language: 'pt',
    darkMode: false,
    theme: 'default'
  };
  
  (config as any)[key] = value; // Type assertion para evitar erro de tipagem
  await storage.set('config', config);
  
  // Aplicar configurações
  if (key === 'darkMode') {
    document.body.classList.toggle('dark-mode', value as boolean);
  }
};

// Funcionalidades
const handleFeatureToggle = async (featureId: string, enabled: boolean) => {
  const features = await storage.get<Record<string, boolean>>('features') || {};
  features[featureId] = enabled;
  await storage.set('features', features);
  
  // Atualizar ícones
  const icon = document.querySelector(`[data-feature="${featureId}"]`) as HTMLElement;
  if (icon) {
    icon.classList.toggle('disabled', !enabled);
  }
};

// Iniciar Conversa
const handleStartChat = async (phone: string, name?: string) => {
  const formattedPhone = phone.replace(/\D/g, '');
  const url = `https://wa.me/${formattedPhone}`;
  
  if (name) {
    // Salvar contato
    const contacts = await storage.get<Contact[]>('contacts') || [];
    contacts.push({ phone: formattedPhone, name });
    await storage.set('contacts', contacts);
  }
  
  window.open(url, '_blank');
};

// Links
const handleGenerateLink = (phone: string, message?: string) => {
  const formattedPhone = phone.replace(/\D/g, '');
  let url = `https://wa.me/${formattedPhone}`;
  
  if (message) {
    url += `?text=${encodeURIComponent(message)}`;
  }
  
  // Copiar para clipboard
  navigator.clipboard.writeText(url).then(() => {
    // Mostrar feedback
    const button = document.querySelector('.tappy-links-content button');
    if (button instanceof HTMLElement) {
      button.textContent = 'Link copiado!';
      setTimeout(() => {
        button.textContent = 'Obter link';
      }, 2000);
    }
  });
};

// Event Listeners
const initializeModals = () => {
  // Configurações
  document.querySelectorAll<HTMLInputElement>('.tappy-config-content select, .tappy-config-content input').forEach(input => {
    input.addEventListener('change', (e) => {
      const target = e.target as HTMLInputElement;
      const key = target.id.replace('config-', '') as keyof Config;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      handleConfigChange(key, value);
    });
  });
  
  // Funcionalidades
  document.querySelectorAll<HTMLInputElement>('.tappy-feature-toggle input').forEach(input => {
    input.addEventListener('change', (e) => {
      const target = e.target as HTMLInputElement;
      const toggle = target.closest('.tappy-feature-toggle');
      const featureId = toggle?.getAttribute('data-feature');
      if (featureId) {
        handleFeatureToggle(featureId, target.checked);
      }
    });
  });
  
  // Iniciar Conversa
  const startChatForm = document.querySelector<HTMLFormElement>('.tappy-start-chat-content form');
  if (startChatForm) {
    startChatForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const phone = startChatForm.querySelector<HTMLInputElement>('input[type="tel"]');
      const name = startChatForm.querySelector<HTMLInputElement>('input[type="text"]');
      if (phone) {
        handleStartChat(phone.value, name?.value);
      }
    });
  }
  
  // Links
  const linksForm = document.querySelector<HTMLFormElement>('.tappy-links-content form');
  if (linksForm) {
    linksForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const phone = linksForm.querySelector<HTMLInputElement>('input[type="tel"]');
      const message = linksForm.querySelector<HTMLTextAreaElement>('textarea');
      if (phone) {
        handleGenerateLink(phone.value, message?.value);
      }
    });
  }
};

// Funções para os modais
const createModal = (title: string, content: HTMLElement): HTMLElement => {
  const modal = document.createElement('div');
  modal.className = 'tappy-modal';
  
  // Adicionar animação de entrada
  requestAnimationFrame(() => {
    modal.classList.add('tappy-modal-show');
  });
  
  const modalContent = document.createElement('div');
  modalContent.className = 'tappy-modal-content';
  
  const header = document.createElement('div');
  header.className = 'tappy-modal-header';
  
  const titleEl = document.createElement('h2');
  titleEl.textContent = title;
  
  const closeBtn = document.createElement('button');
  closeBtn.innerHTML = '&times;';
  closeBtn.className = 'tappy-modal-close';
  closeBtn.onclick = () => {
    // Adicionar animação de saída
    modal.classList.remove('tappy-modal-show');
    modal.classList.add('tappy-modal-hide');
    
    setTimeout(() => {
      modal.remove();
    }, 300); // Tempo da animação
  };
  
  header.appendChild(titleEl);
  header.appendChild(closeBtn);
  
  modalContent.appendChild(header);
  modalContent.appendChild(content);
  modal.appendChild(modalContent);
  
  // Fechar ao clicar fora
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeBtn.click();
    }
  });
  
  // Fechar com ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && document.body.contains(modal)) {
      closeBtn.click();
    }
  });
  
  return modal;
};

const createConfigModal = () => {
  const content = document.createElement('div');
  content.className = 'tappy-config-content';
  
  // Idioma
  const langSelect = document.createElement('select');
  langSelect.innerHTML = `
    <option value="pt">Português</option>
    <option value="en">English</option>
    <option value="es">Español</option>
  `;
  
  // Modo escuro
  const darkModeToggle = document.createElement('input');
  darkModeToggle.type = 'checkbox';
  
  // Tema
  const themeSelect = document.createElement('select');
  themeSelect.innerHTML = `
    <option value="default">Padrão</option>
    <option value="light">Claro</option>
    <option value="dark">Escuro</option>
  `;
  
  content.appendChild(createFormGroup('Idioma', langSelect));
  content.appendChild(createFormGroup('Modo escuro', darkModeToggle));
  content.appendChild(createFormGroup('Tema', themeSelect));
  
  return createModal('Configurações', content);
};

const createNotificationsModal = () => {
  const content = document.createElement('div');
  content.className = 'tappy-notifications-content';
  
  const tabs = document.createElement('div');
  tabs.className = 'tappy-tabs';
  tabs.innerHTML = `
    <button class="active">Inbox</button>
    <button>Comunicados</button>
    <button>Atualizações</button>
    <button>Pendentes</button>
  `;
  
  content.appendChild(tabs);
  
  return createModal('Notificações', content);
};

const createFeaturesModal = () => {
  const content = document.createElement('div');
  content.className = 'tappy-features-content';
  
  const features: Feature[] = [
    { id: 'crm', name: 'CRM', enabled: true },
    { id: 'mass_message', name: 'Envio em Massa', enabled: true },
    { id: 'scheduler', name: 'Central de Agendamentos', enabled: true },
    { id: 'auto_reply', name: 'Auto Atendimento', enabled: true },
    { id: 'follow_up', name: 'Follow Up', enabled: true },
    { id: 'status', name: 'Status', enabled: true },
    { id: 'api', name: 'API', enabled: true },
    { id: 'webhook', name: 'WebHook', enabled: true },
    { id: 'links', name: 'Links', enabled: true }
  ];
  
  features.forEach(feature => {
    const toggle = createFeatureToggle(feature);
    content.appendChild(toggle);
  });
  
  return createModal('Funcionalidades do Menu', content);
};

const createStartChatModal = () => {
  const content = document.createElement('div');
  content.className = 'tappy-start-chat-content';
  
  const form = document.createElement('form');
  form.innerHTML = `
    <div class="tappy-form-group">
      <label>Número do WhatsApp:</label>
      <div class="tappy-phone-input">
        <select class="tappy-country-code">
          <option value="55">🇧🇷 +55</option>
        </select>
        <input type="tel" placeholder="DDD + Número" />
      </div>
    </div>
    <div class="tappy-form-group">
      <label>Nome a ser salvo (Opcional):</label>
      <input type="text" placeholder="Nome" />
    </div>
    <button type="submit" class="tappy-button">Conversar agora</button>
  `;
  
  content.appendChild(form);
  
  return createModal('Iniciar uma conversa', content);
};

const createLinksModal = () => {
  const content = document.createElement('div');
  content.className = 'tappy-links-content';
  
  const form = document.createElement('form');
  form.innerHTML = `
    <div class="tappy-form-group">
      <label>Número do WhatsApp:</label>
      <div class="tappy-phone-input">
        <select class="tappy-country-code">
          <option value="55">🇧🇷 +55</option>
        </select>
        <input type="tel" placeholder="DDD + Número" />
      </div>
    </div>
    <div class="tappy-form-group">
      <label>Mensagem:</label>
      <textarea placeholder="Escreva uma mensagem"></textarea>
    </div>
    <button type="submit" class="tappy-button">Obter link</button>
  `;
  
  content.appendChild(form);
  
  return createModal('Gerador de links', content);
};

const createApiModal = () => {
  const content = document.createElement('div');
  
  const description = document.createElement('p');
  description.textContent = 'Conecte seu WhatsApp Web a automações externas gerando um token de acesso e consumindo as rotas da API disponíveis na documentação.';
  
  const tokenSection = document.createElement('div');
  tokenSection.className = 'tappy-modal-section';
  
  const tokenLabel = document.createElement('label');
  tokenLabel.textContent = 'Gere seu token de autenticação';
  
  const tokenButton = document.createElement('button');
  tokenButton.className = 'tappy-button';
  tokenButton.textContent = 'Gerar Token';
  tokenButton.onclick = () => {
    // Implementar geração de token
  };

  const copyButton = document.createElement('button');
  copyButton.className = 'tappy-button-icon';
  copyButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg>';
  
  const toggleSection = document.createElement('div');
  toggleSection.className = 'tappy-modal-section';
  
  const toggleLabel = document.createElement('label');
  toggleLabel.textContent = 'Ativar/Desativar API';
  
  const toggle = document.createElement('label');
  toggle.className = 'tappy-toggle';
  toggle.innerHTML = `
    <input type="checkbox">
    <span class="tappy-toggle-slider"></span>
  `;
  
  const docsButton = document.createElement('button');
  docsButton.className = 'tappy-button primary';
  docsButton.textContent = 'Abrir Documentação';
  docsButton.onclick = () => {
    window.open('https://docs.whatsapp.com/api', '_blank');
  };

  tokenSection.appendChild(tokenLabel);
  tokenSection.appendChild(tokenButton);
  tokenSection.appendChild(copyButton);
  
  toggleSection.appendChild(toggleLabel);
  toggleSection.appendChild(toggle);
  
  content.appendChild(description);
  content.appendChild(tokenSection);
  content.appendChild(toggleSection);
  content.appendChild(docsButton);
  
  return createModal('Configurar API', content);
};

const createWebhookModal = () => {
  const content = document.createElement('div');
  
  const description = document.createElement('p');
  description.textContent = 'Envie dados dos contatos para outra aplicação após a execução dos eventos cadastrados';
  
  // Integrações
  const integrations = document.createElement('div');
  integrations.className = 'tappy-integrations';
  
  const platforms = [
    'Zapier', '2424', 'Bubble', 'Pipefy', 'HubSpot', 'GoogleSheets', 'Make', 'n8n'
  ];
  
  platforms.forEach(platform => {
    const icon = document.createElement('div');
    icon.className = 'tappy-integration-icon';
    icon.setAttribute('data-platform', platform);
    integrations.appendChild(icon);
  });

  // Seção de Eventos
  const eventsSection = document.createElement('div');
  eventsSection.className = 'tappy-webhook-section';
  
  const eventsTitle = document.createElement('h3');
  eventsTitle.textContent = 'Eventos';
  
  const eventsList = document.createElement('div');
  eventsList.className = 'tappy-events-list';
  
  const events = [
    'Anúncio do Instagram',
    'Encerrar Atendimento',
    'Respostas Rápidas',
    'Auto Atendimento',
    'Follow Up',
    'Agendamento',
    'CRM',
    'Etiqueta'
  ];
  
  events.forEach(event => {
    const eventItem = document.createElement('div');
    eventItem.className = 'tappy-event-item';
    
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    
    const label = document.createElement('label');
    label.textContent = event;
    
    eventItem.appendChild(checkbox);
    eventItem.appendChild(label);
    eventsList.appendChild(eventItem);
  });

  // URL do Webhook
  const urlSection = document.createElement('div');
  urlSection.className = 'tappy-webhook-section';
  
  const urlLabel = document.createElement('label');
  urlLabel.textContent = 'URL do WebHook';
  
  const urlInput = document.createElement('input');
  urlInput.type = 'text';
  urlInput.placeholder = 'Insira a URL de destino aqui';
  
  // Dados a enviar
  const dataSection = document.createElement('div');
  dataSection.className = 'tappy-webhook-section';
  
  const dataTitle = document.createElement('h3');
  dataTitle.textContent = 'Dados a enviar';
  
  const dataFields = [
    'Dados do Evento',
    'Número',
    'Nome',
    'Foto',
    'Etiqueta',
    'Perfil do Contato'
  ];
  
  const dataList = document.createElement('div');
  dataList.className = 'tappy-data-list';
  
  dataFields.forEach(field => {
    const fieldItem = document.createElement('div');
    fieldItem.className = 'tappy-field-item';
    
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    
    const label = document.createElement('label');
    label.textContent = field;
    
    fieldItem.appendChild(checkbox);
    fieldItem.appendChild(label);
    dataList.appendChild(fieldItem);
  });

  eventsSection.appendChild(eventsTitle);
  eventsSection.appendChild(eventsList);
  
  urlSection.appendChild(urlLabel);
  urlSection.appendChild(urlInput);
  
  dataSection.appendChild(dataTitle);
  dataSection.appendChild(dataList);
  
  content.appendChild(description);
  content.appendChild(integrations);
  content.appendChild(eventsSection);
  content.appendChild(urlSection);
  content.appendChild(dataSection);
  
  return createModal('WebHooks', content);
};

const createFollowUpModal = () => {
  const content = document.createElement('div');
  content.className = 'tappy-followup-form';

  // Empty State
  const emptyState = document.createElement('div');
  emptyState.className = 'tappy-empty-state';
  emptyState.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
    </svg>
    <h3>Nenhum Follow Up foi criado</h3>
    <p>Configure um Follow Up para gerenciar suas interações com clientes</p>
  `;

  // Botão Criar
  const createButton = document.createElement('button');
  createButton.className = 'tappy-button primary';
  createButton.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <line x1="12" y1="5" x2="12" y2="19"></line>
      <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
    Criar Follow Up
  `;
  createButton.onclick = () => {
    content.innerHTML = '';
    content.appendChild(createFollowUpForm());
  };

  content.appendChild(emptyState);
  content.appendChild(createButton);

  return createModal('Follow Up', content);
}

const createFollowUpForm = () => {
  const form = document.createElement('div');
  form.className = 'tappy-followup-form';

  // Nome do Follow Up
  const nameGroup = document.createElement('div');
  nameGroup.className = 'tappy-form-group';
  nameGroup.innerHTML = `
    <label>Nome do follow up</label>
    <input type="text" placeholder="Insira o nome do follow up">
  `;

  // Configurações do Funil
  const funnelConfig = document.createElement('div');
  funnelConfig.className = 'tappy-accordion';
  funnelConfig.innerHTML = `
    <div class="tappy-accordion-header">
      <h4>Configurações Do Funil</h4>
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="6 9 12 15 18 9"></polyline>
      </svg>
    </div>
    <div class="tappy-accordion-content">
      <!-- Conteúdo do funil aqui -->
    </div>
  `;

  // Acionamento do Follow Up
  const triggerConfig = document.createElement('div');
  triggerConfig.className = 'tappy-accordion';
  triggerConfig.innerHTML = `
    <div class="tappy-accordion-header">
      <h4>Acionamento Do Follow Up</h4>
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="6 9 12 15 18 9"></polyline>
      </svg>
    </div>
    <div class="tappy-accordion-content">
      <!-- Opções de acionamento aqui -->
    </div>
  `;

  // Botões
  const buttons = document.createElement('div');
  buttons.style.display = 'flex';
  buttons.style.gap = '12px';
  buttons.style.marginTop = '24px';

  const cancelButton = document.createElement('button');
  cancelButton.className = 'tappy-button';
  cancelButton.textContent = 'Cancelar';

  const saveButton = document.createElement('button');
  saveButton.className = 'tappy-button primary';
  saveButton.textContent = 'Criar';

  buttons.appendChild(cancelButton);
  buttons.appendChild(saveButton);

  form.appendChild(nameGroup);
  form.appendChild(funnelConfig);
  form.appendChild(triggerConfig);
  form.appendChild(buttons);

  return form;
}

const createStatusModal = () => {
  const content = document.createElement('div');

  // Empty State
  const emptyState = document.createElement('div');
  emptyState.className = 'tappy-empty-state';
  emptyState.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <line x1="18" y1="20" x2="18" y2="10"></line>
      <line x1="12" y1="20" x2="12" y2="4"></line>
      <line x1="6" y1="20" x2="6" y2="14"></line>
    </svg>
    <h3>Nenhum status encontrado</h3>
    <p>Parece que você ainda não criou nenhum status. Clique no botão abaixo para adicionar um novo status.</p>
  `;

  // Botão Criar
  const createButton = document.createElement('button');
  createButton.className = 'tappy-button primary';
  createButton.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <line x1="12" y1="5" x2="12" y2="19"></line>
      <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
    Criar Status
  `;
  createButton.onclick = () => {
    content.innerHTML = '';
    content.appendChild(createStatusForm());
  };

  content.appendChild(emptyState);
  content.appendChild(createButton);

  return createModal('Status ativos', content);
}

const createStatusForm = () => {
  const form = document.createElement('div');

  // Nome do Status
  const nameGroup = document.createElement('div');
  nameGroup.className = 'tappy-form-group';
  nameGroup.innerHTML = `
    <label>Nome do status (opcional)</label>
    <input type="text" placeholder="Crie um nome para o status">
  `;

  // Tipo de Status
  const typeOptions = document.createElement('div');
  typeOptions.className = 'tappy-status-options';
  typeOptions.innerHTML = `
    <div class="tappy-status-option active">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
      </svg>
      Texto
    </div>
    <div class="tappy-status-option">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
        <circle cx="8.5" cy="8.5" r="1.5"></circle>
        <polyline points="21 15 16 10 5 21"></polyline>
      </svg>
      Imagem
    </div>
    <div class="tappy-status-option">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polygon points="23 7 16 12 23 17 23 7"></polygon>
        <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
      </svg>
      Vídeo
    </div>
    <div class="tappy-status-option">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M3 18v-6a9 9 0 0 1 18 0v6"></path>
        <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path>
      </svg>
      Áudio
    </div>
  `;

  // Área de Upload
  const uploadArea = document.createElement('div');
  uploadArea.className = 'tappy-status-upload';
  uploadArea.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
      <polyline points="17 8 12 3 7 8"></polyline>
      <line x1="12" y1="3" x2="12" y2="15"></line>
    </svg>
    <p>Arraste o arquivo aqui</p>
  `;

  // Footer
  const footer = document.createElement('div');
  footer.className = 'tappy-status-footer';

  const schedule = document.createElement('div');
  schedule.className = 'tappy-status-schedule';
  schedule.innerHTML = `
    <input type="checkbox" id="schedule-status">
    <label for="schedule-status">Programar o status</label>
  `;

  const buttons = document.createElement('div');
  buttons.style.display = 'flex';
  buttons.style.gap = '12px';

  const cancelButton = document.createElement('button');
  cancelButton.className = 'tappy-button';
  cancelButton.textContent = 'Cancelar';

  const createButton = document.createElement('button');
  createButton.className = 'tappy-button primary';
  createButton.textContent = 'Criar';

  buttons.appendChild(cancelButton);
  buttons.appendChild(createButton);

  footer.appendChild(schedule);
  footer.appendChild(buttons);

  form.appendChild(nameGroup);
  form.appendChild(typeOptions);
  form.appendChild(uploadArea);
  form.appendChild(footer);

  return form;
}

const createScheduleModal = () => {
  const content = document.createElement('div');
  content.className = 'tappy-schedule';

  // Calendário
  const calendar = document.createElement('div');
  calendar.className = 'tappy-calendar';

  // Header do Calendário
  const calendarHeader = document.createElement('div');
  calendarHeader.className = 'tappy-calendar-header';
  calendarHeader.innerHTML = `
    <div class="tappy-calendar-nav">
      <button class="tappy-button icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </button>
      <h2>2025</h2>
      <button class="tappy-button icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </button>
    </div>
    <button class="tappy-button menu">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="3" y1="12" x2="21" y2="12"></line>
        <line x1="3" y1="6" x2="21" y2="6"></line>
        <line x1="3" y1="18" x2="21" y2="18"></line>
      </svg>
    </button>
  `;

  // Meses
  const months = document.createElement('div');
  months.className = 'tappy-months';
  const monthNames = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
  monthNames.forEach(month => {
    const monthButton = document.createElement('button');
    monthButton.className = month === 'Fevereiro' ? 'active' : '';
    monthButton.textContent = month;
    months.appendChild(monthButton);
  });

  // Grid do Calendário
  const calendarGrid = document.createElement('div');
  calendarGrid.className = 'tappy-calendar-grid';
  calendarGrid.innerHTML = `
    <div class="tappy-calendar-weekdays">
      <div>Dom</div>
      <div>Seg</div>
      <div>Ter</div>
      <div>Qua</div>
      <div>Qui</div>
      <div>Sex</div>
      <div>Sáb</div>
    </div>
    <div class="tappy-calendar-days">
      <!-- Dias do mês aqui -->
    </div>
  `;

  // Painel Lateral
  const sidePanel = document.createElement('div');
  sidePanel.className = 'tappy-schedule-panel';
  sidePanel.innerHTML = `
    <div class="tappy-schedule-header">
      <h3>Fevereiro 14, 2025</h3>
      <button class="tappy-button icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
      </button>
    </div>
    <div class="tappy-schedule-list">
      <div class="tappy-empty-state">
        <p>Nenhum evento</p>
      </div>
    </div>
  `;

  calendar.appendChild(calendarHeader);
  calendar.appendChild(months);
  calendar.appendChild(calendarGrid);
  
  content.appendChild(calendar);
  content.appendChild(sidePanel);

  return createModal('Central de Agendamentos', content);
}

const createAutoAttendModal = () => {
  const content = document.createElement('div');
  content.className = 'tappy-auto-attend';

  // Empty State
  const emptyState = document.createElement('div');
  emptyState.className = 'tappy-empty-state';
  emptyState.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
    </svg>
    <h3>Nenhum autoatendimento encontrado</h3>
    <p>Parece que você ainda não criou nenhum autoatendimento. Clique no botão abaixo para criar um novo.</p>
  `;

  // Botão Criar
  const createButton = document.createElement('button');
  createButton.className = 'tappy-button primary';
  createButton.innerHTML = 'Criar';
  createButton.onclick = () => {
    content.innerHTML = '';
    content.appendChild(createAutoAttendForm());
  };

  content.appendChild(emptyState);
  content.appendChild(createButton);

  return createModal('Auto Atendimento', content);
}

const createAutoAttendForm = () => {
  const form = document.createElement('div');
  form.className = 'tappy-auto-attend-form';

  form.innerHTML = `
    <div class="tappy-form-group">
      <label>Nome do Auto Atendimento</label>
      <input type="text" placeholder="Insira um nome para o Auto Atendimento">
    </div>

    <div class="tappy-form-section">
      <h4>Acionamento do Auto Atendimento</h4>
      <select>
        <option value="">Selecione uma opção</option>
      </select>
    </div>

    <div class="tappy-form-section">
      <div class="tappy-section-header">
        <h4>Ação</h4>
        <button class="tappy-button icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
        </button>
      </div>
      <div class="tappy-empty-state">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="16"></line>
          <line x1="8" y1="12" x2="16" y2="12"></line>
        </svg>
        <p>Nenhuma ação foi atribuída</p>
        <span>Adicione ações para usar o autoatendimento nos seus clientes</span>
        <button class="tappy-button outline">Adicionar Ação</button>
      </div>
    </div>

    <div class="tappy-form-section">
      <h4>Regras de Acionamento</h4>
      <select>
        <option value="">Selecione uma opção</option>
      </select>
    </div>

    <div class="tappy-form-footer">
      <button class="tappy-button">Cancelar</button>
      <button class="tappy-button primary">Criar</button>
    </div>
  `;

  return form;
}

const createBulkSendModal = () => {
  const content = document.createElement('div');
  content.className = 'tappy-bulk-send';

  // Header
  const header = document.createElement('div');
  header.className = 'tappy-bulk-send-header';
  header.innerHTML = `
    <h2>Envio Rápido</h2>
    <button class="tappy-button outline">Fechar</button>
  `;

  // Main Content
  const mainContent = document.createElement('div');
  mainContent.className = 'tappy-bulk-send-content';

  // Left Column
  const leftColumn = document.createElement('div');
  leftColumn.className = 'tappy-bulk-send-left';

  // Título Selecione os contatos
  const selectTitle = document.createElement('h3');
  selectTitle.textContent = 'Selecione os contatos';

  // Tabs de filtros
  const filterTabs = document.createElement('div');
  filterTabs.className = 'tappy-filter-tabs';
  filterTabs.innerHTML = `
    <button class="active">Contatos Salvos</button>
    <button>Inbox</button>
    <button>Grupos</button>
    <button>Contatos de grupos</button>
    <button>CRM</button>
    <button>Perfil do contato</button>
    <button>Importar planilha</button>
  `;

  // Search Bar
  const searchBar = document.createElement('div');
  searchBar.className = 'tappy-search-bar';
  searchBar.innerHTML = `
    <input type="text" placeholder="Pesquisar por número ou nome do contato">
    <button class="tappy-button primary">Selecionar Todos (655)</button>
  `;

  // Contact Tags
  const contactTags = document.createElement('div');
  contactTags.className = 'tappy-contact-tags';
  contactTags.innerHTML = `
    <div class="tappy-tag">Hoje <span>2</span></div>
    <div class="tappy-tag">Ontem <span>3</span></div>
    <div class="tappy-tag">7 dias <span>11</span></div>
    <div class="tappy-tag">15 dias <span>24</span></div>
    <div class="tappy-tag">30 dias <span>23</span></div>
    <div class="tappy-tag">+30 <span>10</span></div>
  `;

  // Contact List
  const contactList = document.createElement('div');
  contactList.className = 'tappy-contact-list';
  
  // Exemplo de contatos
  const contacts = [
    { number: '5518996567775', name: '' },
    { number: '34657157571', name: 'Client' },
    { number: '5519705-9132', name: '+55 19 99705-9132' },
    { number: '554399166882', name: '+554399166882' },
    { number: '5511997873231', name: '-GHOST' },
    { number: '554791033525', name: '+ekon' }
  ];

  contacts.forEach(contact => {
    const contactItem = document.createElement('div');
    contactItem.className = 'tappy-contact-item';
    contactItem.innerHTML = `
      <input type="checkbox">
      <div class="tappy-contact-info">
        <span class="tappy-contact-name">${contact.name || contact.number}</span>
        ${contact.name ? `<span class="tappy-contact-number">${contact.number}</span>` : ''}
      </div>
    `;
    contactList.appendChild(contactItem);
  });

  // Right Column
  const rightColumn = document.createElement('div');
  rightColumn.className = 'tappy-bulk-send-right';

  // Selected Contacts Header
  const selectedHeader = document.createElement('h3');
  selectedHeader.textContent = 'Contatos Selecionados';

  // Empty State
  const emptyState = document.createElement('div');
  emptyState.className = 'tappy-empty-state';
  emptyState.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="12" y1="8" x2="12" y2="12"></line>
      <line x1="12" y1="16" x2="12.01" y2="16"></line>
    </svg>
    <p>Nenhum contato selecionado</p>
  `;

  // Montando a estrutura
  leftColumn.appendChild(selectTitle);
  leftColumn.appendChild(filterTabs);
  leftColumn.appendChild(searchBar);
  leftColumn.appendChild(contactTags);
  leftColumn.appendChild(contactList);

  rightColumn.appendChild(selectedHeader);
  rightColumn.appendChild(emptyState);

  mainContent.appendChild(leftColumn);
  mainContent.appendChild(rightColumn);

  content.appendChild(header);
  content.appendChild(mainContent);

  return createModal('', content);
}

// Interface para contatos do WhatsApp
interface WhatsAppContact {
  id: string;
  name: string;
  number: string;
  profilePic?: string;
  status?: string;
  isGroup: boolean;
}

// Função para pegar as conversas do WhatsApp
function getWhatsAppChats() {
  const chats: WhatsAppChat[] = [];
  const chatList = document.querySelectorAll('[data-testid="cell-frame-container"]');
  
  chatList.forEach(chat => {
    const title = chat.querySelector('[data-testid="cell-frame-title"]')?.textContent || '';
    const number = chat.querySelector('[data-testid="cell-frame-phone-number"]')?.textContent || '';
    const lastMessage = chat.querySelector('[data-testid="last-message-content"]')?.textContent || '';
    const time = chat.querySelector('[data-testid="last-message-time"]')?.textContent || '';
    
    // Gerar um ID único para esta conversa
    const id = `chat-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    chats.push({
      id,
      title,
      number,
      lastMessage,
      time,
      status: 'Novo' // Status inicial
    });
  });

  // Salvar no storage para o CRM
  chrome.storage.local.set({ whatsappChats: chats }, () => {
    console.log('Chats salvos:', chats.length);
  });
}

// Função para buscar contatos do WhatsApp
function getWhatsAppContacts(): Promise<WhatsAppContact[]> {
  return new Promise((resolve) => {
    const contacts: WhatsAppContact[] = [];
    
    // Tentar buscar todos os contatos clicando no botão de nova conversa
    const newChatButton = document.querySelector('[data-testid="chat-icon"]') as HTMLElement;
    
    if (newChatButton) {
      // Clicar para abrir o painel de contatos
      newChatButton.click();
      
      // Dar tempo para a lista de contatos carregar
      setTimeout(() => {
        // Selecionar a lista de contatos
        const contactList = document.querySelectorAll('[data-testid="contact-list-item"]');
        
        contactList.forEach(contact => {
          const name = contact.querySelector('[data-testid="contact-list-item-title"]')?.textContent || '';
          const secondaryInfo = contact.querySelector('[data-testid="contact-list-item-secondary"]')?.textContent || '';
          
          // Verificar se é um grupo ou contato individual
          const isGroup = contact.querySelector('[data-testid="contact-list-item-group-icon"]') !== null;
          
          // Pegar a foto do perfil se disponível
          const profilePicImg = contact.querySelector('img');
          const profilePic = profilePicImg ? profilePicImg.src : undefined;
          
          // Gerar um ID único para este contato
          const id = `contact-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
          
          contacts.push({
            id,
            name,
            number: secondaryInfo, // Geralmente é o número ou status
            profilePic,
            status: secondaryInfo.includes('@') ? undefined : secondaryInfo,
            isGroup
          });
        });
        
        // Fechar o painel de contatos clicando no botão de voltar ou pressionando ESC
        const backButton = document.querySelector('[data-testid="back"]') as HTMLElement;
        if (backButton) {
          backButton.click();
        } else {
          // Alternativa: pressionar ESC
          document.dispatchEvent(new KeyboardEvent('keydown', {
            key: 'Escape',
            code: 'Escape',
            keyCode: 27,
            which: 27,
            bubbles: true
          }));
        }
        
        console.log('Contatos encontrados:', contacts.length);
        resolve(contacts);
      }, 1000); // Esperar 1 segundo para os contatos carregarem
    } else {
      console.log('Botão de nova conversa não encontrado');
      resolve([]);
    }
  });
}

// Observar mudanças na lista de chats
const chatObserver = new MutationObserver(() => {
  getWhatsAppChats();
});

// Iniciar observação quando a lista de chats estiver disponível
function startChatObserver() {
  const chatList = document.querySelector('[data-testid="chat-list"]');
  if (chatList) {
    chatObserver.observe(chatList, { 
      childList: true,
      subtree: true 
    });
    getWhatsAppChats(); // Pegar chats iniciais
  } else {
    setTimeout(startChatObserver, 1000);
  }
}

// Iniciar quando o documento estiver pronto
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', startChatObserver);
} else {
  startChatObserver();
}

// Helpers
const createFormGroup = (label: string, input: HTMLElement): HTMLElement => {
  const group = document.createElement('div');
  group.className = 'tappy-form-group';
  
  const labelEl = document.createElement('label');
  labelEl.textContent = label;
  
  group.appendChild(labelEl);
  group.appendChild(input);
  
  return group;
};

const createFeatureToggle = (feature: Feature): HTMLElement => {
  const toggle = document.createElement('div');
  toggle.className = 'tappy-feature-toggle';
  
  toggle.innerHTML = `
    <div class="tappy-feature-info">
      <span>${feature.name}</span>
      <small class="tappy-badge">Abrir</small>
    </div>
    <label class="tappy-switch">
      <input type="checkbox" ${feature.enabled ? 'checked' : ''}>
      <span class="tappy-slider"></span>
    </label>
  `;
  
  return toggle;
};

// Função para iniciar a extensão
const initExtension = async () => {
  // Criar sidebar
  const sidebar = document.createElement('div');
  sidebar.className = 'tappy-sidebar';
  document.body.appendChild(sidebar);
  
  // Criar container de ícones
  const iconsContainer = document.createElement('div');
  iconsContainer.className = 'tappy-icons-container';
  sidebar.appendChild(iconsContainer);
  
  // Adicionar ícones
  icons.forEach(({ name, icon, onClick }) => {
    const iconElement = document.createElement('div');
    iconElement.className = 'tappy-icon';
    iconElement.setAttribute('data-tip', name);
    iconElement.innerHTML = icon;
    if (onClick) {
      iconElement.addEventListener('click', onClick);
    }
    iconsContainer.appendChild(iconElement);
  });
  
  // Inicializar modais
  initializeModals();
  
  // Carregar configurações
  const config = await storage.get<Config>('config');
  if (config?.darkMode) {
    document.body.classList.add('dark-mode');
  }
  
  // Carregar estado das funcionalidades
  const features = await storage.get<Record<string, boolean>>('features');
  if (features) {
    Object.entries(features).forEach(([id, enabled]) => {
      const icon = document.querySelector(`[data-feature="${id}"]`);
      if (icon) {
        icon.classList.toggle('disabled', !enabled);
      }
    });
  }
  
  console.log('TappyWhats: Interface criada');
};

// Listener para mensagens do background script
chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message.type === 'SEND_SCHEDULED_MESSAGE') {
    // Código para enviar mensagem agendada (existente)
    console.log('Enviando mensagem agendada:', message.data);
    // TODO: Implementar o envio da mensagem
    sendResponse({ success: true });
  }
  
  // Novo: Tratar solicitação para obter dados do WhatsApp
  if (message.type === 'GET_WHATSAPP_DATA') {
    console.log('Solicitação para obter dados do WhatsApp recebida');
    
    // Obter contatos
    getWhatsAppContacts().then(contacts => {
      // Também obter chats atuais
      getWhatsAppChats();
      
      // Salvar contatos no storage
      chrome.storage.local.set({ whatsappContacts: contacts }, () => {
        console.log('Contatos salvos com sucesso:', contacts.length);
        
        // Enviar resposta de sucesso
        sendResponse({
          success: true,
          contacts: contacts,
          chats: [] // Os chats são salvos separadamente por getWhatsAppChats()
        });
      });
    }).catch(error => {
      console.error('Erro ao obter contatos:', error);
      sendResponse({
        success: false,
        error: 'Erro ao processar contatos'
      });
    });
    
    return true; // Indica que a resposta será assíncrona
  }
});

// Iniciar extensão quando o DOM estiver pronto
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    initExtension();
  });
} else {
  initExtension();
}
