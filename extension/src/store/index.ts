import { create } from 'zustand'

interface Contact {
  id: string
  name: string
  phone: string
  notes: string
  status: 'lead' | 'client' | 'archived'
}

interface Message {
  id: string
  contactId: string
  text: string
  scheduledFor: number
}

interface AppState {
  contacts: Contact[]
  messages: Message[]
  addContact: (contact: Omit<Contact, 'id'>) => void
  updateContact: (id: string, contact: Partial<Contact>) => void
  scheduleMessage: (message: Omit<Message, 'id'>) => void
  removeScheduledMessage: (id: string) => void
}

export const useStore = create<AppState>((set) => ({
  contacts: [],
  messages: [],
  
  addContact: (contact) => 
    set((state) => ({
      contacts: [...state.contacts, { ...contact, id: crypto.randomUUID() }]
    })),
    
  updateContact: (id, contact) =>
    set((state) => ({
      contacts: state.contacts.map((c) => 
        c.id === id ? { ...c, ...contact } : c
      )
    })),
    
  scheduleMessage: (message) =>
    set((state) => ({
      messages: [...state.messages, { ...message, id: crypto.randomUUID() }]
    })),
    
  removeScheduledMessage: (id) =>
    set((state) => ({
      messages: state.messages.filter((m) => m.id !== id)
    }))
}))
