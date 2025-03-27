'use client';

import { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Search,
  Filter,
  Download,
  MoreVertical,
  Check,
  X,
  MessageSquare,
  Phone,
  Mail
} from "lucide-react";

const subscribers = [
  {
    id: 1,
    name: 'João Silva',
    whatsapp: '+55 11 99999-9999',
    email: 'joao@email.com',
    status: 'Ativo',
    messages: 152,
    lastMessage: '2024-01-30T15:30:00',
  },
  {
    id: 2,
    name: 'Maria Santos',
    whatsapp: '+55 11 98888-8888',
    email: 'maria@email.com',
    status: 'Inativo',
    messages: 89,
    lastMessage: '2024-01-29T10:15:00',
  },
  // Adicione mais assinantes conforme necessário
];

export default function Subscribers() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Assinantes</h1>
        <Button>Adicionar Assinante</Button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Buscar assinantes..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline">
          <Filter className="w-4 h-4 mr-2" />
          Filtros
        </Button>
        <Button variant="outline">
          <Download className="w-4 h-4 mr-2" />
          Exportar
        </Button>
      </div>

      {/* Subscribers List */}
      <Card>
        <div className="divide-y">
          {subscribers.map((subscriber) => (
            <div
              key={subscriber.id}
              className="p-4 hover:bg-accent/50 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#25D366] flex items-center justify-center text-white font-medium">
                    {subscriber.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-medium">{subscriber.name}</h3>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                      <div className="flex items-center gap-1">
                        <Phone className="w-4 h-4" />
                        {subscriber.whatsapp}
                      </div>
                      <div className="flex items-center gap-1">
                        <Mail className="w-4 h-4" />
                        {subscriber.email}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      {subscriber.messages} mensagens
                    </span>
                  </div>

                  <div className={`px-3 py-1 rounded-full text-sm ${
                    subscriber.status === 'Ativo' 
                      ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                      : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                  }`}>
                    <div className="flex items-center gap-1">
                      {subscriber.status === 'Ativo' ? (
                        <Check className="w-3 h-3" />
                      ) : (
                        <X className="w-3 h-3" />
                      )}
                      {subscriber.status}
                    </div>
                  </div>

                  <Button variant="ghost" size="icon">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
