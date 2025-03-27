// Funções auxiliares para manipular o DOM do WhatsApp Web
const selectors = {
  chatList: '[data-testid="chat-list"]',
  messageInput: '[data-testid="conversation-compose-box-input"]',
  sendButton: '[data-testid="send"]',
  contactName: '[data-testid="conversation-info-header-chat-title"]',
};

export const whatsappService = {
  // Obter lista de contatos/chats
  async getContacts() {
    const chatList = document.querySelector(selectors.chatList);
    if (!chatList) return [];

    const chats = Array.from(chatList.children);
    return chats.map((chat) => {
      const nameElement = chat.querySelector('span[title]');
      const name = nameElement?.getAttribute('title') || '';
      const lastMessage = chat.querySelector('span[aria-label]')?.textContent || '';
      
      return {
        name,
        lastMessage,
        element: chat,
      };
    });
  },

  // Enviar mensagem para um contato
  async sendMessage(contactName: string, message: string) {
    try {
      // Encontrar e clicar no contato
      const chats = await this.getContacts();
      const targetChat = chats.find((chat) => chat.name === contactName);
      
      if (!targetChat) {
        throw new Error(`Contato não encontrado: ${contactName}`);
      }

      (targetChat.element as HTMLElement).click();
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Verificar se o chat aberto é o correto
      const openChatName = document.querySelector(selectors.contactName)?.textContent;
      if (openChatName !== contactName) {
        throw new Error('Erro ao abrir o chat correto');
      }

      // Inserir e enviar a mensagem
      const inputField = document.querySelector(selectors.messageInput) as HTMLElement;
      if (!inputField) {
        throw new Error('Campo de mensagem não encontrado');
      }

      // Simular digitação
      const nativeTextAreaValue = Object.getOwnPropertyDescriptor(
        window.HTMLTextAreaElement.prototype,
        'value'
      );
      
      nativeTextAreaValue?.set?.call(inputField, message);
      inputField.dispatchEvent(new Event('input', { bubbles: true }));

      // Enviar mensagem
      const sendButton = document.querySelector(selectors.sendButton) as HTMLElement;
      if (!sendButton) {
        throw new Error('Botão de enviar não encontrado');
      }

      sendButton.click();
      return true;
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
      throw error;
    }
  },

  // Observar novos contatos/mensagens
  observeChats(callback: (contacts: any[]) => void) {
    const chatList = document.querySelector(selectors.chatList);
    if (!chatList) return;

    const observer = new MutationObserver(async () => {
      const contacts = await this.getContacts();
      callback(contacts);
    });

    observer.observe(chatList, {
      childList: true,
      subtree: true,
    });

    return () => observer.disconnect();
  },
};
