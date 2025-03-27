import React, { useState } from 'react';
import { useStore } from '../store';

const MessageScheduler = () => {
  const [selectedContact, setSelectedContact] = useState('');
  const [message, setMessage] = useState('');
  const [scheduledDate, setScheduledDate] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');

  const contacts = useStore((state) => state.contacts);
  const scheduleMessage = useStore((state) => state.scheduleMessage);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const scheduledDateTime = new Date(`${scheduledDate}T${scheduledTime}`);
    
    scheduleMessage({
      contactId: selectedContact,
      text: message,
      scheduledFor: scheduledDateTime.getTime(),
    });

    // Enviar para o background script
    chrome.runtime.sendMessage({
      type: 'SCHEDULE_MESSAGE',
      timestamp: scheduledDateTime.getTime(),
      data: {
        contact: contacts.find(c => c.id === selectedContact)?.phone,
        message,
      }
    });

    // Limpar formulário
    setSelectedContact('');
    setMessage('');
    setScheduledDate('');
    setScheduledTime('');
  };

  return (
    <div className="bg-card rounded-lg p-4 shadow">
      <h3 className="text-lg font-semibold mb-4">Agendar Mensagem</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            Contato
          </label>
          <select
            value={selectedContact}
            onChange={(e) => setSelectedContact(e.target.value)}
            className="w-full p-2 rounded border bg-background"
            required
          >
            <option value="">Selecione um contato</option>
            {contacts.map((contact) => (
              <option key={contact.id} value={contact.id}>
                {contact.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Mensagem
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full p-2 rounded border bg-background"
            rows={3}
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Data
            </label>
            <input
              type="date"
              value={scheduledDate}
              onChange={(e) => setScheduledDate(e.target.value)}
              className="w-full p-2 rounded border bg-background"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Hora
            </label>
            <input
              type="time"
              value={scheduledTime}
              onChange={(e) => setScheduledTime(e.target.value)}
              className="w-full p-2 rounded border bg-background"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-primary text-primary-foreground py-2 rounded hover:opacity-90 transition-opacity"
        >
          Agendar Mensagem
        </button>
      </form>
    </div>
  );
};

export default MessageScheduler;
