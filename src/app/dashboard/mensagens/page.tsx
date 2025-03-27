'use client';

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Search,
  Filter,
  Download,
  MessageSquare,
  Clock,
  Users,
  CheckCheck,
  X,
  MoreVertical,
  Send
} from "lucide-react";

const messages = [
  {
    id: 1,
    customer: 'João Silva',
    lastMessage: 'Olá, gostaria de saber mais sobre o plano premium',
    status: 'Respondido',
    time: '5 min atrás',
    unread: false,
  },
  {
    id: 2,
    customer: 'Maria Santos',
    lastMessage: 'Qual o prazo de entrega?',
    status: 'Aguardando',
    time: '15 min atrás',
    unread: true,
  },
  // Adicione mais mensagens conforme necessário
];

const metrics = [
  {
    title: 'Total de Mensagens',
    value: '1,234',
    icon: MessageSquare,
  },
  {
    title: 'Tempo Médio de Resposta',
    value: '2min',
    icon: Clock,
  },
  {
    title: 'Conversas Ativas',
    value: '45',
    icon: Users,
  },
];

export default function Messages() {
  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Mensagens</h1>
        <Button>
          <Send className="w-4 h-4 mr-2" />
          Nova Mensagem
        </Button>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {metrics.map((metric, index) => (
          <Card key={index} className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{metric.title}</p>
                <h3 className="text-2xl font-bold mt-2">{metric.value}</h3>
              </div>
              <metric.icon className="w-5 h-5 text-[#25D366]" />
            </div>
          </Card>
        ))}
      </div>

      {/* Messages List */}
      <Card>
        <div className="p-6 border-b">
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input placeholder="Buscar mensagens..." className="pl-10" />
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
        </div>

        <div className="divide-y">
          {messages.map((message) => (
            <div
              key={message.id}
              className="p-4 hover:bg-accent/50 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#25D366] flex items-center justify-center text-white font-medium">
                    {message.customer.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">{message.customer}</h3>
                      {message.unread && (
                        <span className="w-2 h-2 rounded-full bg-[#25D366]"></span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {message.lastMessage}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className={`px-3 py-1 rounded-full text-sm ${
                    message.status === 'Respondido'
                      ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                      : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                  }`}>
                    <div className="flex items-center gap-1">
                      {message.status === 'Respondido' ? (
                        <CheckCheck className="w-3 h-3" />
                      ) : (
                        <Clock className="w-3 h-3" />
                      )}
                      {message.status}
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground">
                    {message.time}
                  </p>

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
