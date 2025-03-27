// Gerenciamento de mensagens agendadas
chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name.startsWith('scheduled_message_')) {
    chrome.storage.local.get([alarm.name], (result) => {
      const messageData = result[alarm.name];
      if (messageData) {
        // Enviar mensagem para o content script
        chrome.tabs.query({ url: 'https://web.whatsapp.com/*' }, (tabs) => {
          if (tabs.length > 0) {
            chrome.tabs.sendMessage(tabs[0].id!, {
              type: 'SEND_SCHEDULED_MESSAGE',
              data: messageData,
            });
          }
        });
        // Remover mensagem agendada após o envio
        chrome.storage.local.remove(alarm.name);
      }
    });
  }
});

// Listener para mensagens do content script ou popup
chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  // Mensagens agendadas
  if (message.type === 'SCHEDULE_MESSAGE') {
    const { timestamp, data } = message;
    const alarmName = `scheduled_message_${timestamp}`;
    
    // Salvar dados da mensagem
    chrome.storage.local.set({
      [alarmName]: data
    }, () => {
      // Criar alarme
      chrome.alarms.create(alarmName, {
        when: timestamp
      });
      sendResponse({ success: true });
    });
    return true; // Indica que a resposta será assíncrona
  }
  
  // Abrir CRM em uma nova aba
  if (message.action === 'openCrm') {
    chrome.tabs.create({ url: message.url }, (tab) => {
      console.log('CRM aberto em nova aba:', tab.id);
      sendResponse({ success: true });
    });
    return true; // Indica que a resposta será assíncrona
  }
  
  // Capturar dados do WhatsApp
  if (message.action === 'getWhatsAppData') {
    // Encontrar a aba do WhatsApp Web
    chrome.tabs.query({ url: 'https://web.whatsapp.com/*' }, (tabs) => {
      if (tabs.length > 0) {
        // Enviar mensagem para o content script para pegar os dados
        chrome.tabs.sendMessage(tabs[0].id!, {
          type: 'GET_WHATSAPP_DATA'
        }, (response) => {
          if (chrome.runtime.lastError) {
            console.error('Erro ao comunicar com o WhatsApp Web:', chrome.runtime.lastError);
            sendResponse({ success: false, error: 'WhatsApp Web não está aberto ou extensão não carregada na página' });
          } else if (response && response.success) {
            // Armazenar os dados obtidos
            chrome.storage.local.set({
              whatsappContacts: response.contacts || [],
              whatsappChats: response.chats || []
            }, () => {
              console.log('Dados do WhatsApp salvos com sucesso!');
              sendResponse({ success: true });
            });
          } else {
            sendResponse({ success: false, error: response?.error || 'Erro desconhecido' });
          }
        });
        return true; // Indica que a resposta será assíncrona
      } else {
        sendResponse({ success: false, error: 'WhatsApp Web não está aberto' });
      }
    });
    return true; // Indica que a resposta será assíncrona
  }
});
